# hoho-tour.com 전면 대개편 — 1차 BUILD_LOG

- 기준: 라이브 main HEAD 3d05280 (2026-11-18 19:32, "Revamp: taxonomies, hero images, 2 new guides, 12 more photos, photo dims, shortcodes")을 클론. 로컬 ~/workspace/hoho-tour/는 2개 파일이 낡아 있었음 (baseof.html에 Travelpayouts 스크립트 없음, index.html "Five guides" + 무조건 칩). 작업본 ~/workspace/hoho-tour-revamp/work, 브랜치 revamp/blog-1119. main 직접 푸시·라이브 배포 없음.
- 빌드: Hugo 0.152.2 extended (~/workspace/infra-gate/tools/hugo-bin/hugo, tar.gz에서 복원 — 바이너리가 사라져 있었음). 명령 `hugo --minify`. 결과 21 pages, 0 에러.
- 1차 범위: 디자인·배너·홈·고지문 + 기존 7편 정비 + 추가 오더 3건(투어 지도, GPT 포인트 이미지, 제휴링크 실상품).

## 1. 디자인·홈·배너 (에이전트 ad4afbbf)

- 바꾼 파일: index.html, partials/header·footer, _default/list·term·taxonomy, static/css/style.css 전면 재작성, static/images/banner/ 신규 4장 (기존 검증 실사진 재사용 — 북촌 블루아워 seoul-03, 경복궁 seoul-01, 감천 일몰 seoul-30, 경포해변 seoul-11, Basile Morin/Sergiy Galyonkin, CC BY-SA 4.0, AI 없음).
- 팔레트: 화이트 베이스 + 코랄 #F0563A / 스카이 #2E9BD6 / 선셋 #F5A623, 라운드 카드 24px, Fraunces 폐기 (Inter 산스 800). 홈: 큰 실사진 히어로 → 지역·테마 칩 → 카드 그리드 (모바일 1열, 700px 2열, 1024px 3열).
- 고지문: footer.html·index.html에 지정 영문 그대로 삽입.
- 보너스 수정: Hugo 0.152.2에서 지역 term 페이지가 term.html이 아니라 taxonomy.html로 렌더돼 가이드 5편이 있는데도 "No guides filed here yet"이 떴던 버그 — taxonomy.html 하나가 목록/term 양쪽을 처리하게 수정. 서울 5편·부산 1편·Food 3편 카드 정상 렌더 확인.
- 캡처: ~/workspace/hoho-tour-revamp/captures-design/ 11장 (home/blog-list/region-seoul/regions-index x 390px/1440px). 결함 2건(모바일 헤더 겹침, 히어로 크레딧 가림) 수정 완료.
- 노트: ~/workspace/hoho-tour-revamp/notes-design.md

## 2. 기존 7편 정비 (에이전트 58ecd2ea)

- 단어 수 (본문 prose 기준): 3일 1,874 / 지하철 1,982 / 시장 1,676 / 인천 1,835 / 겨울 1,990 / 부산 1,565 / 노포 1,737. 전편 1,200-2,000 범위 안.
- 첫 문단 결론, 질문·행동형 소제목, 2인칭, 문단 2-4문장, 전편 팁 박스 1개 이상 + 비교표 또는 동선 요약표.
- 허위 1인칭 전수 제거 ("I have done it more than once", "I have eaten gukbap at both of those hours", "I have been back four or five times" 포함 20여 개).
- 사실 정정 2건: AREX Express 11,000원 → 역 창구 13,000원 / Klook 약 11,500원, N Seoul Tower 전망대 20,000원 → 창구 29,000원 / Klook 약 24,100원.
- 이미지: 전편 콜라주 1개 이상, 글당 4-8장, "IMAGE HERE" 0건. seoul-19 (BY-NC-SA)·seoul-20 (BY-NC-ND)은 상업 이용 제한으로 미사용. 인천 콜라주는 인천 사진 4장뿐이라 27·29를 요약 스트립으로 의도적 재사용.
- 제휴링크: 검색 페이지 0건, 실제 상품 페이지 13개 (아래 목록). 글당 aff 수: 3일 4개, 나머지 2개씩.
- 수정 파일은 소유권 범위 9개만 (content/blog 7편, about.md, single.html).
- 노트: ~/workspace/hoho-tour-revamp/notes-posts-existing.md

