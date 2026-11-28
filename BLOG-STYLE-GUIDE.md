# HOHO Tour Blog Style Guide

Living rules for writing and checking guides on hoho-tour.com. Every new or
rewritten guide is checked against this document before it ships.

Last updated: 2026-11-28 (humanize pass added, Dongho).

## 1. Photos

- Every guide has a hero photo at the top, taken from frontmatter `image`
  (1600px webp, `images/photos/seoul-NN.webp`). The hero is rendered by
  `layouts/_default/single.html` - never paste a hero figure by hand.
- Body photos: 3-6 per guide. First body photo within the first 2-3
  paragraphs - never below paragraph 5.
- Sunny and bright: unless the post or section is about night views or
  mood, photos are sunny daytime shots. Dark or overcast daytime photos
  are flagged for replacement (Dongho, 2026-11-28).
- Collages: 2-4 photos in one `{{< collage >}}` block, CSS grid
  (mobile 2 columns, desktop 2-4 columns). Use one collage per guide at most,
  two only in a long guide (2,000+ words).
- Every `figure` and `collage` entry carries `alt` text and a caption with
  photographer + license (e.g. "Photo: Basile Morin, CC BY-SA 4.0").
  Captions describe what the photo actually shows. Never write a caption
  that claims the photo shows something it does not (snow, a courtyard,
  charcoal, a brass bowl).
- `width` and `height` on figures where known, `loading=lazy` on body
  photos. No horizontal overflow at 390px or 1440px.
- Real photographs only. No AI-generated images, no photos scraped from
  other blogs or product pages. New photos go in `static/images/photos/`
  as webp, 1600px on the long side, 250KB or less each, and must be logged
  in `static/images/photos/CREDITS.md` with source URL, author, license.
- Photos must match the place they illustrate. Known past mistakes: a
  Gangneung beach photo in the Incheon guide, the same platform photo in
  two guides. If no verified matching photo exists, leave the slot out
  rather than using a lookalike. Never use a `[PHOTO-NEEDED]` or
  `[Photo to be added]` marker in a published guide - unpublished slots
  are deleted, not shipped.
- Partial matches are allowed only with an honest caption: name what the
  photo shows, do not claim the missing part. (Example: a samgyetang pot
  photo captioned as the pot, not as the restaurant courtyard.)
- Commercial-use restrictions matter: CC BY-NC and CC BY-NC-ND photos
  are not used on this site.

## 2. Voice - no AI tells

- First person, short sentences, blog rhythm - like a friend who lives in
  Seoul telling you what actually happened. Concrete scenes, prices,
  times, routes. Say what disappointed you too.
- One paragraph = 3-4 sentences max. Vary paragraph length; never let
  every paragraph be the same size.
- Banned: em-dash pile-ups, "Whether you're A or B" symmetry templates,
  three-item lists in a row, "hidden gem", "nestled", "must-visit",
  "delve", translationese, "Seoul is a city where..." openings, ending
  with a summary. No long bar characters (-, -, ㅡ) anywhere in copy.
- Every guide ends with something useful (a tip, a price range, a
  what-to-do-next), never a recap paragraph.
- Where to eat: every regional guide has one. Restaurant name, dish,
  price or price range, and a one-line reason. Prices are checked from a
  verifiable source and dated ("last checked November 2026"). If the
  price cannot be verified, give a range or leave the price out - never
  invent one. If opening hours conflict between sources, say so in the
  guide ("check before you go").
- Facts first: opening hours, prices, and addresses are verified, not
  guessed. A guide written from research (not a visit) says how the
  information was checked in its footer note.

### 2A. Humanize pass before shipping (Dongho, 2026-11-28)

Method from the free open-source im-not-ai / Humanize KR skill
(github.com/epoko77-ai/im-not-ai, X post by @Luicas_seedtoon). Every new
or rewritten guide gets a de-AI pass on the final text, after all other
edits, before the zip.

