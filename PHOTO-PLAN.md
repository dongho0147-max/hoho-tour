# HOHO Tour - Photo Plan

- Date: 2026-11-18 (revised same day - see the note on concurrent rewriting below)
- Site root: `~/workspace/hoho-tour/`
- Photo folder: `static/images/photos/` (38 WebP files, all real photos, no AI)
- Subject authority: `static/images/photos/CREDITS.md` - every caption below follows the
  verified subject in CREDITS.md. Subjects were not invented.
- Scope of this file: photo assignment only. Text rewriting and template work are done
  by another worker. This plan does not edit `content/*.md` or `layouts/`.

## 0. Note: the posts were rewritten while this plan was being made
The 5 original posts were rewritten by the text worker during this task (new versions
dated 2026-11-18 09:28-09:29), and 2 new posts were created at the same time
(`busan-pork-soup-milmyeon.md`, `seoul-old-restaurants-baekban-bbq.md`). The audit in
section 1 is of the CURRENT versions. Where the rewrite already fixed something this
plan found in the pre-rewrite versions, section 2 records it as confirmed-then-fixed
instead of pretending it is still broken.

## 1. Current-state audit (7 posts, checked 2026-11-18 ~09:45)

| Post | Frontmatter image | In-body figures / collages | Total photos now |
|---|---|---|---|
| `seoul-essential-3-day-guide.md` (3-day guide) | seoul-01 | seoul-02; collage seoul-03 + seoul-26; seoul-04; seoul-13; seoul-06 | 7 |
| `incheon-day-trip-from-seoul.md` (Incheon) | seoul-12 | seoul-09; seoul-25; seoul-06 | 4 |
| `seoul-market-food-walk.md` (Seoul market food walk) | seoul-13 | seoul-14; seoul-21; collage seoul-18 + seoul-17 | 6 |
| `seoul-subway-tmoney-taxi.md` (Subway / T-money / taxi) | seoul-07 | seoul-08; seoul-09; seoul-06; seoul-05 | 5 |
| `seoul-winter-guide-late-november-december.md` (Winter guide) | seoul-15 | seoul-22; collage seoul-04 + seoul-25; seoul-16; seoul-23 | 7 |
| `busan-pork-soup-milmyeon.md` (Busan, NEW) | "" (empty) | none - 5 explicit `[PHOTO-NEEDED: ...]` slots in the text | 0 |
| `seoul-old-restaurants-baekban-bbq.md` (Old restaurants, NEW) | "" (empty) | none - 5 explicit `[PHOTO-NEEDED: ...]` slots in the text | 0 |

The 2 new posts carry their photo briefs in the text itself (`[PHOTO-NEEDED: ...]`
markers). Section 4 maps new photos to those markers. A marker is filled only when a
photo genuinely matches what it asks for; a close-but-different dish is NOT substituted.

## 2. Mismatches confirmed in the pre-rewrite versions

### 2a. seoul-11 in the Incheon post - WRONG CITY (confirmed, already removed by the rewrite)
- Pre-rewrite file: `incheon-day-trip-from-seoul.md`, figure under "The sea, and the
  long way home".
- CREDITS subject: "Gyeongpo Beach, Gangneung - GYEONGPO photo-frame sign on the sand".
- Gangneung is on the east coast, not Incheon. The rewrite removed the figure; the
  current Incheon post no longer contains seoul-11. Do not put it back.
- Replacement for the sea section: seoul-29 (Wolmi Sea Train over the sea at Wolmido).

### 2b. seoul-08 in the Incheon post - DUPLICATE (confirmed, already removed by the rewrite)
- Pre-rewrite file: `incheon-day-trip-from-seoul.md`, figure under "The park above the
  port". The same file was also in `seoul-subway-tmoney-taxi.md`.
- CREDITS subject: "Seoul subway Line 7 platform, Dobongsan Station".
- The rewrite removed it from Incheon. Current state: seoul-08 is used ONLY in the
  Subway post ("Inside the car" section). Keep it that way.