## 3. 고지문 교체 위치 (5곳 — 오더 4곳 + privacy.md 잔재 1곳)

지정 문구: "Some links on this page are affiliate links. If you book through one, we may earn a small commission at no extra cost to you. It never changes what we recommend."

- layouts/partials/footer.html (푸터, verbatim)
- layouts/index.html (홈 하단, "Affiliate disclosure:" 머리말 + verbatim)
- layouts/_default/single.html (글 하단 disclosure div, verbatim)
- content/about.md (동일 취지 문단으로 재작성 + "직접 가본 곳과 자료로 확인한 곳을 구분해 표기한다"는 정직한 설명. "We go there first" 삭제)
- content/privacy.md (5번째 잔재 — "These are plain links, not affiliate links... We do not earn a commission" → 지정 문구로 교체. 코디네이터가 직접 수정)
- "plain link / no commission" 표현 전수 grep 0건. baseof.html의 Travelpayouts 스크립트 (emrld.ltd/NTk5NzYz.js?t=599763) 미접촉 — 빌드된 public/index.html에도 유지 확인. baseof.html의 미사용 Fraunces 폰트 링크만 제거 (Inter만 남김).

## 4. 투어 지도 — 정적 코스 맵 이미지 (추가 오더 1)

- Leaflet + OpenStreetMap 인터랙티브는 이 환경에서 불가 (시스템 지침상 CDN 지도 라이브러리·타일 사용 금지, Secure VM이라 외부 지도 API 호출 없이 게스트 렌더링이 정본). 오더의 2순위(정적 코스 맵 이미지)로 진행.
- 방식: 검증된 실좌표로 게스트에서 직접 그린 스케매틱 루트 맵 (PIL, 스크립트 ~/workspace/hoho-tour-revamp/render_maps.py). 번호 마커 + 이동 순서 폴리라인, 빽빽한 클러스터는 확대 인셋 (인천·지하철 글), 이미지 하단에 "Schematic route map — stops in visit order, not to scale. © OpenStreetMap contributors" 표기. OSM 타일을 안 쓰므로 OSM 지도 저작자 표기는 좌표 출처 표기로 대체.
- 좌표 출처: OpenStreetMap Nominatim, 2026-11-19 (스크립트 ~/workspace/hoho-tour-revamp/geocode_stops.py, 결과 ~/workspace/hoho-tour-revamp/map-stops.json). 총 38건 시도 → 37건 검증, 1건 누락.
- 누락 1건: Siu Sikdang (노포 글 Day 1 noon) — 이름·한글명·도로명 주소(18 Pilun-daero) 모두 Nominatim 무응답이라 지도에서 빼고 본문·캡션에 명시 ("not plotted — no verified coordinates were found"). 추정 좌표 사용 안 함.
- 정정 1건: Cheonggyecheon Stream 첫 결과는 동쪽 끝(127.03673, 마장동 인근)이라 Cheonggye Plaza(37.56921, 126.97798, 종노 시작점)로 교체.
- 삽입 위치: "하루 동선 요약" 표 바로 아래 (지하철 글은 "Where does the subway actually drop you?" 섹션 끝). figure class="map-figure" — 모바일(700px 이하)에서는 지도 안에서만 가로 스크롤 (페이지 가로 넘침 0px 실측).
- 파일: static/images/maps/<slug>-map.webp 7개, 1600x840, 32-101 KB. photo-dims.yaml 등록 완료. CREDITS.md에 좌표 출처·누락 사유 기록.
- 정류장 수: 3일 9 / 지하철 5 / 시장 3 / 인천 5 / 겨울 5 / 부산 6 / 노포 4 (Siu 제외).

## 5. GPT 포인트 이미지 (추가 오더 2 — 조건 변경 적용)

