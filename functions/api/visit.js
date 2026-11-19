// HOHO Tour visitor counter - Cloudflare Pages Functions + KV (free tier).
// Route: /api/visit  (functions/api/visit.js)
//   POST -> count one visit (once per visitor per day) and return { total, today }
//   GET  -> return current { total, today } without counting
// KV binding name: VISIT_COUNTER (see wrangler.toml.example / NOTES_COUNTER.md)
// KV keys: "count:total" (running total, no expiry),
//          "count:YYYY-MM-DD" (per-day count in Asia/Seoul date, TTL 30 days).
// Dedup: one count per visitor per day, via a date cookie (primary).
//   No cookie yet -> fall back to a one-way hash of (client IP + date) kept
//   in KV for 24h. Raw IPs are never stored. No other personal data is kept.
// Bots: tiny user-agent filter only. No fingerprinting, no third-party calls.

const DAY_MS = 24 * 60 * 60 * 1000;
const DAILY_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

const BOT_PATTERN =
  /bot|crawl|spider|slurp|facebookexternal|twitterbot|linkedinbot|embedly|quora|pinterest|slackbot|telegrambot|whatsapp|discordbot|google-inspection|adsbot|mediapartners|ahrefs|semrush|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot|ccbot|perplexitybot/i;

function todayKST(now) {
  // "Today" follows the site timezone (Asia/Seoul, see hugo.yaml).
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type).value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

async function sha256Hex(text) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readCookie(request, name) {
  const header = request.headers.get("cookie") || "";
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

async function getCount(kv, key) {
  const raw = await kv.get(key);
  const n = raw === null ? 0 : Number(raw);
  return Number.isFinite(n) ? n : 0;
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "GET" && request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  // No KV binding (local build, preview without binding): fail soft.
  // The footer hides the counter on any non-200 response, so the page
  // itself is never affected.
  if (!env.VISIT_COUNTER) {
    return json({ error: "counter_unavailable" }, 503);
  }
  const kv = env.VISIT_COUNTER;

  const today = todayKST(new Date());
  const totalKey = "count:total";
  const todayKey = `count:${today}`;

  if (request.method === "GET") {
    const [total, todayCount] = await Promise.all([
      getCount(kv, totalKey),
      getCount(kv, todayKey),
    ]);
    return json({ total, today: todayCount });
  }

  // POST: count once per visitor per day.
  const ua = request.headers.get("user-agent") || "";
  const isBot =
    BOT_PATTERN.test(ua) ||
    (request.cf &&
      typeof request.cf.botManagement === "object" &&
      request.cf.botManagement !== null &&
      typeof request.cf.botManagement.score === "number" &&
      request.cf.botManagement.score < 30);
  if (isBot) {
    const [total, todayCount] = await Promise.all([
      getCount(kv, totalKey),
      getCount(kv, todayKey),
    ]);
    return json({ total, today: todayCount });
  }

  const cookieName = "ht_visit";
  const seenToday = readCookie(request, cookieName) === today;
  let dedupKey = null;
  if (!seenToday) {
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "unknown";
    dedupKey = `seen:${today}:${await sha256Hex(`${ip}|${today}`)}`;
    if ((await kv.get(dedupKey)) !== null) {
      // Counted already today from this IP (cookie cleared / another browser).
      const [total, todayCount] = await Promise.all([
        getCount(kv, totalKey),
        getCount(kv, todayKey),
      ]);
      return json({ total, today: todayCount });
    }
  }

  let total;
  let todayCount;
  const headers = {
    "content-type": "application/json",
    "cache-control": "no-store",
  };
  if (seenToday) {
    [total, todayCount] = await Promise.all([
      getCount(kv, totalKey),
      getCount(kv, todayKey),
    ]);
    return new Response(JSON.stringify({ total, today: todayCount }), {
      status: 200,
      headers,
    });
  }

  // First visit today: increment both counters. KV has no atomic
  // increment, so a rare simultaneous race can lose one count; traffic
  // here is low enough that read-modify-write is acceptable.
  [total, todayCount] = await Promise.all([
    getCount(kv, totalKey),
    getCount(kv, todayKey),
  ]);
  total += 1;
  todayCount += 1;
  await Promise.all([
    kv.put(totalKey, String(total)),
    kv.put(todayKey, String(todayCount), {
      expirationTtl: DAILY_TTL_SECONDS,
    }),
    kv.put(dedupKey, "1", { expirationTtl: 86400 }),
  ]);
  headers["set-cookie"] =
    `${cookieName}=${today}; Max-Age=86400; Path=/; SameSite=Lax`;
  return new Response(JSON.stringify({ total, today: todayCount }), {
    status: 200,
    headers,
  });
}