- Replacement for the park section: seoul-28 (view from Jayu Park over the harbor).

### 2c. Other pre-rewrite issues - status after the rewrite
- FIXED: 3-day guide had no frontmatter image and a "text-only" blockquote claiming
  photos would be the site's own - the rewrite added hero seoul-01 and dropped the claim.
- FIXED: Incheon seoul-12 figure `alt` (restaurant entrance) vs CREDITS (paifang gate);
  food walk seoul-14 figure `alt` (crowded aisle) vs CREDITS (octopus close-up);
  subway seoul-05 caption (taxi crossing) vs CREDITS (Hongdae street); winter seoul-16
  `alt` (Itaewon + mural). All four are now captioned/alt-texted to match CREDITS.
- FIXED: wrong width/height attributes on the seoul-13, seoul-14 and seoul-12 figures -
  the rewrite uses figure shortcodes without width/height, so the issue is gone.
- NOT FIXED / still open: the subway post keeps seoul-05 in its taxi section (its
  caption is now correct - Hongdae street - but the photo sits in a taxi context).
  This plan does not move it: the 3-day guide's Day 2 Hongdae section stays without a
  photo instead. See 4a gaps.

## 3. Assignment rules applied
- seoul-11 is assigned to no post (Gangneung subject; no Gangneung post exists).
- seoul-08 is used only in the Subway post.
- seoul-19 (CC BY-NC-SA) and seoul-20 (CC BY-NC-ND) are NOT assigned anywhere in this
  plan because of their commercial-use / no-derivatives restrictions. This is a
  deliberate exclusion even though seoul-19 (fish vendor) would fit the food walk and
  seoul-20 (Cheonggyecheon at night) would fit the 3-day guide Day 1 evening.
- 3-day guide hero is seoul-01 (Gyeongbokgung Heungnyemun Gate), as instructed.
  (The rewrite already placed it; this plan confirms it.)
- New photos are all Wikimedia Commons, real photos, licences verified on the file
  page (CC BY-SA 4.0, CC BY 2.0, CC BY 3.0, or CC0 - all allow commercial use),
  subject checked by opening the image, long edge 1600px, no upscaling (every
  original was 1600px or larger on its long edge), WebP, each under 250 KB.
  See section 7.
- Deliberate cross-post shares (same file, different caption in each place):
  seoul-06 in the 3-day guide (Myeongdong food street) and the Subway post (taxi
  section) and the Incheon post ("Back in Seoul for dinner"); seoul-04 in the 3-day
  guide (Han River) and the Winter guide (collage); seoul-13 in the 3-day guide
  (Gwangjang morning) and the food walk (hero); seoul-25 in the Incheon post (ride
  back) and the Winter guide (collage); seoul-09 in the Incheon post (taxi to Wolmi)
  and the Subway post (taxi). These shares were made by the rewrite; this plan keeps
  them and adds no new shares.
- "Collage" below means a group of 2-4 already-assigned photos displayed together;
  it does not add extra photos beyond the hero + body count.

## 4. Per-post assignments

Caption format follows the rewritten posts: short honest caption + "Photo: [author],
[licence]". Dimensions are the real file sizes from CREDITS.md. Files marked NEW were
acquired for this plan (section 7). "Already placed" means the rewrite put it there;
this plan confirms the placement.

### 4a. Seoul Essential 3-Day Guide - `seoul-essential-3-day-guide.md`
Already placed by the rewrite (7 photos). This plan adds NO new file here.
- HERO - seoul-01.webp (1600x648) - already placed. Gyeongbokgung Heungnyemun Gate.
- BODY - seoul-02.webp (1600x1025) - already placed. Geunjeongjeon (Throne Hall).
- COLLAGE - seoul-03.webp (1600x1067) + seoul-26.webp (1600x1012) - already placed.
  Bukchon at blue hour + Buk drum at Gyeongbokgung.