- 기존 "AI 생성 이미지 금지" → 변경: 설명책자·인포그래픽·무드 일러스트 포인트 이미지 1-2컷 허용·권장. 실사 사진을 AI로 흉내내는 것은 계속 금지. 실사진 4-8장 규격 유지, GPT 컷은 포인트로만 추가.
- 생성: 미디어 이미지 생성 도구 (GPT 이미지 생성), 2026-11-19, 코디네이터 직접 생성 7컷 (글마다 1컷). 스타일 통일: 밝은 파스텔 + 코랄·스카이, 플랫 벡터, 부드러운 그림자, 여백 넉넉, 영어 짧은 라벨만.
- 파일: static/images/illust/<name>-illust.webp 7개, webp 긴 변 1600px, 57-84 KB. photo-dims.yaml 등록 완료. 캡션에 "Illustration: AI-generated" 명시, CREDITS.md에 프롬프트·생성일 기록.
- 프롬프트 (공통 머리말: "Bright pastel flat vector ... Coral and sky blue accents on white, soft shadows, generous whitespace, short English labels only, clean modern guidebook style, 16:9 landscape."):
  - 3day-illust: Seoul 3-day itinerary infographic, three day cards (Palace / Hongdae and Han River / Markets)
  - subway-illust: Transit tips infographic (T-money card, subway train, taxi; labels AREX, T-money, Subway, Taxi)
  - market-illust: Market stall scene (bindaetteok, gimbap, noodles)
  - incheon-illust: Day trip route card (train, red Chinatown gate, park viewpoint, sea train)
  - winter-illust: Winter packing infographic (long coat, scarf, gloves, hot soup bowl)
  - busan-illust: Soup comparison infographic (hot gukbap vs cold milmyeon, two bowls)
  - old-illust: Old restaurant guide (seolleongtang, gomtang, samgyetang, barbecue grill)
- 삽입 위치: 인트로 뒤, 첫 소제목 앞.

## 6. 제휴링크 — 실제 상품 페이지 (추가 오더 3)

- 글당 2-4개, Klook 실상품 + 아고다 실호텔. 검색 페이지 0건, 임의 추적 파라미터 0건, 링크 나열 블록 없음 (문단 인라인 또는 팁 박스 안 "Book this" 형태).
- 검증: Klook 12개는 browser.open으로 상품 페이지 직접 확인 (상품명·평점·InStock), 아고다 1개는 curl 200 확인. 404·판매종료 0건.
- 교체한 URL 목록 (13개 고유):
  - https://www.klook.com/en-US/activity/1163-airport-to-seoul-city-center-arex-train-incheon/
  - https://www.klook.com/en-US/activity/7955-hanbok-rental-voucher-at-kyeonbokgung-store-in-hanboknam-seoul/
  - https://www.klook.com/en-US/activity/95245-gyeongbokgung-tour/
  - https://www.klook.com/en-US/activity/412-n-seoul-tower-seoul/
  - https://www.klook.com/en-US/activity/87680-seoul-food-tour/
  - https://www.klook.com/en-US/activity/153144-seoul-night-tour-han-river-cruise-gwangjang-market-hidden-street/
  - https://www.klook.com/en-US/activity/4660-shopping-food-tour-incheon-seoul/
  - https://www.klook.com/en-US/activity/76596-private-incheon-airport-taxi-transfers-seoul/
  - https://www.klook.com/en-US/activity/216-dmz-tour-gyeonggi-do/
  - https://www.klook.com/en-US/activity/74132-busan-oneday-tour-busan/
  - https://www.klook.com/en-US/activity/112810-ktx-busan-one-day-city-tour-from-seoul/
  - https://www.klook.com/en-US/activity/101959-west-korea-tour/
  - https://www.agoda.com/en-us/lotte-hotel-seoul/hotel/seoul-kr.html

## 7. 자체 게이트 결과 (1차)

- hugo --minify 통과 (21 pages, 0 에러, 0 경고성 실패).
- 내부 링크 404: 0 (public/ 전수 검사, 인용부호 없는 minify 속성까지 대응한 정규식으로 재검사).
- 이미지 404: 0 (전수 검사).
- 모든 img에 width/height: 0건 누락 (photo-dims.yaml에 신규 14개 파일 등록).
- 자리표시자: "IMAGE HERE" / TODO / Lorem 0건.
- 고지문 일관성: 5곳 모두 지정 문구 (4곳 + privacy.md).
- 긴 바 문자 (—, –): content/ + layouts/ 0건 (삽입 과정에서 들어간 41건 전부 하이픈으로 교체).
- Travelpayouts 스크립트: 빌드된 public/index.html에 유지.
- Playwright 검수 (Chromium, 1440/390): ~/workspace/hoho-tour-revamp/captures-phase1/ — home-1440/390, 3day-1440/390, busan-1440/390, incheon-1440/390 + 지도 근접 확인 2장 (3day-map-check, incheon-map-390). 육안 확인: 홈 밝은 히어로·칩·카드 그리드 정상, 일러스트·지도 렌더 정상, 모바일 가로 넘침 0px, 지도 모바일 내부 스크롤 동작 확인.
- 알려진 주의: 전체 페이지 스크린샷에서 lazy 이미지 일부가 빈칸으로 보였으나, 스크롤 후 재확인하면 전부 로드됨 (지연 로딩 타이밍 문제, 사이트 결함 아님 — 지도 포함 10개 이미지 전수 naturalWidth 확인 완료).
- 수정 이력 (검수 중 발견·조치): (1) 일러스트 figure 경로 이중 접미사 버그 (busan-illust-illust.webp → busan-illust.webp, 7편 전부 수정) — 첫 404 검사가 minify 무인용 속성을 못 잡아 놓친 것, 정규식 수정 후 재검사로 0건 확정. (2) 지도 첫 렌더에서 라벨 겹침 → 충돌 회피 + 클러스터 인셋으로 재생성. (3) 미디어 도구 부산물 JSON 7개가 static/에 남아 public/으로 복사됨 → 삭제. (4) Hugo 바이너리 소실 → hugo.tar.gz에서 0.152.2 extended 복원.

