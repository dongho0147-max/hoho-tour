# HOHO Tour Blog Style Guide

Living rules for writing and checking guides on hoho-tour.com. Every new or
rewritten guide is checked against this document before it ships.

Last updated: 2026-11-18 (revamp v1).

## 1. Photos

- Every guide has a hero photo at the top, taken from frontmatter `image`
  (1600px webp, `images/photos/seoul-NN.webp`). The hero is rendered by
  `layouts/_default/single.html` - never paste a hero figure by hand.
- Body photos: 3-6 per guide. First body photo within the first 2-3
  paragraphs - never below paragraph 5.
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

## 3. Links to booking sites

- There are no affiliate links on this site right now. Do not write
  "(affiliate link)" next to a link, and do not claim a commission.
- Booking links are plain links for convenience, rendered with the
  `{{< aff >}}` shortcode so they open in a new tab with
  `rel="nofollow noopener"`. Never use `rel="sponsored"` - there is no
  sponsorship and no tracking.
- Allowed: Klook search URLs
  (`https://www.klook.com/en-US/search/?query=<keywords>` - verified live
  2026-11-18) and Agoda city pages (`https://www.agoda.com/city/seoul-kr.html`
  - verified HTTP 200). 2-3 links per guide, placed at the end of the
  paragraph they relate to, inside an `affiliate-cta` box.
- Travelpayouts tracking links are NOT used: no Partner ID (marker),
  no project, and no program approvals (Klook / GetYourGuide / Viator /
  Agoda) have been confirmed. Do not invent a tracking URL. Do not use
  the number `599763` - it has no verified source. If Travelpayouts is
  set up later, generate links in the Travelpayouts dashboard only, and
  update the disclosure on every page at the same time.
- GetYourGuide links are not used until they can be verified in a
  browser (getyourguide.com blocks this environment). Use the equivalent
  Klook search URL instead.
- MyRealTrip / Trip.com: link only if a Travelpayouts program for them
  exists and is approved; otherwise introduce them as information only,
  no link. Never copy a product page image.
- The emrld Travelpayouts script is not in this repository. Do not add
  it, do not edit it. The per-post disclosure in `single.html` and the
  About / Privacy pages must always match reality: today they say plain
  links, no commission.

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
5. Ship as `hohotour-site-revamp-1118.zip` (50MB max) in
   `~/workspace/homepage-redesign/`. Never push to main or deploy live
   from this workspace - the parent uploads to Drive and the PM merges
   and deploys.