- BODY - seoul-04.webp (1600x1067) - already placed. Han River at night, rental
  bicycles, lit bridge. (Shared with Winter guide collage.)
- BODY - seoul-13.webp (1600x1067) - already placed. Gwangjang Market noodle stall.
  (Shared with food walk hero.)
- BODY - seoul-06.webp (1600x1064) - already placed. Myeongdong at night.
  (Shared with Subway and Incheon posts.)
- GAPS (no photo assigned - do not fake one):
  - Day 2 morning, Hongdae: seoul-05 stays in the Subway post (see 2c).
  - Day 2 evening, N Seoul Tower: seoul-16 is in the Winter guide.
  - Day 1 evening, Cheonggyecheon Stream: the only Cheonggyecheon photo in the
    library is seoul-20, excluded (CC BY-NC-ND).
  - Day 3 evening, farewell dinner: no BBQ photo assigned here - seoul-34 goes to
    the old-restaurants post instead (explicit slot there, section 4g).

### 4b. Incheon Day Trip - `incheon-day-trip-from-seoul.md`
Already placed: hero seoul-12, figures seoul-09, seoul-25, seoul-06. This plan adds 3.
- HERO - seoul-12.webp (1600x1067) - already placed. Incheon Chinatown gate (paifang).
- BODY - seoul-09.webp (1600x1200) - already placed. Orange Seoul taxi, for the short
  ride from Chinatown down to Wolmi. (Shared with Subway post.)
- BODY - seoul-25.webp (1024x472) - already placed. Han River night skyline, on the
  ride back toward Seoul. (Shared with Winter guide collage.)
- BODY - seoul-06.webp (1600x1064) - already placed. Myeongdong at night, back in
  Seoul for dinner. (Shared with 3-day guide and Subway post.)
- BODY 1 (ADD) - seoul-27.webp (1200x1600, portrait) - NEW. Incheon Chinatown main
  street, crowded with shoppers in winter coats, red shopfronts and lanterns.
  Caption: "The main street in Chinatown, on a cold bright day. Photo: AhmadElq,
  CC BY-SA 4.0". Place in "Lunch is the reason you came" (the post currently has no
  Chinatown street photo - only the gate as hero).
- BODY 2 (ADD) - seoul-28.webp (1600x1067) - NEW. View from Jayu Park over trees to
  the harbor with cranes, ships and the sea. Caption: "The harbor from Jayu Park,
  the port below and the sea beyond. Photo: Mobius6, CC BY-SA 4.0". Place in "The
  park above the port" (replaces the removed seoul-08 figure).
- BODY 3 (ADD) - seoul-29.webp (1600x1067) - NEW. Wolmi Sea Train (blue and orange
  monorail car) on the elevated track over the sea at Wolmido. Caption: "The Wolmi
  Sea Train running over the water at Wolmido. Photo: Trainholic, CC BY-SA 4.0".
  Place in "The sea, and the long way home" (replaces the removed seoul-11 figure).
- COLLAGE (new): seoul-27 + seoul-28 + seoul-29 (3 cuts: Chinatown street, park
  harbor view, sea train).
- GAPS: Songwoldong Fairy Tale Village (mentioned in the text, no photo in the
  library); jajangmyeon (the lunch section has no noodle photo in the library).
  Both need a future acquisition round - do not substitute a non-Incheon photo.

### 4c. Seoul Market Food Walk - `seoul-market-food-walk.md`
Already placed: hero seoul-13, figures seoul-14, seoul-21, collage seoul-18 + seoul-17.
This plan adds 2.
- HERO - seoul-13.webp (1600x1067) - already placed. Gwangjang Market food stall.
  (Shared with 3-day guide.)
- BODY - seoul-14.webp (1600x1089) - already placed. Raw octopus at Noryangjin Market.
- BODY - seoul-21.webp (1600x899) - already placed. Kimbap (Korean rice rolls),
  close-up. NOTE: the file is kimbap, NOT bibimbap - keep the caption as kimbap/gimbap.