## 8. 1차 zip

- ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-phase1.zip — work/ 내용물을 사이트 루트로 (public/, resources/, .git, .hugo_build.lock 제외) + 이 BUILD_LOG.md. Ttolmani 검수용: 압축 해제 후 `hugo --minify`로 빌드, 스크린샷 육안.

## 9. 2차·3차 진행 상황 (1차 보고 시점)

- 2차 신규 7편 (마감 11-19 21:00): 에이전트 dc8434b1 진행 중 (스테이징 stage2). 추가 오더 3건 전달 완료 (map stops + GPT 이미지 1-2컷 + 제휴링크 맥락 배치).
- 3차 신규 6편 (마감 11-20 15:00): 에이전트 d52e05ca 완료 보고 수령 (2026-11-19 05:23). 스테이징 stage3에만 작성, 사이트 미접촉. 글 6편 (1,227-1,524단어), 실사진 30장 + AI 일러스트 6장, 글당 제휴링크 2-3개, map stops 포함 (Nominatim 좌표, 3곳 미확인으로 제외: 남부시장, 객리단길, 방화수류정). 통합은 2차 완료 후 순차 진행. 주의: 택소노미 갭 — themes itineraries/cafes/nightlife + region jeonju가 hugo.yaml에 없음 (Hugo는 front matter에서 자동 생성하므로 빌드는 되나, 홈 칩에는 없음 — 통합 때 칩 추가 여부 판단 필요). 사진 규격 예외 4장 1400px (250KB 맞춤) + Flickr 원본 1024px 7장 (업스케일 금지 원칙). 시한성 사실 4건 글 안에 명기 (경기전 단청 보수 2026-12-17까지, 반포 분수 4-10월만, 화성행궁 야간 개장 2026-11-01 종료, Klook 수원 야경 투어 2026-11-23부터 예약 가능).

## 10. 1차 최종 (정본 2026-11-19 05:44 반영 - 움직이는 지도 홈페이지)

- 로드맵 단계: 0단계 (틀 갖추기 - 움직이는 지도 UX + 네이버 블로그식 섹션 + 클로드/GPT 분업 + 실제 제휴링크). 1단계 국내 주요 도시는 7편+인천 포함 8개 지역으로 진행 중, 여수 다음. 2-4단계(동북아·아시아·전 세계)는 만들지 않음.
- 기준: main HEAD 3d05280 클론 + revamp/blog-1119. main 직접 푸시·라이브 배포 없음. 배포는 똘마니 검수 후 똘마니가 함.
- 글 수: 14편 (기존 7편 + 신규 7편 조기 포함 - 2차분이 1차에 들어감. 21:00 2차는 3차분 6편을 넣어 총 20편으로 2·3차 통합, 하루 조기 완료 예정).

