# hoho-tour site structure proposal (2026-11-28, draft for Dongho)

Status: spot template built on scratch only. Everything else below is a proposal. Nothing is live.

## Page types and URLs (EN has no prefix, KR under /kr/)
| Type | URL | Template | Status |
|---|---|---|---|
| Itinerary (exists) | /blog/<slug>/ | _default/single.html | live |
| Spot guide (one place) | /spots/<region>/<slug>/ | layouts/spots/single.html | built on scratch (Bobaljae) |
| Spot list per region | /spots/<region>/ and /spots/ | layouts/spots/list.html | built on scratch |
| Where to stay, per region | /stay/<region>/ | proposed: layouts/hub/single.html, type: stay | not built |
| Tours and activities, per region | /tours/<region>/ | same template, type: tours | not built |
| Food and restaurants, per region | /food/<region>/ | same template, type: food | not built |

Notes: the main nav already has Food and Itineraries, so /food/<region>/ should be reconciled with whatever that menu opens today before building. Region slugs stay the existing ones (chungcheong etc.).

## Template contracts
- Spot front matter `spot:` { slug, name, name_ko, region, address, address_ko, lat, lng, elevation_m, fee, hours, getting_there, phone, verified_on, sources[], itineraries[] (blog slugs), nearby[] ("region/slug") }.
- Spot page renders: breadcrumbs (Home > Region > Spots > page), hero, quick-facts box, one-pin OSM/Leaflet map (reuses the itinerary map code, no new map library, free), body, "Appears in itineraries" cards, "Nearby" cards, sources and check date, affiliate disclosure.
- Itinerary stops get an optional `spot: "<region>/<slug>"`; when that page exists (published), the stop name in the route list links to it. Unpublished or draft spot pages produce no link, so nothing 404s.
- Hub pages (stay/tours/food) use one template: front matter `items:` list with name, name_ko, area, lat, lng, photo, one-line verified fact, source URL, and `book:` link (Klook with aid=145455, Agoda only after Dongho decides). Photos follow the same layout rules (A solo, B collage).
- Linking both ways: itinerary lodging line -> /stay/<region>/, tour section -> /tours/<region>/, each spot page ends with "Where to stay" and "Tours nearby" cards pulled from the hubs by area.
- EN and KR pages come as a pair (.md and .kr.md) so hreflang works with the current setup. All new pages start as draft: true.

## Process per region (the SOP in ops/WORKFLOW-NOTES.md)
research -> reviews and search volume ranking -> many photos -> photo layout first -> itinerary -> text. Spot pages come out of the itinerary stop list plus other notable spots ranked by search volume.

## Rollout order
1. Danyang itinerary (rebuilt on scratch, waiting for Dongho's go).
2. Danyang spot pages: Bobaljae (prototype done), Dodamsambong and Seokmun, Gugyeong Market, Danyang River Jando, Gosu Cave, Mancheonha Skywalk, Suyanggae Light Tunnel, paragliding, then other notable spots (Guinsa, Okchon cruise area) by search volume.
3. Danyang hubs: stay (Sono Belle, Edelweiss, others), tours (Klook items already found), food (sogari maeuntang, garlic sundae, market).
4. Show Dongho the Danyang set, then repeat for the next regions in the order of existing posts (Sokcho, Suwon, Jeonju, Busan, Jeju east...), one region at a time.

## Decisions needed from Dongho
- URL names: /spots, /stay, /tours, /food acceptable?
- Affiliate: Klook on stay and tours hubs now; Agoda stays off until he decides.
- Whether spot pages carry the affiliate disclosure and booking cards (built that way now).
- Publish gate: keep draft until he approves each region set.