- COLLAGE - seoul-18.webp (1024x622) + seoul-17.webp (1600x1062) - already placed.
  Bosingak Pavilion in Jongno + Jogyesa Temple interior.
- BODY 1 (ADD) - seoul-33.webp (1600x1600) - NEW. Bindaetteok (mung bean pancake)
  with pork pieces, whole pancake on a white plate. Caption: "Bindaetteok, the mung
  bean pancake the market is famous for. Photo: chomjong, CC BY 2.0". Place in
  "Go early, go hungry, bring cash" where the text follows the smell of bindaetteok.
- BODY 2 (ADD) - seoul-35.webp (1600x1067) - NEW. Bibimbap in a bowl, rice topped
  with carrot, mushroom, zucchini, egg strips, meat and gochujang. Caption: "Bibimbap,
  the sit-down bowl after the market walk. Photo: Chloe Lim, CC BY 2.0". Place in
  "Out of the market, into the alleys". Do NOT caption it as market-stall food - it
  is a restaurant bowl.
- COLLAGE (new): seoul-13 + seoul-33 (market food); seoul-21 + seoul-35 (rice dishes
  to carry / to sit down).
- NOT USED here on purpose: seoul-19 (fish vendor cleaning fish) - subject fits the
  "fish stall" paragraph, but the file is CC BY-NC-SA, so it stays out.

### 4d. Subway, T-Money Card, and Taxis - `seoul-subway-tmoney-taxi.md`
Already placed by the rewrite (5 photos). This plan adds nothing. Confirmed correct:
- HERO - seoul-07.webp (1600x1200). Amsa Station sign (Line 8, station 810).
- BODY - seoul-08.webp (1600x1200). Line 7 platform, Dobongsan Station. SOLE USE -
  the Incheon duplicate is gone (see 2b).
- BODY - seoul-09.webp (1600x1200). Orange Seoul taxi. (Shared with Incheon post.)
- BODY - seoul-06.webp (1600x1064). Myeongdong at night, taxis and bus.
  (Shared with 3-day guide and Incheon post.)
- BODY - seoul-05.webp (1600x900). Gyeongui Line Forest Trail street near Hongdae.
  Caption is now correct; placement in a taxi context is noted in 2c and left as is.

### 4e. Seoul Winter Guide - `seoul-winter-guide-late-november-december.md`
Already placed by the rewrite (7 photos). This plan adds nothing. Confirmed correct:
- HERO - seoul-15.webp (1600x675). Hyangwonjeong Pavilion, Gyeongbokgung in snow.
- BODY - seoul-22.webp (1024x628). Changdeokgung Injeongjeon Hall, daytime.
  Caption says "In snow, the palace roofs are the best sight in the city" - NOTE:
  the file itself shows the hall on a clear day, NOT in snow (CREDITS: "daytime (NOT
  the Secret Garden)"). The caption's snow claim is about the season, not the photo;
  the template worker should make sure the wording does not claim the photo shows snow.
- COLLAGE - seoul-04.webp + seoul-25.webp. Han River at night (bicycles) + Han River
  night skyline. (seoul-04 shared with 3-day guide; seoul-25 shared with Incheon post.)
- BODY - seoul-16.webp (900x1600, portrait). N Seoul Tower from a street below.
- BODY - seoul-23.webp (1024x768). Dongdaemun Design Plaza at night, black-and-white.