### 10-1. 아키텍처 (클로드 코드 CLI로 홈페이지 코딩, GPT 이미지로 꾸미기 분업)
- data/regions.yaml: 국가·지역·도시 3계층 단일 원본 (country korea, regions 8개: seoul/busan/incheon/jeju/gyeongju/gangwon/jeonju/gyeonggi-suwon, slug·표시명·중심좌표·subthemes·path id·대표 이미지·상태 active/coming-soon). 홈·허브·네비가 모두 이 파일을 읽음.
- 홈 지도: 인라인 SVG 한국 시·도 경계 (Natural Earth 1:10m Admin 1, public domain, 단순화 후 data/korea_provinces.json 21KB, 지도 하단 출처 표기). layouts/partials/home-map.html + assets/js/home-map.js (로컬 파일, CDN 없음). 지역 path 클릭 → 같은 화면에서 가이드 카드 필터 + 제목 변경 (페이지 이동 없음). 키보드 접근 (role=button, tabindex, 포커스 링), noscript 대체 (지역 링크 리스트), 반응형 (모바일 390px 지도 260-300px·칩 가로 스크롤·카드 1열, 데스크톱 480px·카드 3열). 가이드 있는 6개 지역 클릭 가능, 전주·경기-수원 coming-soon은 회색 비활성, 나머지 10개 도는 음영 비클릭.
- 지역 허브: content/regions/<slug>/_index.md에 url: /korea/<slug>/ 로 허브 URL (8개 전부 생성). layouts/_default/term.html + taxonomy.html이 공유 partial term-page.html을 부름 (Hugo 0.152는 term 페이지를 taxonomy.html로 렌더함). 허브 구성: 무드 일러스트 (regions.yaml image) + blurb + 소분류 칩 (해당 지역에 가이드 있는 테마만, 클라이언트 필터) + 카드 그리드. coming-soon 허브는 일러스트 + blurb + "Guides coming soon" 표시.
- 투어 상세 동선 요약: layouts/partials/tour-summary.html이 front matter stops를 읽어 정적 지도 + 타임라인/스팟 카드 렌더. 14편 전부 stops를 front matter로 이동 (migrate_stops.py), 손으로 넣었던 지도 블록은 본문에서 제거. single.html은 히어로 바로 아래에 tour-summary, 상단에 breadcrumbs partial (Home > 지역 > 테마 + BreadcrumbList 구조화 데이터), 하단에 related-posts partial (같은 지역 우선 + 같은 테마 다른 지역으로 3개까지).
- 상단 네비: header.html에 대분류 8개 지역 고정 (regions.yaml에서 읽음, /korea/<slug>/ 링크). 모바일에서는 가로 스크롤 (페이지 가로 넘침 0px).
- 홈: 가이드 14편 전부 표시 (필터 때문에 기존 최신 10편에서 전체로 변경).

### 10-2. GPT 이미지 (코디네이터 직접 생성, 2026-11-19)
- 홈 배너 1장: images/banner/home-banner.webp (1600x533, 69KB). 프롬프트: Wide flat vector travel banner illustration for a Seoul Korea travel blog hero: Gyeongbokgung palace roof, N Seoul Tower on a hill, Han River with a cruise boat, cherry blossom branches, bright pastel cream background with coral and sky blue accents, flat vector with soft shadows, generous whitespace, short English labels only: Seoul, Korea.
- 지역 허브 무드 일러스트 8장 (전부 1600x1067 webp, 캡션·CREDITS.md에 AI-generated 명시): seoul-mood (65KB), busan-mood (115KB), incheon-mood (90KB), jeju-mood (65KB), gyeongju-mood (82KB), gangwon-mood (63KB), jeonju-mood (107KB), gyeonggi-suwon-mood (101KB). 프롬프트 패턴: Flat vector mood illustration of <지역> for a travel guide hub page: <랜드마크 3-4개>, bright pastel cream background with coral and sky blue accents, flat vector with soft shadows, generous whitespace, short English label only: <지역>.
- 인천 추가: 정본 지역 목록에 없었으나 인천 가이드 1편이 지도·칩에서 빠져 있는 결함이라 코디네이터 판단으로 regions.yaml + 허브 + 무드 일러스트 추가 (8번째 지역). Natural Earth 데이터에 incheon 경계가 있어 지도 클릭도 동작.

### 10-3. 정직성 수정 (검수 중 발견)
- layouts/index.html: "New guides are added only after we have been there ourselves." → "New guides are added when we can check them properly - from a visit, or from recent listings and reviews." / "places we have actually been" → "places we have checked" (연구 기반 가이드와 모순되는 절대 주장이라 수정).
- layouts/partials/term-page.html (coming-soon 허브): "We only publish a guide after we have been there ourselves." → "we are still checking it properly before publishing." (같은 이유).

