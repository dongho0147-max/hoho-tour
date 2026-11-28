#!/usr/bin/env python3
"""Build the link-in-bio hub (static/go/index.html EN, static/kr/go/index.html KR)
from content/blog/*.md front matter. Run from repo root: python3 tools/build_go.py"""
import glob, os, re, yaml, html, json

def fm(path):
    t = open(path, encoding="utf-8").read()
    m = re.match(r"---\n(.*?)\n---", t, re.S)
    return yaml.safe_load(m.group(1))

regions = {r["slug"]: r for r in yaml.safe_load(open("data/regions.yaml"))["regions"]}
guides = []
for p in glob.glob("content/blog/*.md"):
    base = os.path.basename(p)
    if base.startswith("_") or base.endswith(".kr.md"):
        continue
    slug = base[:-3]
    en = fm(p)
    krp = p[:-3] + ".kr.md"
    kr = fm(krp) if os.path.exists(krp) else None
    reg = (en.get("regions") or ["korea"])[0]
    guides.append(dict(dest=slug.split("-")[0],slug=slug, en=en, kr=kr, region=reg, date=str(en.get("date"))))
guides.sort(key=lambda g: g["date"], reverse=True)

def img(g):
    i = g["en"].get("image") or "images/banner/banner-seoul.webp"
    return "/" + i

T = {
 "en": dict(lang="en", tag="Real Korea travel guides, by a Seoul local", latest="Newest guide", all="All guides",
            read="Read the guide", fromvid="From the video", other="한국어", otherurl="/kr/go/", base="", title="HOHO Tour - Guides",
            site="Browse all of hoho-tour.com", min="guide", rname=lambda r: regions.get(r, {}).get("name", r.title())),
 "kr": dict(lang="ko", tag="서울 사는 사람이 쓰는 진짜 한국 여행 가이드", latest="새 가이드", all="전체 가이드",
            read="가이드 보기", fromvid="영상에서 본 곳", other="English", otherurl="/go/", base="/kr", title="호호투어 - 여행 가이드",
            site="hoho-tour.com 전체 보기", min="", rname=lambda r: regions.get(r, {}).get("name_ko", r)),
}

CSS = """
:root{--page:#fff;--cream-2:#F4F0E9;--ink:#1C2621;--ink-2:#4A5650;--ink-3:#646E68;--line:#E8E4DD;--green:#1F5B45;--green-ink:#174635;--coral-ink:#C2412A;--mk:#FFF1A8;
--sans:"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,system-ui,"Apple SD Gothic Neo","Noto Sans KR","Segoe UI",Roboto,sans-serif;
--serif:"Fraunces",Georgia,"Pretendard Variable",Pretendard,serif;--script:"Kaushan Script","Segoe Script","Brush Script MT","Snell Roundhand",cursive}
[hidden]{display:none!important}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--page);color:var(--ink);font:16px/1.6 var(--sans);word-break:keep-all;overflow-wrap:break-word}
.wrap{max-width:480px;margin:0 auto;padding:14px 20px 48px}
.top{display:flex;justify-content:flex-end}
.lang{font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2);text-decoration:none;padding:10px 0;min-height:44px;display:inline-flex;align-items:center}
html:lang(ko) .lang{letter-spacing:.04em;font-size:13px}
.lang:hover{color:var(--green)}
.hero{text-align:center;margin:2px 0 30px}
.word{font-family:var(--script);font-weight:400;font-size:56px;line-height:1.05;letter-spacing:.01em;margin:0;color:var(--ink)}
.word em{font-style:normal;color:var(--green)}
.hero p{margin:12px 0 0;font:500 11px/1.6 var(--sans);letter-spacing:.22em;text-wrap:balance;text-transform:uppercase;color:var(--ink-3)}
html:lang(ko) .hero p{letter-spacing:.08em;font-size:12.5px}
.label{font:600 11px/1.4 var(--sans);letter-spacing:.22em;text-transform:uppercase;color:var(--coral-ink);margin:34px 0 14px;padding-top:14px;border-top:1px solid var(--line)}
html:lang(ko) .label{letter-spacing:.06em;font-size:12.5px}
.label .mk{background:var(--mk);border-radius:3px;padding:2px 6px;color:var(--coral-ink)}
a.card{display:block;text-decoration:none;color:inherit}
.feat img{display:block;width:100%;aspect-ratio:3/2;object-fit:cover;background:var(--cream-2)}
.feat .b{padding:16px 0 0}
.feat .t{font-family:var(--serif);font-weight:600;font-size:24px;line-height:1.28;letter-spacing:-.01em}
html:lang(ko) .feat .t{font-family:var(--sans);font-weight:700;font-size:21px;line-height:1.4}
.feat:hover .t,.row:hover .t{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:5px}
.feat .d{color:var(--ink-2);font-size:15px;margin-top:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.btn{display:inline-block;margin-top:12px;color:var(--green);font-weight:600;font-size:14px;border-bottom:1px solid currentColor;padding-bottom:1px}
a.card.row{display:flex;gap:14px;align-items:center;padding:0 0 18px;margin-bottom:18px;border-bottom:1px solid var(--line)}
.row img{width:104px;height:70px;object-fit:cover;flex:none;background:var(--cream-2)}
.row .t{font-family:var(--serif);font-weight:600;font-size:16.5px;line-height:1.35}
html:lang(ko) .row .t{font-family:var(--sans);font-weight:700;font-size:15.5px}
.row .r{font:600 10.5px/1.4 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--coral-ink);margin-bottom:4px}
html:lang(ko) .row .r{letter-spacing:.04em;font-size:12px}
.foot{text-align:center;margin-top:34px;padding-top:22px;border-top:1px solid var(--line)}
.foot a.site{color:var(--green);font-weight:600;font-size:14px;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:1px}
.foot small{display:block;margin-top:16px;color:var(--ink-3);font-size:12px;letter-spacing:.1em}
:focus-visible{outline:3px solid var(--green);outline-offset:3px}
"""