### 4f. Busan in Two Bowls - `busan-pork-soup-milmyeon.md` (NEW POST)
Frontmatter `image` is empty ("") and the text has 5 `[PHOTO-NEEDED: ...]` slots.
This plan fills 3 of them (1 exactly, 2 as secondary/partial - see below).
- HERO - seoul-32.webp (1600x1200) - NEW. Slot: "hero - a bowl of dwaeji gukbap with
  sliced pork, rice, chives, and kimchi, real photo" - EXACT MATCH. Dwaeji-gukbap
  (Busan pork soup with rice) in a black bowl topped with garlic chives, with kimchi
  and kkakdugi banchan. Caption: "Dwaeji gukbap, Busan's pork soup. Photo: chomjong,
  CC BY 2.0". Set as frontmatter `image` + `image_alt`.
- BODY (ADD) - seoul-38.webp (1600x1067) - NEW (downloaded after a rate-limit retry;
  see section 7). Slot: "cold milmyeon with ice and cucumber in a bowl, real photo" -
  MATCH. Busan milmyeon in a metal bowl, wheat noodles in clear broth with egg,
  shredded egg garnish, red paste and cucumber. Caption: "Milmyeon, Busan's cold
  wheat noodles. Photo: Mobius6, CC BY-SA 4.0". Place in "Halmae Gaya Milmyeon: the
  easy first bowl".
- BODY (ADD) - seoul-31.webp (1600x1067) - NEW. No explicit slot, but the Haeundae
  section says the soup is "a good breakfast after a morning walk on the beach".
  Haeundae Beach, wide sand beach with promenade and seafront towers. Caption:
  "Haeundae Beach, a morning walk before the soup. Photo: Mobius6, CC BY-SA 4.0".
  Place in "Haeundae Wonjo Halmae Gukbap: beef soup by the beach".
- COLLAGE: seoul-32 + seoul-38 (2 cuts: the two bowls) - plus seoul-31 as the beach
  context shot, not part of the food collage.
- GAPS (slots left unfilled - do not fake them):
  - "Seomyeon gukbap alley storefronts at night": no matching photo in the library.
  - "Beef gukbap with bean sprouts and radish in a steel bowl": no exact match.
    Closest candidate found, "So-meori-ttaro-gukbap.jpg" (lazy fri13th, CC BY 2.0),
    shows beef-head soup with scallions and rice served separately - no bean sprouts
    or radish visible in the bowl. NOT acquired; do not substitute it with a caption
    claiming bean sprouts and radish.
  - "Narrow market alley in Uam-dong with small restaurant storefronts": no match.

### 4g. Seoul's Old Restaurants - `seoul-old-restaurants-baekban-bbq.md` (NEW POST)
Frontmatter `image` is empty ("") and the text has 5 `[PHOTO-NEEDED: ...]` slots.
This plan fills 3 of them (1 exactly, 2 partial - flagged honestly below).
- HERO - seoul-36.webp (1600x778) - NEW. Slot: "hero - milky seolleongtang in a brass
  bowl with sliced beef and scallions, real photo" - NEAR MATCH. Seolleongtang (ox
  bone soup), milky broth in a black bowl, spoon lifting sliced beef with scallions,
  kimchi behind. The soup, beef and scallions match; the bowl is black stone, NOT
  brass. Caption honestly: "Seolleongtang, milky ox-bone soup with sliced beef and
  scallions. Photo: 이동원, CC0". Do NOT write "brass bowl" in the caption. Set as
  frontmatter `image` + `image_alt`. Author 이동원, licence CC0 (public domain).
- BODY (ADD) - seoul-37.webp (960x720) - NEW (built from Wikimedia's 960px thumbnail
  because the 1600px original was rate-limited; see section 7). Slot: "Tosokchon hanok courtyard and a pot of samgyetang, real
  photo" - PARTIAL MATCH (the pot, not the courtyard). Samgyetang (chicken ginseng
  soup) in a stone pot, whole chicken in bubbling broth with scallions, kkakdugi
  beside it. Caption: "Samgyetang, ginseng chicken soup in the pot. Photo:
  karendotcom127, CC BY 2.0". Place in "Tosokchon Samgyetang: ginseng chicken by
  the palace". Do NOT caption it as the hanok courtyard - the photo shows no courtyard.