### 10-4. 정본과의 편차 (사유 포함)
- Leaflet 인터랙티브 동선 지도: 미구현. 저장소에 tourmap 숏코드가 없고, 이 환경은 CDN 지도 라이브러리·타일을 쓸 수 없음. 대신 정적 코스 맵 + tour-summary partial (지도 + 타임라인/스팟 카드)로 동선 요약 블록을 구현. 글 속 지도는 정적, 홈 지도는 인터랙티브 SVG.
- /korea/busan/1박2일/ 식 중첩 테마 URL: Hugo taxonomy로 자동 생성 불가. 허브 내 소분류 칩 클라이언트 필터 + /themes/<테마>/ 페이지로 대체.
- 테마 라벨: 정본 소분류는 한국어(데이트/맛집/야경/당일치기/1박2일/카페/액티비티)이나 사이트는 영문 블로그라 영문 슬러그 유지 (food-restaurants, nightlife, day-trips, itineraries, cafes). 데이트·액티비티는 해당 글 없어서 칩 없음. 매핑은 BUILD_LOG에만 기록.
- 신규 7편 날짜 2026-11-19는 UTC 기준 미래 글이라 plain `hugo --minify` 빌드에서 빠짐. 검증은 --buildFuture로 했고, 2026-11-19 09:00 KST 이후 plain 빌드에도 포함됨. 배포 워크플로우(.github/workflows/deploy.yml)는 plain hugo라 09:00 전 배포 시 신규 7편이 빠지니 주의.

### 10-5. 자체 게이트 결과 (1차 최종)
- hugo --minify --buildFuture 통과 (36 pages, 127 static files, 0 에러, 0 경고).
- 내부 링크 404: 0 / 이미지 404: 0 / 모든 img width/height: 0건 누락 (zgotmplz 0건 — tour-summary partial의 photo-dims 호출에 safeHTMLAttr 누락돼 나온 zgotmplz를 수정, term-page 허브 이미지·홈 배너 높이 오기(900→533)도 수정).
- 자리표시자 0건 / 긴 바 문자 0건 / 고지문 5곳 일관 (지정 문구) / Travelpayouts 스크립트 public/index.html에 유지.
- 지도 클릭 → 리스트 동작: Playwright 실측. 지도 핀 실마우스 클릭 → 제목 "Guides in Busan", 카드 2장, URL 그대로 홈. 지도 path 직접 클릭(dispatch) → 동일. 키보드 Enter (Jeju) → 3장 (클로드 코드 자체 검수). "All regions" → 14장 복귀.
- JS 에러: 없음 (샌드박스 Google Fonts 터널 실패 4건은 샌드박스 네트워크 문제라 게이트 대상 아님).
- 모바일 가로 넘침: 0px (데스크톱·모바일 모두). 지도 모바일 내부 스크롤 동작.
- Playwright 검수 (Chromium, 1440/390): ~/workspace/hoho-tour-revamp/captures-phase1-final/ 5장. 01-home-map-1440 (지도·칩·출처), 02-home-busan-unfolded-1440 (부산 선택 상태·"2 guides in Busan"), 03-detail-toursummary-1440 (제주 3일 상세 상단 동선 요약), 04-home-390 (모바일 홈 전체), 05-detail-390 (모바일 상세 상단). 육안 확인: 지도 렌더·라벨 수(Seoul 5, Busan 2, Incheon 1, Jeju 3, Gyeongju 2, Gangwon 1) 일치, 허브 무드 일러스트·배너 정상, 동선 요약 지도 마커·스팟 라벨 정상.
- 알려진 주의: 지도 핀(circle)이 path 중심을 덮고 있어 Playwright의 path 중심 클릭은 hit-test에서 막힘. 실제 사용자는 핀을 눌러도 같은 필터가 동작 (이벤트 위임, closest data-filter-value)하고, path 빈 곳을 눌러도 동작. 테스트는 핀 실클릭 + path dispatch 둘 다 확인함.

### 10-6. 1차 최종 zip
- ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-phase1-final.zip — work/ 내용물을 사이트 루트로 (public/, resources/, .git, .hugo_build.lock 제외) + 이 BUILD_LOG.md. Ttolmani 검수용: 압축 해제 후 `hugo --minify`로 빌드 (09:00 KST 이후면 신규 7편 포함, 이전이면 --buildFuture 추가), 스크린샷 육안.