JS = """
(function(){
  var q=new URLSearchParams(location.search),u=[];
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){if(q.get(k))u.push([k,q.get(k)]);});
  var camp=q.get('utm_campaign');
  var links=[].slice.call(document.querySelectorAll('a[data-guide]'));
  links.forEach(function(a){
    var url=new URL(a.getAttribute('href'),location.origin);
    if(u.length){['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){url.searchParams.delete(k);});
      u.forEach(function(p){url.searchParams.set(p[0],p[1]);});
      if(!q.get('utm_campaign'))url.searchParams.set('utm_campaign',a.dataset.region);
    }
    a.setAttribute('href',url.pathname+url.search);
  });
  if(camp){
    var hit=links.filter(function(a){return a.dataset.region===camp;});
    var box=document.getElementById('fromvid');
    if(hit.length&&box){hit.forEach(function(a){var c=a.cloneNode(true);box.appendChild(c);});box.hidden=false;var ft=document.querySelector('.wrap > a.feat');if(ft&&hit.indexOf(ft)>-1){ft.hidden=true;ft.previousElementSibling.hidden=true;}document.getElementById('fromvid-l').hidden=false;}
  }
})();
"""

def build(lang):
    t = T[lang]
    def g_title(g): return (g["kr"] or g["en"])["title"] if lang == "kr" else g["en"]["title"]
    def g_desc(g): return (g["kr"] or g["en"]).get("description", "") if lang == "kr" else g["en"].get("description", "")
    def href(g):
        return f'{t["base"]}/blog/{g["slug"]}/?utm_source=bio&utm_medium=hub&utm_campaign={g["dest"]}'
    L = guides if lang == "en" else [g for g in guides if g["kr"]]
    f = L[0]
    o = []
    o.append(f'<!DOCTYPE html><html lang="{t["lang"]}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">')
    o.append(f'<title>{html.escape(t["title"])}</title><meta name="robots" content="noindex"><meta name="description" content="{html.escape(t["tag"])}">')
    o.append('<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" href="/apple-touch-icon.png">')
    o.append('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap&text=HOHOTour">')
    if lang == "en": o.append('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&display=swap">')
    o.append(f'<style>{CSS}</style></head><body><div class="wrap">')
    o.append(f'<div class="top"><a class="lang" href="{t["otherurl"]}" hreflang="{"ko" if lang=="en" else "en"}">{t["other"]}</a></div>')
    o.append(f'<div class="hero"><h1 class="word">HOHO <em>Tour</em></h1><p>{html.escape(t["tag"])}</p></div>')
    o.append('<div id="fromvid-l" class="label" hidden>%s</div><div id="fromvid" hidden></div>' % t["fromvid"])
    o.append(f'<div class="label"><span class="mk">{t["latest"]}</span></div>')
    o.append(f'<a class="card feat" data-guide data-region="{f["dest"]}" href="{href(f)}"><img src="{img(f)}" alt="" width="480" height="300"><div class="b"><div class="t">{html.escape(g_title(f))}</div><div class="d">{html.escape(g_desc(f))}</div><span class="btn">{t["read"]} &rarr;</span></div></a>')
    o.append(f'<div class="label">{t["all"]}</div>')
    for g in L[1:]:
        o.append(f'<a class="card row" data-guide data-region="{g["dest"]}" href="{href(g)}"><img src="{img(g)}" alt="" width="84" height="68" loading="lazy"><div><div class="r">{html.escape(t["rname"](g["region"]))}</div><div class="t">{html.escape(g_title(g))}</div></div></a>')
    o.append(f'<div class="foot"><a class="site" href="{t["base"] or "/"}{"/" if t["base"] else ""}?utm_source=bio&utm_medium=hub&utm_campaign=home">{t["site"]}</a><small>hoho-tour.com</small></div>')
    o.append(f'</div><script>{JS}</script></body></html>')
    out = "static/go/index.html" if lang == "en" else "static/kr/go/index.html"
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, "w", encoding="utf-8").write("".join(o))
    print(out, len(L), "guides")

build("en"); build("kr")
