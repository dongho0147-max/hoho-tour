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
:root{--bg:#FFF9EC;--card:#fff;--text:#1D2733;--sub:#5A6B7C;--border:#EAE3D8;--coral:#F0563A;--coral-d:#D94326;--coral-soft:#FDEEE9;--sky:#2E9BD6}
[hidden]{display:none!important}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.5 "Inter","Pretendard","Noto Sans KR",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;word-break:keep-all;overflow-wrap:break-word}
.wrap{max-width:480px;margin:0 auto;padding:28px 18px 40px}
.top{display:flex;justify-content:flex-end;margin-bottom:6px}
.lang{font-size:13px;font-weight:700;color:var(--text);text-decoration:none;border:1px solid var(--border);background:#fff;padding:6px 12px;border-radius:999px}
.hero{text-align:center;margin:6px 0 22px}
.hero img{width:76px;height:76px;margin:0 auto 10px}
.hero h1{margin:0;font-size:24px;font-weight:800;letter-spacing:-.02em}.hero h1 em{font-style:normal;color:var(--coral)}
.hero p{margin:6px 0 0;color:var(--sub);font-size:14.5px}
.label{font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:var(--coral);margin:22px 4px 10px}
a.card{display:block;background:var(--card);border:1px solid var(--border);border-radius:18px;overflow:hidden;text-decoration:none;color:inherit;box-shadow:0 1px 3px rgba(29,39,51,.07);transition:transform .18s,box-shadow .18s}
a.card:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(29,39,51,.1)}
.feat img{width:100%;aspect-ratio:16/10;object-fit:cover}
.feat .b{padding:14px 16px 16px}
.feat .t{font-weight:800;font-size:18px;line-height:1.3;letter-spacing:-.01em}
.feat .d{color:var(--sub);font-size:14px;margin-top:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.btn{display:inline-block;margin-top:12px;background:var(--coral);color:#fff;font-weight:800;font-size:14px;padding:9px 16px;border-radius:999px}
a.card.row{display:flex;gap:12px;align-items:center;padding:10px;margin-bottom:10px}
.row img{width:84px;height:68px;object-fit:cover;border-radius:12px;flex:none}
.row .t{font-weight:700;font-size:15px;line-height:1.35}
.row .r{font-size:12px;color:var(--coral);font-weight:800;margin-bottom:2px}
.foot{text-align:center;margin-top:26px}
.foot a.site{display:inline-block;color:var(--text);font-weight:700;font-size:14px;border:1px solid var(--border);background:#fff;border-radius:999px;padding:10px 18px;text-decoration:none}
.foot small{display:block;margin-top:14px;color:#8A97A5;font-size:12px}
.hl{outline:2px solid var(--coral);outline-offset:-2px}
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
    o.append('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">')
    o.append(f'<style>{CSS}</style></head><body><div class="wrap">')
    o.append(f'<div class="top"><a class="lang" href="{t["otherurl"]}" hreflang="{"ko" if lang=="en" else "en"}">{t["other"]}</a></div>')
    o.append(f'<div class="hero"><img src="/images/hoho-tour-logo-final.svg" alt="HOHO Tour logo" width="76" height="76"><h1>HOHO <em>Tour</em></h1><p>{html.escape(t["tag"])}</p></div>')
    o.append('<div id="fromvid-l" class="label" hidden>%s</div><div id="fromvid" hidden></div>' % t["fromvid"])
    o.append(f'<div class="label">{t["latest"]}</div>')
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