## 11. 2차·3차 계획 변경 (1차 최종 시점)
- 2차 (11-19 21:00): stage3 6편 통합 (속초·설악, 전주 하루, 전주 야시장·카페, 서울 카페, 서울 야경·한강, 수원 화성). 총 20편. 2·3차 통합으로 하루 조기 완료 예정. stage3 초안은 이미 완료돼 있음 (MANIFEST·사진 30장 + AI 6장·map stops·제휴링크 검증 완료). 통합 때 택소노미 갭 (themes itineraries/cafes/nightlife + region jeonju 홈 칩 부재)은 이번 아키텍처로 해결됨 (regions.yaml + 동적 칩). 남은 주의: 사진 규격 예외 4장 1400px + Flickr 1024px 7장, 시한성 사실 4건 글 내 명기, OMITTED 3곳 (남부시장, 객리단길, 방화수류정) 지도 제외 유지.
- 1차에 포함된 2차분 (stage2 7편): 제주 3일(렌터카 없이), 제주 동쪽, 제주 서쪽, 부산 1박 2일, 경주 하루, 경주 야경, 강릉 1박. 실사진 38장 + GPT 일러스트 9컷, 글당 제휴링크 3-4개 (Klook 실상품, browser.open 검증 / 아고다 curl 200), 지도 정류장 40개 검증 (한담 해안산책로 제외), 드롭된 사진 3장 (Wikimedia 429).

## 12. 2·3차 통합 — 총 20편 완성 (2026-11-19 06:37-07:10 KST, 코디네이터)

- 로드맵 단계: 0단계 유지 (틀 갖추기). 1단계 국내 주요 도시는 8개 지역 전부 active로 완성 (서울 7·부산 2·인천 1·제주 3·경주 2·강원 2·전주 2·경기-수원 1 = 20편). 여수 다음. 2-4단계는 만들지 않음.
- 통합 방법: `integrate_stage.py stage3` (글 6편 복사, 사진 36장 복사, dims 병합, CREDITS 추가, map-stops.json 병합, 지도 6장 렌더, 본문에 지도 블록 삽입) → `migrate_stops.py` (stops를 front matter로 이동, 손으로 넣은 지도 블록 제거 — tour-summary partial이 렌더). 작업 전 work/ 백업: `work-backup-phase1/` (1차 최종 상태 그대로).
- 날짜 처리 (정본 지시 반영): stage3 초안 날짜 2026-11-20 → 2026-11-19로 변경 (6편 전부). hugo.yaml에 `timeZone: Asia/Seoul` 추가 — plain `hugo --minify` 빌드에 오늘 날짜 글이 포함되게 함. 이로써 10-4절의 "--buildFuture 안내(09:00 KST 이후)" 주의도 해소됨 (plain 빌드로 20편 전부 확인).
- regions.yaml: jeonju·gyeonggi-suwon status coming-soon → active, blurb에서 "Guides coming soon." 삭제, jeonju subthemes에 day-trips 추가 (jeonju-one-day가 day-trips 사용). 홈 지도·네비·허브는 taxonomy 실측 + status로 자동 전환됨 (별도 템플릿 수정 없음).
- 지도: 신규 정적 코스 맵 6장 (1600x840, 27-47 KB), 정류장 총 36개 — 속초 8·전주 하루 7·전주 야시장 5·서울 카페 5·서울 야경 6·수원 5. OMITTED 3곳 유지 (객리단길·남부시장·방화수류정, map_note로 본문·지도 캡션에 명시). 속초 지도는 클러스터 인셋 적용 (2-8번 정류장이 Sokcho 시내에 몰림).
- 사진: 36장 (실사 30장 + GPT 일러스트 6장). dims 병합 완료. CREDITS: integrate 스크립트가 실사 0건을 추가하는 버그가 있어 코디네이터가 직접 30행을 추가함 (원인: stage3 PHOTO-SOURCES 실사표의 File 칸에 치수 괄호가 없어 스크립트 정규식이 매칭 실패. 일러스트 6건은 정상 추가됨). 재사용 사진 5장(seoul-24·seoul-35·seoul-04·seoul-25·seoul-10)은 기존 CREDITS 유지.
- 제휴링크: 신규 6편 글당 2-3개 (Klook 실상품 + 아고다 지역 페이지, stage3 검증 완료 — browser.open / curl 200, 403은 Klook 봇 차단). 사이트 전체 고유 제휴 URL 34개, 검색 페이지 0건, 임의 추적 파라미터 0건.
- 사진 규격 예외 (stage3 MANIFEST 그대로): 1400px 4장 (sokcho-03·04, jeonju-02, suwon-02) + Flickr 원본 1024px 7장 (업스케일 금지). 시한성 사실 4건 글 내 명기 유지 (경기전 단청 보수 2026-12-17까지, 반포 분수 4-10월만, 화성행궁 야간 개장 2026-11-01 종료, Klook 수원 야경 투어 2026-11-23부터 예약 가능).