- KR drafts: run im-not-ai (Claude Code: `/plugin install
  humanize-korean@im-not-ai`, then "이 글 AI 티 없애줘"). It flags 85
  Korean AI-tell patterns: translationese, mechanical parallelism
  ("첫째 · 둘째 · 셋째"), stock phrases ("결론적으로", "시사하는 바가
  크다"), passive overuse, sentence-initial connectives, emoji/bullet
  overuse, and a vocabulary layer of ~115 translated-English words
  ("렌즈", "축" used metaphorically). Where the plugin is not installed,
  sweep for the same patterns by hand.
- EN drafts: same idea on the English side. Sweep for translationese,
  "Whether you're A or B" templates, rule-of-three stacking, the banned
  words above, and throat-clearing openings and summary endings.
- Cut, do not decorate: a good pass makes the text shorter or the same
  length, never longer. AI tells are mostly filler, so delete them rather
  than swapping in synonyms.
- Hard rules: facts, claims, numbers, names and direct quotes never
  change. Only flagged spans get edited. The genre stays a travel guide.
  If more than ~30% of the text changed, the pass went too far: redo it
  lighter.
- The tool's reviewer notes connectives need extra attention, so re-read
  transitions between paragraphs by hand after the pass.

## 3. Links to booking sites (policy changed 2026-11-19 - this section supersedes the 2026-11-18 version)

- Some links on this site ARE affiliate links. The disclosure on every page
  says so: "Some links on this page are affiliate links. If you book through
  one, we may earn a small commission at no extra cost to you. It never
  changes what we recommend." Do not write "(affiliate link)" next to a link;
  the disclosure covers it.
- Booking links use the `{{< aff >}}` shortcode so they open in a new tab.
  The Travelpayouts script in baseof.html converts them automatically; never
  add tracking parameters or short URLs by hand.
- Allowed: Klook REAL product pages (activity/ticket/tour pages, verified live
  in a browser - curl returns 403 because Klook bot-blocks curl, which is not
  a dead link) and Agoda REAL hotel or region pages (verified HTTP 200).
  Search pages are NOT allowed. 2-4 links per guide, placed in context (inline
  in the paragraph they relate to, or in a tip box as "Book this"). No
  link-only blocks, no irrelevant products.
- Travelpayouts: the emrld script (emrld.ltd/NTk5NzYz.js?t=599763, marker
  804616) IS in this repository (baseof.html, restored from main 2026-11-19).
  Do not delete or edit it. Do not invent tracking URLs; the script handles
  conversion. Do not use the number `599763` in a hand-built URL.
- GetYourGuide links are not used until they can be verified in a
  browser (getyourguide.com blocks this environment). Use the equivalent
  Klook product page instead.
- MyRealTrip / Trip.com: link only if a Travelpayouts program for them
  exists and is approved; otherwise introduce them as information only,
  no link. Never copy a product page image.
- The per-post disclosure in `single.html` and the About / Privacy pages must
  always match reality: today they say affiliate links, small commission,
  no extra cost to the reader.

## 4. Categories (taxonomy)

- Taxonomies in `hugo.yaml`: `region` (regions) and `theme` (themes).
  `disableKinds` is RSS only - taxonomy and term pages are on.
- Regions: Seoul, Incheon, Busan, Gyeonggi-Suwon, Gangwon. A region page
  is generated only when a post uses it, so new regions appear with the
  first post.
- Themes: Food & Restaurants, Day Trips, Transit & Tips, Seasonal.
- Every post sets `regions` and `themes` in frontmatter. The homepage
  Browse band and the header menu (Regions, Food) link to
  `/regions/<slug>/` and `/themes/<slug>/`.
- Food posts use theme `food-restaurants`. A new food post is a new
  guide, not a section added to an old one.

## 5. Publishing gate (before every zip)

1. `hugo --minify` builds with 0 errors.
2. Playwright check on every guide + homepage, desktop 1440 and mobile
   390: photos and collages render, 0 broken images, 0px horizontal
   overflow, every booking link has a real href, 0 console errors.
3. Grep the built site for: `AFFILIATE-SLOT`, `PHOTO-NEEDED`,
   `(affiliate link)`, `text-only`, `Photo to be added`, `may earn a
   small commission` - all must be 0.
4. Grep source for banned voice: `hidden gem`, `nestled`, `must-visit`,
   `delve`, `Whether you're`, `Seoul is a city where` - all must be 0.
5. Humanize pass done on all new or rewritten text (section 2A): KR via
   im-not-ai, EN via the AI-tell sweep. The text did not get longer, and
   facts and numbers are byte-identical to the pre-pass draft.
6. Ship as `hohotour-site-revamp-1118.zip` (50MB max) in
   `~/workspace/homepage-redesign/`. Never push to main or deploy live
   from this workspace - the parent uploads to Drive and the PM merges
   and deploys.
