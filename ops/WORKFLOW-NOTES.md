# hoho-tour.com agent workflow notes (for a new agent)

## Push + verify (one command)
1. Tools box: `tools vault write-file --key password --name "GitHub hoho-tour token" --return-channel whatsapp --json` (writes the token file, never print it).
2. Workspace: `bash ops/hhpush.sh REPO_DIR "commit msg" /kr/blog/<slug>/ /blog/<slug>/`
   Commits, rebases on origin/main, builds with /tmp/hg/hugo (needs 0 errors), pushes, deletes the token, waits 30 s, prints HTTP status + title per URL.
   Hugo binary lives at /tmp/hg/hugo (re-download if /tmp was wiped). Commit identity: HOHO Instinct / hohotour2026@gmail.com.
3. Only push when main relays Dongho's go (content, tables, photos and phases: standing go; redesign-class UI: ask first).

## Phone-width review
On the live page, with a cloud-browser lease, replace body with an iframe 390px wide (src = the post URL), set the iframe document's scroll-behavior to auto, then `scrollTo` and screenshot. Scroll-behavior smooth breaks scrolling.
Check: title, each photo vs caption, map labels, Klook links (?aid=145455), no horizontal overflow (scrollWidth <= 390).

## Captions (changed 2026-11-28, Dongho)
- Captions describe the PHOTO ONLY. No tips or facts repeated from the body text.
- Hero captions: data/image_captions.yaml (EN and KR in one file, key = post base name, KR ends in .kr). Credit at the end ("Photo: ..." / "사진: ...").
- Inline photos: `caption=` on the figure shortcode ("Photo:" is auto-translated to "사진:" in KR).
- Unified from front matter image_caption + data/kr_image_caption.yaml on 2026-11-28; built HTML diff before/after was identical (diff -r). Other posts' hero captions are still old-style tips; rewrite them to describe the photo if Dongho wants.

## Map (tour-summary partial)
Route line thin gray dashed, small gray arrows, labels coloured by marker type (coral sightseeing, orange market/food, purple stay).

## Standing rules
No emrld pop-under. Free OSM/Leaflet or SVG maps only. Do not touch Agoda links, keep "(Klook, Agoda)" footer. Keep /kr/about affiliate disclosure (never "no affiliate"). Viator links skipped. No Klook home button. No billing changes. Keep Danyang tunnel photo. Partner-widget changes in /tmp/hhmain are uncommitted and not approved.
Reports to main: English, concise, screenshots attached (max 5 per message). Do not report done without self-review of the live page.