### 12-1. 게이트 결과 (2차 최종, 전부 PASS)
- `hugo --minify` (plain, --buildFuture 없음) 통과: 42 pages, 0 에러, 0 경고. public/blog 20편 전부.
- 내부 링크 404: 0 / 이미지 404: 0 / 모든 img width/height: 0건 누락 (gate_phase2.py 전수 검사).
- 자리표시자 0건 / 긴 바 문자 0건 / 고지문 5곳 일관 (지정 문구, about.md는 줄바꿈 포함 verbatim) / "plain link / no commission" 0건 / Travelpayouts 스크립트 public/index.html에 유지.
- 지도 클릭 → 리스트 동작: Playwright 실측, 전주 클릭 → "2 guides in Jeonju." 홈 지도 전주·경기 도형 prov--active 확인, 카운트 Jeonju 2 / Gyeonggi-Suwon 1.
- tour-summary: 신규 6편 전부 지도 + 스탑 리스트 렌더 (naturalWidth 1600 확인). 허브 전주·수원 "Guides coming soon" 0건.
- JS 에러: 없음 (샌드박스 Google Fonts 터널 실패 2건은 샌드박스 네트워크 문제라 게이트 대상 아님 — 1차와 동일).
- 가로 넘침: 데스크톱 0px / 모바일 390px 0px.
- 이미지 로딩: 홈 22장 + 신규 6편 10-11장씩, 스크롤 후 naturalWidth 전수 확인 0건 실패 (전체 페이지 스크린샷에서 lazy 이미지 일부가 빈칸으로 보이는 것은 지연 로딩 타이밍, 사이트 결함 아님 — 1차와 동일).
- Playwright 검수 (Chromium, 1440/390): ~/workspace/hoho-tour-revamp/captures-phase2-final/ — 01-home-map-1440, 02-home-jeonju-unfolded-1440, 03-detail-toursummary-1440 (수원), 03b-toursummary-suwon/sokcho/jeonju-1440 (동선 요약 근접), 04-home-390 (전체), 05-detail-390, 06-hub-jeonju-1440. 육안 확인: 홈 배너·지도·칩·카드 20장 정상, 전주 클릭 필터·허브 칩(Food 2·Nightlife 1·Day Trips 1) 정상, 동선 요약 지도 마커·스탑 라벨 정상.
- 알려진 사소한 결함 (게이트 대상 아님, 다음 차수 후보): (1) 홈 지도 핀 라벨이 북서쪽에 몰려 "Jeonju 2 / Gyeongju 2"가 붙어 보이고 Seoul/Incheon/Gyeonggi-Suwon 라벨도 빽빽함 (1차부터 동일). (2) 전주 허브 무드 일러스트 하단 "Jeonju" 라벨이 figure 라운드 크롭에 살짝 잘림. (3) 속초 지도 본문 클러스터 라벨은 충돌 회피로 숨겨지고 인셋에서 확인 (1차 인셋 패턴과 동일).

### 12-2. 편차 유지 (1차와 동일)
- Leaflet 인터랙티브 동선 지도: 미구현. 정적 코스 맵 + tour-summary partial 유지.
- /korea/busan/1박2일/ 식 중첩 테마 URL: 허브 내 소분류 칩 클라이언트 필터 + /themes/<테마>/ 페이지로 대체.
- 테마 라벨: 영문 슬러그 유지 (itineraries, cafes, nightlife 등).

### 12-3. 2차 최종 zip
- ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-phase2-final.zip — work/ 내용물을 사이트 루트로 (public/, resources/, .git, .hugo_build.lock, work-backup-phase1/ 제외) + 이 BUILD_LOG.md. Ttolmani 검수용: 압축 해제 후 plain `hugo --minify`로 빌드 (timeZone Asia/Seoul 적용으로 --buildFuture 불필요), 스크린샷 육안.