- BODY (ADD) - seoul-34.webp (1600x1200) - NEW. Slot: "charcoal grill with pork belly
  and scissors at a Seoul barbecue table, real photo" - PARTIAL MATCH (the grill and
  the pork belly, not the charcoal or scissors). Samgyeopsal (grilled pork belly)
  slices and kimchi on a grill. Caption: "Pork belly on the grill. Photo: moso,
  CC BY 2.0". Place in "Wangbijib: barbecue where the staff grill for you". Do NOT
  claim charcoal or scissors in the caption.
- COLLAGE: seoul-36 + seoul-37 + seoul-34 (3 cuts: the three bowls/grill of the post).
- GAPS (slots left unfilled):
  - "Imun Seolnongtang dining room and a bowl of seolleongtang": no dining-room photo
    in the library. seoul-36 is the bowl only; do not present it as the dining room.
  - "Grilled pork belly set tray with rice and side dishes" (Siu Sikdang baekban
    section): no tray photo in the library. seoul-34 is meat on the grill, not a set
    tray; seoul-35 (bibimbap bowl) is a mixed-rice bowl, not a baekban tray. Neither
    is substituted here.

## 5. Reserved photo (no slot in any current post)
- seoul-30.webp (1600x1000) - NEW. Gamcheon Culture Village, Busan, colourful
  hillside houses at sunset. The Busan post is bowls-only (Seomyeon / Haeundae /
  Nampo / Uam restaurants), so Gamcheon has no section there. Reserve for a future
  Busan sightseeing post. Do not force it into the food post.

## 6. Unassigned photos (in the library, assigned to no post)

| File | CREDITS subject | Why unassigned |
|---|---|---|
| seoul-10.webp | Hwaseong Fortress gate, Suwon | Suwon day trip - no post covers it yet |
| seoul-11.webp | Gyeongpo Beach, Gangneung | Removed from Incheon (wrong city); no Gangneung post exists |
| seoul-19.webp | Fish vendor cleaning fish at a stall | CC BY-NC-SA - do not use (see section 3) |
| seoul-20.webp | Cheonggyecheon at night, illuminated waterfall and crowds | CC BY-NC-ND - do not use (see section 3) |
| seoul-24.webp | Jeonju Hanok Village, rooftops and street, daytime | Jeonju day trip - no post covers it yet |
| seoul-30.webp | Gamcheon Culture Village, Busan, at sunset | Reserved - see section 5 |

Note: seoul-17, seoul-18, seoul-22 and seoul-26 were unassigned in the first draft of
this plan; the rewrite has since placed all four (food walk collage, winter figure,
3-day collage). They are no longer in this table.

## 7. New photos acquired for this plan (seoul-27 to seoul-38)

All from Wikimedia Commons, real photos (no AI), licence checked on the file page,
subject checked by opening the image. Long edge 1600px, no upscaling (every original
was 1600px or larger on its long edge), WebP, each under 250 KB. Full credits are in
`static/images/photos/CREDITS.md` (seoul-27 to seoul-38 rows; the seoul-01 to
seoul-26 rows were not touched - only the intro counts were updated from 26 to 38
photos and 21 to 32 photos at 1600px, plus the seoul-37 exception note).

