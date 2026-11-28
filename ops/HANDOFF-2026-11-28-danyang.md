# Handoff: Danyang rebuild, spot pages, hubs (2026-11-28 16:50 KST)

Branch: scratch-phase32 (repo at /tmp/hhp31, base main 9da0246). Nothing is pushed. Do NOT push until main relays Dongho's go for the whole batch (Danyang itinerary rebuild + everything below). All spot and hub pages are draft:true, so they never publish even if the branch is merged; remove draft only per page after approval.
Hugo: /tmp/hg/hugo. Check with `hugo --buildDrafts -d /tmp/pubS` (drafts visible) and `hugo -d /tmp/pub32` (what would publish). Both had 0 errors.

## What is on the branch
- content/blog/danyang-2-night-3-day-guide(.kr).md: rebuilt layout (A solo + collage per stop, food crops, lodging photos, Bobaljae Day 3, Klook hotel links next to untouched Agoda link, Klook tours section). Stops carry `spot:` links to the 7 spot pages.
- content/spots/chungcheong/: bobaljae, gosu-cave, mancheonha-skywalk, suyanggae-light-tunnel, dodamsambong-seokmun, danyang-river-jando, gugyeong-market (EN + .kr). Templates layouts/spots/single.html and list.html.
- content/stay|tours|food/chungcheong/danyang(.kr).md with layouts/_default/hub.html (layout: hub).
- layouts/partials: breadcrumbs.html (spots/stay/tours/food), tour-summary.html (spot link).
- ops/SITE-STRUCTURE-PROPOSAL.md (structure and rollout, waiting on Dongho's answers), ops/WORKFLOW-NOTES.md (7-step SOP), PHOTO-CREDITS.md, data/photo-dims.yaml.

## Verified (2026-11-28)
- Map pins: every spot pin reverse-geocoded on nominatim.openstreetmap.org and lands on a matching OSM object (categories only, names not compared). Jando: the county geopark page gives 36.98219, 128.34414, about 600 m from our pin; both are on the 1.2 km walkway, not changed.
- Gosu Cave: 11,000 KRW (online 9,900), 09:00-17:00, all year, Natural Monument 256: gosucave.co.kr/sub/sub02_01.php.
- Skywalk: 4,000 / 3,000 KRW, Tuesday closure, winter 09:00-17:00, ticketing until 16:30 (danyang.go.kr/tour/1926 detail page; dytc.or.kr/mancheonha/99; dytc FAQ). Zipline 30,000 and coaster 18,000 confirmed (danyang.go.kr/tour/1920, dytc.or.kr/mancheonha/108). Some third-party sites say 16:00, text says so. Corrected from "16:00-16:30".
- Light Tunnel: 9,000 KRW adult, winter 14:00-21:50, last ticket 21:00, Tuesday closed (ledtunnel.co.kr).
- Cruise: shortened route in Nov-Dec, ID needed (danyangcruise.co.kr/htm/intr01.htm). Fares not copied onto pages.
- Jando: county geopark page says 1.2 km, free, 09:00-23:00. Corrected from 1.1 km and "lights said".
- Sono Belle closure Dec 2-22 2026: from the earlier notice, not re-checked today.
- Not verified: "about 80 m" skywalk height; drive time to Bobaljae (written as straight-line only); hotel prices (none given).

## Left to do
1. Dongho's go (via main) for the push. Push flow: commit, `tools vault write-file --key password --name "GitHub hoho-tour token" --return-channel whatsapp --json` in the tools box, then in the workspace `bash ops/hhpush.sh REPO "msg" /kr/blog/<slug>/ /blog/<slug>/`. Re-read main's message first.
2. Dongho's answers on ops/SITE-STRUCTURE-PROPOSAL.md (URL names, Klook-only affiliates, publish gate).
3. Pending photos from the photo PM / Muse relay: local Danyang food close-ups and Sono photos; swap into the food hub and the post when they arrive.
4. Paragliding has no spot page (two launch sites). Optional: Guinsa, Okchon area spots.
5. Hub pages have no maps (no verified hotel coordinates).
6. Facts missing from spot pages: Dodamsambong fee/parking, Gugyeong Market hours and address (box hidden when empty).
7. Next region: repeat the SOP; do not copy Danyang facts.
## Standing rules
No Agoda link edits, footer "(Klook, Agoda)", emrld pop-under off, free OSM/SVG maps only, /kr/about disclosure unchanged, Klook AID 145455, Viator skipped, photo captions describe only the photo, keep the tunnel photo blog-07.

## Update 17:10 KST
- Danyang post is LIVE (commit 1eee809 on origin/main, pushed 17:06 after Dongho's go). Spot/hub pages and the Drive photos were not in that push.
- scratch-phase32 now also has: Muse/Drive food + Sonobel photos in the food and stay hubs (44aaf67), credits as non-free in PHOTO-CREDITS.md, place names/addresses/Google ratings from the photo PM's phase35 drafts (NOT verified by the site agent; verify before any publish). PM phase35 files (/tmp/p35, content/eat, content/stay/danyang) were not applied: my /food|/stay|/tours/<region>/<place>/ structure replaces them.
- Unused Drive photos: sonobel-04/05/07 (TRVLOGUE, author unknown), food-11.
- Branch scratch-widget (worktree /tmp/hhwidget, commit 99d4f8c, based on 1eee809): partner widget preview from /tmp/hhmain plus the exact disclosure label ("이 링크는 제휴 광고를 포함합니다" / "Contains affiliate links"). Unpushed, waits for Dongho's go. /tmp/hhmain's widget files stay uncommitted.
- Worktrees: /tmp/hhpush (push-danyang, pushed), /tmp/hhwidget, /tmp/wt-main (can delete).
- Widget (scratch-widget): label now #666 and the disclosure text is also on the collapsed mobile tab ("Deals · Contains affiliate links" / "혜택 · 이 링크는 제휴 광고를 포함합니다").
- UNVERIFIED before any publish of food/stay hubs: shop names (Bak Ssogari, Dalttongne Garlic Sundae, Wonju Chicken House, Wonsiin Garlic Tteokgalbi), their addresses, Google ratings and review counts, and the Sono Belle (Sambong-ro 187-17) and Edelweiss (Sambong-ro 31) addresses/ratings. They came from the photo PM's phase35 draft.

## Update 2026-11-28 18:10 (site agent handover)
LIVE on origin/main (all verified at 390px, EN+KR): 1eee809 Danyang post; 372a45c + f1f6f29 floating partner widget (tab "Deals/혜택 · Klook · Contains affiliate links", English label on EN and KR, #666, text only, no logos: neither Klook's nor Agoda's affiliate terms grant a logo licence, official portal creatives needed); 823c5ba Guinsa stop 8 + numbered stop headings + brighter photos + regenerated fallback map; 23eb55c colours: Gugyeong Market (stop 2) orange only, other sights blue #2A6FB0, lodging purple, market never clustered.
BRANCHES pushed to origin (not main):
- origin/scratch-phase32: all draft content. Spot pages (content/spots/chungcheong/*, 7 spots EN+KR), hubs (content/{stay,tours,food}/chungcheong/danyang), layouts/spots, layouts/_default/hub.html, ops/SITE-STRUCTURE-PROPOSAL.md. Everything draft:true. Built output must not contain /spots/, /stay/, /tours/, /food/ before Dongho's go.
- origin/scratch-colors: current live main content plus nothing extra (same as main 23eb55c lineage; it contains the widget and Guinsa commits).
NOT applied: photo PM phase33/34/35 bundles (/tmp/p35 had phase35; superseded by my hubs), phase39 Guinsa spot page (spots still draft; Guinsa spot page not built).
STILL UNVERIFIED before any publish of hubs: shop names, addresses, Google ratings and review counts (food and stay hubs), Sono Belle closure Dec 2-22, skywalk "about 80 m", Bobaljae drive time. Guinsa parking 3,000 won is blog-only (hedged in the post).
Open with Dongho (no reply yet): spot/hub URL names, Klook-only affiliates, publish gate for spots/hubs, /kr/about disclosure text, trimming extra Klook links, slide sound variant, Seoul card.
Rules still in force: emrld pop-under OFF, free OSM/Leaflet or SVG maps only, no Agoda link edits, footer "(Klook, Agoda)", /kr/about never "no affiliate", Viator skipped, no Klook home button, keep tunnel photo blog-07, captions describe only the photo, no billing changes. Push helper: ops/hhpush.sh (needs the vault token file from `tools vault write-file`). Headless screenshots: google-chrome --headless=new with --run-all-compositor-stages-before-draw; this machine has no Korean or emoji font (boxes in shots only).
Photo notes: Guinsa photos are Commons CC BY-SA (titles in PHOTO-CREDITS.md); skywalk s1/s4/s5, dodam-04..06, seokmun-04, paraglide-04..06, bobaljae-04 (KTO) and Telltrip skywalk-02/03 are non-free-licence, marked in PHOTO-CREDITS.md.