| File | Subject (verified) | Size | Author | Licence | Source |
|---|---|---|---|---|---|
| seoul-27.webp | Incheon Chinatown main street, crowded, winter coats, red shopfronts, lanterns | 1200x1600, 224 KB | AhmadElq | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Chinatown,_Incheon_04.jpg |
| seoul-28.webp | View from Jayu Park, Incheon, to the harbor with cranes, ships, sea | 1600x1067, 235 KB | Mobius6 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Jayu_Park_20230430_022.jpg |
| seoul-29.webp | Wolmi Sea Train over the sea at Wolmido, Incheon | 1600x1067, 216 KB | Trainholic | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Wolmi_Sea_Train_Car.jpg |
| seoul-30.webp | Gamcheon Culture Village, Busan, colourful hillside houses at sunset | 1600x1000, 235 KB | Basile Morin | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Colorful_houses_in_Gamcheon_Culture_Village_at_sunset_in_Busan_South_Korea.jpg |
| seoul-31.webp | Haeundae Beach, Busan, sand beach, promenade, seafront towers | 1600x1067, 156 KB | Mobius6 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Haeundae_Beach_20200522_005.jpg |
| seoul-32.webp | Dwaeji-gukbap (Busan pork soup) with garlic chives, kimchi, kkakdugi | 1600x1200, 207 KB | chomjong | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Dwaeji-gukbap_1.jpg |
| seoul-33.webp | Bindaetteok (mung bean pancake) with pork, whole pancake on white plate | 1600x1600, 234 KB | chomjong | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Bindae-tteok_1.jpg |
| seoul-34.webp | Samgyeopsal (grilled pork belly) and kimchi on a grill | 1600x1200, 238 KB | moso | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Korean_Barbecue-Samgyeopsal-01.jpg |
| seoul-35.webp | Bibimbap bowl, carrot, mushroom, zucchini, egg, meat, gochujang | 1600x1067, 220 KB | Chloe Lim | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Bibimbap_6.jpg |
| seoul-36.webp | Seolleongtang, milky broth in black bowl, spoon lifting sliced beef with scallions | 1600x778, 87 KB | 이동원 | CC0 | https://commons.wikimedia.org/wiki/File:Seolleongtang.jpg |
| seoul-37.webp | Samgyetang in a stone pot, whole chicken in bubbling broth with scallions, kkakdugi beside | 960x720, 102 KB | karendotcom127 | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Korean_soup-Samgyetang-08.jpg |
| seoul-38.webp | Busan milmyeon in a metal bowl, wheat noodles in clear broth with egg, shredded egg, red paste, cucumber | 1600x1067, 123 KB | Mobius6 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Busan_Milmyeon_20200522_001.jpg |

Notes on downloading: Wikimedia rate-limited this VM three times (HTTP 429) - once
during the first fetch round, once on the seoul-37 original, and again on retry.
The seoul-37 original (1600x1200) could not be fetched at all; the file was built
from Wikimedia's own 960px thumbnail of the same image (a downscale, no upscaling),
so seoul-37 is 960x720 instead of 1600px. Re-fetch it at 1600px when the rate limit
clears. seoul-30 and seoul-33 needed WebP quality 54 to stay under 250 KB at 1600px;
both were visually checked after conversion and show no visible artefacts at display
size. Every other new file was visually checked after conversion.

## 8. Photos that could not be acquired (gaps, not failures of this round)

- Incheon Songdo (e.g. Songdo Central Park lake): not acquired. The Incheon post text
  never mentions Songdo, and the three acquired Incheon photos already cover the
  post's actual sections (Chinatown, Jayu Park, Wolmido). A Songdo photo would have
  had no section to go in.
- Incheon Airport photo: same reason - the post is about the old port, not the airport.
- Fairy Tale Village photo (Incheon): no suitable freely licensed photo was verified
  in this round. The section stays text-only for now.
- Jajangmyeon photo (Incheon lunch section): no bowl-of-jajangmyeon photo was verified
  in this round. Do not substitute a generic noodle photo.
- Cheonggyecheon photo for the 3-day guide: the only one in the library is seoul-20
  (CC BY-NC-ND) and it is excluded. A new freely licensed Cheonggyecheon photo still
  needs to be found.
- Beef gukbap with bean sprouts and radish in a steel bowl (Busan post): no exact
  match found; closest candidate noted in 4f and deliberately not acquired.
- Seomyeon gukbap alley at night, Uam-dong market alley, Imun dining room, baekban
  set tray (Busan + old-restaurants posts): no verified matches in this round.
  These 4 slots stay open.
