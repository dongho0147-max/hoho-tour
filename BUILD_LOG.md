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

## 13. 1차: 지도 백판 해결 + 대전 + 스티키 + 재미보강 + 감사 (2026-11-19, 1차 마감 14:00)

작업 노트 7건(NOTES_MAP, NOTES_DAEJEON, NOTES_STICKERS, NOTES_REWRITE5, NOTES_COUNTER, NOTES_AUDIT16, NOTES_STICKER_INSERT)을 이 절로 합침. 검증 담당이 빌드·게이트·스크린샷 검수 후 패키징함.

### 13-1. 지도 방식
- 전 글 Leaflet A 방식 (인터랙티브 Leaflet 동선 지도 + 정적 맵 폴백 + 스탑 리스트). Leaflet B (SVG 폴백) 사용 0건.
- 타일 출처: tile.openstreetmap.org, 캡션·어트리뷰션 "(c) OpenStreetMap contributors". 빈 타일 대응 errorTileUrl은 회색 SVG data URI (#dfe3e6).
- 좌표 출처: 전 스탑 OpenStreetMap Nominatim 검증, Nov 2026. 좌표 없는 스탑은 지도에서 빼고 map_note에 유지 (Gaekridan-gil, Nambu Market, Banghwasuryujeong, Handam Coastal Trail, 대전역 지점·DCC 지점).
- 가까이 붙은 스탑(900m 미만)은 화면에서 밀어내고 점선 리더 라인으로 실제 위치 표시 (제주 협재/한림/금능, 대전역 일대 1-2-3번).
- 모바일: scrollWheelZoom 끄고, coarse pointer에서는 "Tap to explore the map" 버튼을 눌러야 드래그·줌이 켜짐 (페이지 스크롤을 지도가 먹지 않음).

### 13-2. Leaflet 내장 (zip 블로커 - 미수령)
- 정본 zip: leaflet-1.9.4-dist.zip, 53,500B, MD5 7496828402bcc7b3c6b7bcb54e4f04d7. 2026-11-19 11:00 기준 미수령.
- 내장 경로: static/vendor/leaflet/ (leaflet.js, leaflet.css, images/marker-icon.png, marker-icon-2x.png, marker-shadow.png, layers.png, layers-2x.png). 현재 static/vendor/leaflet/ 없음.
- unpkg 대체 금지: 10:47에 받은 unpkg 파일은 10:48에 삭제했고 트리에 unpkg 잔재 0건 (grep 확인).
- zip 도착 후 절차: MD5 확인, 7개 파일 확인, static/vendor/leaflet/에 압축 해제, 재빌드, public/vendor/leaflet/ 확인, 라이브 렌더·마커 클릭-팝업 재검증. zip이 오면 검증 담당이 직접 벤더링하지 않고 코디네이터에게 즉시 알림.
- 이번 1차 검증에서는 라이브 지도 배경 렌더·마커 클릭-팝업 2개 게이트를 "zip 대기 중"으로 기록하고, 폴백 상태(정적 맵 + 리스트) 정상 렌더까지만 확인함.

### 13-3. 대전 신규 파일
- data/regions.yaml: daejeon 항목 추가 (center Daejeon Station 36.3314, 127.4334, subthemes food-restaurants/day-trips/cafes, image images/hubs/daejeon-mood.webp). data/korea_provinces.json은 전용 daejeon 도형이 이미 있어 수정 없음.
- content/regions/daejeon/_index.md: 허브 페이지용 신규 (없으면 /korea/daejeon/ 미렌더).
- content/blog/daejeon-bread-pilgrimage-seongsimdang-dcc.md: 신규 글 (약 1,960단어, 5스탑, 2인칭, Nov 2026 확인 스탬프, 제휴링크 3개 - Klook 2개 + Agoda 1개, 전부 2026-11-19 라이브 확인).
- static/images/photos/daejeon-01.webp ~ daejeon-06.webp: Wikimedia Commons 실사진 6장 (Trainholic CC BY-SA 4.0 2장, *Youngjin CC BY-SA 3.0, Ryuch CC BY-SA 4.0, Dr.JamesKwon CC BY-SA 4.0, Bernard Gagnon CC0). 전부 캡션에 작가·라이선스 표기, CREDITS.md 기재.
- static/images/hubs/daejeon-mood.webp: 허브 무드 일러스트 (GPT 생성 플랫 벡터, 1600x1067, 59 KB, 캡션 "Illustration: AI-generated").
- static/images/maps/daejeon-bread-pilgrimage-seongsimdang-dcc-map.webp: 정적 코스 맵 (1600x840, 38 KB). 1차 납품분에 파일 자체가 없어서 검증 담당이 기존 render_maps.py + map-stops.json(대전 5스탑 추가, 좌표는 글 front matter의 Nominatim 검증값 그대로)으로 생성하고 data/photo-dims.yaml에 daejeon-bread-pilgrimage-seongsimdang-dcc-map: {width: 1600, height: 840}을 추가함. 생성 맵 육안 확인 완료 (5스탑·인셋·라벨·크레딧 정상).
- data/photo-dims.yaml: daejeon-01 ~ daejeon-06, daejeon-mood, 대전 맵 추가.
- static/images/photos/CREDITS.md: 대전 6장 + 스티커 섹션 추가.

### 13-4. 리라이트 5편
- 대상: jeju-west-aewol-oreum-cafes, seoul-essential-3-day-guide, sokcho-seorak-one-night-from-seoul, suwon-hwaseong-one-day, jeonju-one-day-hanok-bibimbap-gaekridan.
- 공통: 2인칭 블로거 톤, 짧은 문단, 소제목당 이모지 1개, 팁 박스 "> **🔥 Local tip:**" 통일, 가격·시간·노선 수치 유지, 새 팁은 "Based on recent listings/reviews, checked November 2026" 표기, 금지어 (hidden gem / nestled / must-visit / delve / "Whether you're") 0건.
- 편당 신규 사진 1장씩 (전부 Wikimedia, 직접 열어 확인, CREDITS.md + photo-dims.yaml 추가, 1600px 긴 변, 250KB 이하): jeju-west-07 (말차 라떼, Cendy00 CC BY 4.0, 1200x1600, 227 KB), seoul-39 (떡볶이, Choe Kwangmo CC0, 1600x1067, 100 KB), sokcho-07 (회 모둠, littlepepper CC0, 1600x1067, 227 KB), suwon-06 (숯불 갈비, Jo Hanshin CC0, 1600x1200, 244 KB), jeonju-05 (막걸리, jinho kim CC0, 1600x1067, 78 KB).
- 제주 콜라주 중복 해소 (3장 콜라주를 jeju-west-01 + jeju-west-07 2장 콜라주로 교체). 속초 닭강정 실사진은 라이선스 확인된 파일명을 못 찾아 미추가 (후속 sokcho-08 후보).

### 13-5. 스티커 (숏코드 방식 채택 - 정본)
- 6종 12개 파일 (webp 애니메이션 + png 정지, 전부 320x320, 전부 200KB 이하, 최대 187,492B): semo-lets-go, semo-yum, semo-pro-tip, semo-must-visit, semo-tired-rest, semo-photo-spot. 위치 work/static/images/stickers/. 투명 배경, 10프레임 100ms 무한 반복, 라벨은 PIL + DejaVu Sans Bold 직접 합성. 캐릭터 정본은 semo-character-sheet.png (턱시도 무늬 털 고양이).
- 삽입 방식: raw HTML figure는 hugo.yaml markup.goldmark.renderer.unsafe:false라 렌더에서 빠지는 것이 확인돼 (빌드 경고 "Raw HTML omitted"), 신규 숏코드 layouts/shortcodes/sticker.html + `{{< sticker kind="..." >}}` 방식을 채택함. hugo.yaml unsafe 설정은 건드리지 않음. 이 결정은 정본으로 유지할 것.
- 삽입 6편 23곳 (잔여 STICKER 주석 0개): 대전 4 (lets-go, pro-tip, yum, photo-spot), 제주 4, 서울 4, 속초 3, 수원 4, 전주 4. 종류별 합계 lets-go 6, yum 6, photo-spot 5, tired-rest 5, pro-tip 1, must-visit 0.
- CSS: 기존 prefers-reduced-motion 블록에 스티커 규칙 추가 (.sticker-still 평소 숨김, reduced-motion 시 anim 숨김·still 표시).
- CREDITS.md에 "Semo stickers: AI-generated illustrations based on the Semo character sheet..." 섹션 추가.

### 13-6. 스티키 지역 바 + 홈 지도 라벨
- nav.region-nav를 header 밖 형제 요소로 이동, position:sticky, top은 헤더 높이 (데스크톱 64px, 모바일 90px), z-index 60. 헤더도 sticky 유지 (top 0, z-index 50).
- html,body overflow-x:hidden이 sticky를 깨뜨릴 수 있어 overflow-x:clip을 뒤에 추가 (hidden은 폴백으로 유지).
- scroll-margin-top은 헤더 + 바 + 12px (데스크톱 121px, 모바일 142px).
- 홈 지도 라벨 오프셋 테이블 ($labelOff): Seoul 왼쪽/위, Incheon 왼쪽/아래, Gyeonggi-Suwon 오른쪽/아래 (짧은 라벨 "Suwon"), Gangwon 왼쪽/위, Jeonju 오른쪽/아래, Gyeongju 왼쪽/위, Busan 왼쪽, Jeju 오른쪽. "Jeonju 2" vs "Gyeongju 2" 세로 41단위, Seoul/Incheon/Suwon 스택 23단위 이상 분리. geometry 계산상 22px(390px)·15px(데스크톱) 겹침 0건. 홈 지도 서울 카운트는 7 ("Seoul 7").

### 13-7. 카운터
- functions/api/visit.js (Cloudflare Pages Function, /api/visit): POST 1회 카운트, GET 읽기 전용, { total, today } 반환, cache-control: no-store. KV 바인딩 없으면 503 { error: "counter_unavailable" }로 푸터가 카운터를 숨김.
- KV 바인딩명 VISIT_COUNTER, 네임스페이스 제안명 hoho-tour-visits. 키: count:total (무기한), count:YYYY-MM-DD (Asia/Seoul 날짜, TTL 30일), seen:YYYY-MM-DD:<sha256(ip + "|" + date)> (TTL 24시간, IP 원문 미저장). 중복 방지 1순위 날짜 쿠키 ht_visit=YYYY-MM-DD (Max-Age 86400, SameSite=Lax), 2순위 IP 해시 마커. 봇 필터 UA 부분문자열 + cf.botManagement.score < 30.
- wrangler.toml.example만 있음 (실제 wrangler.toml 없음, 플레이스홀더 ID로 커밋 금지). 배포 절차는 NOTES_COUNTER 3절 참조 (Ttolmani 담당, 대시보드 경로 우선). wrangler/miniflare 로컬 미설치라 실바인딩 테스트는 배포 후 (curl /api/visit 확인).
- 푸터: `<p class="foot-counter" id="visit-counter" hidden>` + window load 시 POST, 성공 시에만 숫자 채우고 unhide. 실패 시 숨김 유지·콘솔 에러 없음.
- 검증: node --check 통과, 모의 KV 로직 테스트 10건 전부 통과, counter-captures/01-unbound-hidden.png (실제, 미바인딩 시 숨김), 02-mock-bound-visible.png (MOCK, "Today 123 - Total 4,567" 표시, 숫자는 모의값).

### 13-8. 감사 (개발자/AI 티 제거 + Contact)
- public/ 전체 grep (대소문자 무시): github 0, "open an issue" 0, commit 0, deploy 0, wrangler 0, BUILD_LOG 0. "AI-generated"는 정직한 일러스트 표기라 유지 대상이라 제외 (11개 파일, 캡션·About·CREDITS).
- 수정: privacy.md·about.md의 GitHub 이슈 유도 문구를 mailto:contact@placeholder.invalid로 교체 (아래 13-10 편차 참조). about.md의 거짓 "No AI-generated images are used" 2곳을 "Guidebook illustrations are clearly marked as AI-generated illustrations..."로 교체. 404 페이지 신규 생성 (layouts/404.html, "That page is not here" + 홈·가이드 링크, 4,680B).
- 유지: "Illustration: AI-generated" 캡션 9편 + About + CREDITS, "Guides coming soon" (여행자용 상태 문구), "branch" (빵집 지점), Hugo 주석 속 단어 (렌더 안 됨).
- Daejeon 글의 "before you commit" 동사는 감사 지적 후 "before you settle on one"으로 이미 수정됨 (현재 public/ commit 0건).
- PUSH-RUNBOOK.md PII: 원격 main HEAD에도 있음 (SHA 3ddbf1080d6a16e5f92218051940ba21656812ca, 43줄, 43행). 도입 커밋 adca1c8cc391c976474e31516f4e01c8e517adbc (2026-11-18 07:01:28 UTC). main 히스토리에 남아 있어 파일 삭제 커밋으로는 안 지워지고 force-push 히스토리 정리가 필요함. 실행 안 함, Ttolmani 지시 대기. 같은 43행이 사업자번호 불일치도 지적함 (라이브 값 vs MEMORY 876-12-*****, 주인님 확인 미결).

### 13-9. 게이트 결과 (1차, 검증 담당 실측)
- 빌드: `~/workspace/infra-gate/tools/hugo-bin/hugo --minify` (work/에서 실행), 0 에러, EN 46 pages + KR 15 pages, static files 209. (다국어 도착 전에는 EN 45 pages였고, +1은 Hugo 다국어 기본 동작인 /en/ 리다이렉트 alias 페이지.)
- 기존 게이트 ~/workspace/hoho-tour-revamp/gate_phase2.py: 내부 링크 404 0, 이미지 404 0, img width/height 누락 0, 긴 바 0, Travelpayouts 스크립트 유지, tour-summary 신규 6편 전부, 허브 전주·수원 coming-soon 0, raw 숏코드 0. FAIL 4건은 아래 사유로 게이트 기대값 노후·알려진 미결·오탐이지 회귀가 아님: (1) "20 posts" 기대 vs 실제 21편 (대전 추가가 정당한 증가), (2) placeholders TODO 2건 (about.md·privacy.md Contact TODO, 아래 13-10 미결), (3) "home map counts Jeonju 2 / Suwon 1" 문자열 불일치 (실제 렌더는 지도 라벨 "Suwon 1" + 필터 "Gyeonggi - Suwon (1 guide)"로 카운트 1 정상 표시, 게이트 문자열이 구 라벨 형식), (4) "disclosure 5 places consistent" - 고지문 자체는 5곳 일관 (실패 원인은 신규 lang-toggle.html 5행 Hugo 주석 속 "Plain links, so it works without JS" 문구를 게이트의 단순 부분문자열 검사가 건드린 오탐. 주석은 Hugo가 렌더에서 제거하고 public/ 전수 grep에서 "plain link / no commission" 0건 확인).
- 신규 게이트: (1) 동선 지도 폴백 렌더 - 6편 전부 폴백 표시, 정적 맵 naturalWidth 1600, 빈 지도 숨김 (라이브 렌더·팝업은 zip 대기 중), (2) 빈 타일·컨트롤 겹침 0 (Leaflet 미로딩이라 타일 없음, zip 도착 후 재검증), (3) 대전 허브 카드 노출 확인 (public/korea/daejeon/ 글 카드 + daejeon-mood, "1 guide in Daejeon"), (4) 스티커 - 파일 전부 200KB 이하, 깨진 이미지 0, alt 전부 존재, 모바일 밀림 0, (5) 이모지 - 렌더 깨짐 □ 0, 소제목당 1개 위반 0 (6편 소제목 전수), (6) 사진 - CREDITS.md에 신규 사진 전부 기재 (대전 6장 + 리라이트 5장 + 스티커 섹션), 무단 크롤링 0 (전부 Wikimedia CC/CC0 + AI 일러스트 표기), (7) 감사 grep 위 참조, (8) 카운터 미바인딩 시 숨김 - 현 빌드 푸터 hidden 확인 + 기존 캡처 01 재확인.
- Playwright 스크린샷 (로컬 서버로 public/ 서빙, Chromium, 데스크톱 1440 + 모바일 390): ~/workspace/hoho-tour-revamp/captures-map-daejeon-1st/ (21장 + checks.json). 목록: 01-home-1440, 02-home-map-1440, 03-sticky-500px-1440, 10~15-tourmap 6편-1440, 20~25-sticker 6편-1440, 30-hub-daejeon-1440, 40-home-390, 41-sticky-500px-390, 42-tourmap-daejeon-390, 43-sticker-daejeon-390, 44-tourmap-daejeon-390-swiped.
- 육안 확인: 홈 지도 라벨 겹침 0 (데스크톱·모바일), 스티키 바 500px 스크롤 후 상단 고정 (데스크톱 top 64 sticky, 모바일 top 90 sticky), 스티커 깨짐 없이 표시, 모바일 390px 페이지 가로 넘침 0 (데스크톱·모바일 전 페이지 실측 0px), 대전 폴백 맵 정상 (정적 맵이라 백판처럼 보이는 것이 정상 - 라이브 Leaflet 렌더가 아님), 모바일 폴백 맵은 760px 스와이프 스트립 (overflow-x:auto, 1차부터 동일 설계, 오른쪽 스와이프로 4·5번 스탑 도달 확인).
- JS 페이지 에러 0건. 콘솔 리소스 에러만 있음 (샌드박스 Google Fonts 터널 실패, 로컬 정적 서버의 /api/visit 501, Leaflet js/css 404 2건 - 전부 게이트 대상 아님, zip 대기 사유).

### 13-10. 검증 중 수정 2건 (검증 담당이 1차 납품 전에 직접 수정함)
- (1) 대전 정적 맵 파일 누락 수정: tour-summary 폴백이 참조하는 daejeon-...-map.webp 파일 자체가 없었음 (static/·public/ 전수 부재, 21편 중 대전만 20개 맵 파일). 기존 gate의 이미지 404 검사는 minify된 무따옴표 src를 못 잡아 통과로 나왔던 맹점이 있었고, img width/height 검사에서 걸림. render_maps.py draw_map으로 대전 맵 생성 (38 KB, 5스탑, 인셋 포함) + photo-dims.yaml 맵 항목 추가 후 재빌드에서 width/height PASS로 복구.
- (2) tour-summary 지도 스크립트 치명 결함 수정 (전 21편 해당): layouts/partials/tour-summary.html:44 `document.getElementById({{ $mapID | jsonify }})`가 Hugo html/template의 JS 문맥 자동 이스케이프 때문에 빌드 출력에서 `getElementById("\"tour-map-...\"")` (따옴표 문자 포함 ID)로 렌더돼 getElementById가 항상 null을 반환하고 IIFE가 첫 줄에서 return했음. minify·비minify 빌드 둘 다 동일 결함. 결과: Leaflet zip이 와도 라이브 지도가 절대 뜨지 않고, Leaflet이 없어도 폴백이 뜨지 않아 빈 420px 지도 영역만 보이는 상태였음. 수정: `{{ $mapID | jsonify | safeJS }}` (stops JSON 줄과 같은 패턴). 수정 후 재빌드·라이브 재확인: L 미정의 시 폴백 표시 (fallback hidden false, 정적 맵 naturalWidth 1600, 빈 지도 hidden true), 페이지 에러 0건. 노트 작성자 3곳이 "빌드 통과·node --check 통과"로만 확인해 놓친 결함이라 13-9 게이트에 라이브 동작 확인을 남김.
- baseof.html:6 Travelpayouts 로더 스크립트에 WordPress 플러그인 잔재 속성(nowprocket, data-noptimize, data-cfasync, seraph-accel-crit 등)이 붙어 있음. 동작은 정상 (emrld.ltd 로더)이라 1차에서는 손대지 않고 기록만 남김.

### 13-11. 편차
- 대전 사진 2장 1280px 유지 (daejeon-04 1280x622, daejeon-05 1280x700, Wikimedia 썸 서버 속도 제한으로 큰 버전 못 받음, 업스케일 금지 원칙 따라 1280px 그대로, 250KB 이하).
- 스티커 숏코드 방식 채택 (13-5 참조, hugo.yaml unsafe 미변경).
- Contact 플레이스홀더: about.md·privacy.md 2곳이 mailto:contact@placeholder.invalid + `<!-- TODO: replace with confirmed contact email (parent pending) -->`. 실제 주소 확정 전이라 1차 납품분에 그대로 들어감. 주인님 확인 후 교체 필요 (후보 contact@hoho-labs.com - 테스트 메일 안 튀면, 아니면 hello@hoho-labs.com. contact@hoholabs.com은 주인님 도메인이 아니라 사용 금지).
- PUSH-RUNBOOK force-push 필요 + 사업자번호 불일치 미결 (13-8 참조).
- Leaflet zip 블로커 (13-2 참조).
- 로컬 git 상태: work/는 git 저장소 (revamp/blog-1119 브랜치)이나, main 3757ea4 베이스 확인 전이라 브랜치·커밋은 하지 않고 zip 납품. (작업 지시 전제와 달리 work/에 .git이 있음 - 브랜치 revamp/blog-1119, HEAD 3d05280, BLOG-STYLE-GUIDE.md 1건 미스테이징 수정. 1차 납품은 zip 방식이라 브랜치 생성·커밋·푸시를 하지 않았고, fix/map-daejeon-1119 분기는 만들지 않음. 베이스 확인은 부모가 결정함.) main 직접 푸시·배포 금지 유지.
- 게이트 기대값 노후 2건 (13-9 참조: 20편 기대, 홈 지도 카운트 문자열).
- 제휴링크 언어별 기준 (똘마니 정정 2026-11-19 11:08, 아래 13-14 참조): 외국어 2-4개 기준에 구 글 7편이 미달 (13-14 참조).

### 13-12. 1차 zip
- ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-map-daejeon-1st.zip (38,847,156 바이트, 330개 파일) - work/ 내용물을 사이트 루트로 (public/, resources/, .git, .hugo_build.lock, work-backup-phase1/, NOTES_*.md, counter-captures/ 제외) + 이 BUILD_LOG.md. 다국어 파일 (hugo.yaml languages, i18n/en.toml + kr.toml, content/*.kr.md) 포함. 스크린샷은 zip에 넣지 않고 captures-map-daejeon-1st/ 폴더로 별도 전달. Ttolmani 검수용: 압축 해제 후 plain `hugo --minify`로 빌드 (timeZone Asia/Seoul 적용으로 --buildFuture 불필요), 스크린샷 육안. zip 생성 후 풀어서 plain hugo --minify 재빌드 검증까지 완료 (아래 13-13).
- 드라이브 업로드 안 함 (부모가 함). main 직접 푸시·배포 금지.

### 13-13. zip 재빌드 검증
- /tmp/zipcheck에 zip을 풀어 plain `hugo --minify` 실행: 0 에러, EN 46 pages + KR 15 pages, static files 209. 빌드 산출물에서 확인: tour-summary safeJS 수정 반영 (getElementById("tour-map-daejeon-...") 정상), 헤더 z-index:70 반영, /kr/index.html + /kr/korea/daejeon/index.html 존재, /kr 전체 제휴 게이트 0건 재확인. zip 내 제외 항목 (public/, .git, NOTES_*.md, counter-captures/) 0건 확인 (.gitignore·.github/workflows/deploy.yml은 포함돼도 되는 파일이라 유지).
- 최종 zip은 이 13-12·13-13 기록을 채운 뒤 다시 생성했고, 같은 내용으로 풀어서 plain hugo --minify 재빌드까지 다시 확인함 (EN 46 + KR 15, 0 에러).

### 13-14. 파비콘·다국어·제휴 (똘마니 추가 지시 2026-11-19 11:03)
- 18) 파비콘 교체 예약 (로고 확정 대기): 현 파비콘은 우리 favicon.svg 자체임 (static/favicon.svg, 808B, 2026-11-19 05:01 생성, 베이지 #F3EBDD 둥근 사각형 + 짙은 남색 #111A26 조리개 날개 심볼). baseof.html:24 `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`로 연결돼 있음. 16px 탭 크기에서 조리개 날개가 A자처럼 보임. Hugo 기본값도 브라우저 기본 아이콘도 아님. apple-touch-icon·manifest·favicon.ico/png 변형은 없음. 로고가 아직 확정 전이니 지금은 교체하지 않고 "교체 예약 (로고 확정 대기)"으로 기록함. 로고 확정 즉시 넣을 수 있게 준비: 필요 파일 favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png (180x180), android-chrome-192x192.png, android-chrome-512x512.png, site.webmanifest. 삽입 위치 baseof.html의 link 태그 자리 (현 favicon.svg 줄을 교체·추가). 캐시버스팅은 버전 쿼리 (?v=YYYYMMDD) 또는 파일명 해시 중 택일 (쿼리 방식이 간단하고 Cloudflare Pages에서도 동작).
- 19) 다국어 구조 + 언어 토글 (1차 최소분 완료 - 검증 중 도착): 다국어 담당이 2026-11-19 11:08-11:09경 완료함 (검증 중 도착, 패키징 시점에 포함). 구조: hugo.yaml languages en (weight 1, 기본, prefix 없음) + kr (weight 2, /kr/), i18n/en.toml + i18n/kr.toml, content/_index.kr.md + content/blog/_index.kr.md + content/regions/*/_index.kr.md 9개. KR 글 번역은 아직 없음 (대표글 번역 11-20 12:00까지, JP·SP·CN 11-21까지 단계 확장, 기계번역 금지). 상세는 아래 13-15절 참조. 다국어 파일이 zip에 포함됨 (NOTES_I18N.md는 작업 노트라 zip에서 제외).
- 20) 제휴링크 현지화 (승인 확인 대기): 제휴 담당이 별도 초안 작성 중. Travelpayouts 대시보드 Programs 승인 상태는 로그인이 필요해서 확인 불가 상태라 "확인 불가/대기"로 기록함. 미승인·미확인 프로그램 링크는 사이트에 넣지 않음. Klook은 기존 사용 중 (대전 글 Klook 2개 포함).
- 20-2) 제휴링크 언어별 기준 (똘마니 정정 2026-11-19 11:08): /kr 버전은 외부 제휴·추적 링크 0건 (동호 님 내용·분위기 점검용이라 제휴링크를 달지 않음. 클릭 유도 배너·Book this 버튼도 없고, 사이트 내부 코스·지역 링크만 연결. 제휴 고지문도 /kr에는 넣지 않아도 됨). 외국어 버전 (/en, /jp, /sp, /cn)은 글당 2-4개 유지 (해외 방문객 대상, Travelpayouts 연동 제휴링크 연결. 언어권별로 주로 쓰는 플랫폼만 다르게. 공통 원칙: 실제 승인된 프로그램만, 원화 정산 가능한 것만, 미승인은 대기로 두고 링크 넣지 않기. 승인 상태 표 보고 필수).
- 20-3) 게이트 실측 (현 빌드, /en 단일언어 기준, emrld 로더 제외하고 글 본문 제휴 URL만 unique 카운트): 1차 대상 6편 전부 2-4개 범위 안 (제주 2, 서울 3, 속초 2, 수원 2, 전주 3, 대전 3). 전체 21편 중 범위 안 14편, 범위 미달 7편 (busan-pork-soup-milmyeon 1, gyeongju-night-donggung-wolji 0, jeonju-night-market-cafes 1, seoul-cafes-seongsu-yeonnam-ikseon 1, seoul-market-food-walk 1, seoul-night-han-river-cruise-ramyeon 1, seoul-subway-tmoney-taxi 1), 범위 초과 0편. 미달 7편은 규칙 제정 전 구 글이라 1차 납품분에는 손대지 않고 다음 차수 후보로 남김.
- 20-4) /kr 게이트: 다국어 도착 후 실행 완료 (13-15 참조). /kr 페이지 전체 grep (aff 숏코드 출력·emrld 스크립트·Travelpayouts 관련 URL·Klook·Agoda·Viator·GetYourGuide·Trip.com·KKday·MyRealTrip·booking.com·expedia·affiliate·beacon·googletagmanager·google-analytics) 0건. emrld 로더는 baseof.html에서 `{{ if ne site.Language.Lang "kr" }}` 조건으로 /kr 렌더에서 제외됨 (다국어 담당이 구현). /kr에 제휴링크가 없어서 KR 번역 작업은 링크 현지화가 필요 없음.

### 13-15. 다국어 1차 최소분 (구조 + 토글, 2026-11-19 검증 중 도착)

작업 노트: work/NOTES_I18N.md (다국어 담당). KR 대표글 번역 (11-20 12:00)·JP/SP/CN (11-21)은 이번 범위 밖임을 명기함.

- 구조: hugo.yaml languages en (weight 1, 기본, prefix 없음) + kr (weight 2, /kr/). defaultContentLanguage: en 유지. jp/sp/cn은 아직 추가 안 함. 방식은 번역 파일 (.kr.md를 EN 콘텐츠 옆에 두는 방식). EN 콘텐츠 파일 이동·편집 없음, EN URL은 prefix 없이 유지.
- 파일: i18n/en.toml + i18n/kr.toml (헤더·홈·지도·카드·푸터 UI 문자열. KR 규칙: 짧고 확실한 문장만 번역하고 가이드 제목·설명·테마명·가격·시간·고유명사는 영어 유지), content/_index.kr.md (KO 홈), content/blog/_index.kr.md (KO 블로그 목록, 한국어 인트로 + EN 가이드 목록), content/regions/*/_index.kr.md 9개 (KR 허브, 영어 가이드라는 한국어 안내 + EN 허브 링크).
- URL: EN 홈 /, KO 홈 /kr/, KO 블로그 /kr/blog/, KR 허브 예시 /kr/korea/busan/. KR 번역 없는 페이지는 같은 글 대신 그 언어 홈으로 연결 (죽은 링크 없음).
- 토글: layouts/partials/lang-toggle.html 신규 (헤더 우측 상단). 버튼에 현재 언어 표시, 드롭다운에 다른 언어 목록. 번역이 있으면 같은 글, 없으면 그 언어 홈. Plain 링크 (JS 없이도 동작), JS는 드롭다운 열고 닫기만, Escape 닫기 + 버튼 포커스 복귀, 키보드 접근 가능, 버튼 최소 높이 44px, focus-visible 링.
- baseof.html: html lang을 LanguageCode에서, hreflang alternate (번역 있는 언어마다 + x-default는 EN), emrld.ltd 스크립트는 KR에서 미렌더 (`{{ if ne site.Language.Lang "kr" }}`).
- header.html: nav를 i18n + relLangURL로 (Home, Guides, Regions). Food/About/Privacy는 KR 버전이 없어 EN으로 연결. 지역 바 허브 링크도 언어별 (/korea/<slug>/ vs /kr/korea/<slug>/). KR에서는 regions.yaml의 name_ko가 주 라벨.
- footer.html: i18n 태그라인·링크, 제휴 고지문은 KR에서 숨김. index.html: i18n 히어로·브라우즈·최신·신뢰 영역, 지역 칩은 regions.yaml 처음 8개 (대전 칩은 EN에서도 빠져 있었고 그대로), 테마 칩은 EN 사이트 기준 (KR 테마 페이지 아직 없음), KR은 EN 블로그 페이지 목록. home-map.html: KR은 가이드 수가 없어 EN 사이트 수로 지도 카운트 (KR 지도 활성 9개 지역 유지), 허브 링크 relLangURL, Natural Earth 크레딧은 KR에서 텍스트만 (링크 해제, 데이터는 퍼블릭 도메인). guide-card.html "Read the guide" i18n, list.html·term-page.html i18n·relLangURL. Leaflet 파일·tour-summary partial 미접촉.
- /kr 제휴 0건: 고지문 숨김 (index.html trust 영역 + footer.html), kr.toml에 affiliateDisclosure 키 없음, aff 숏코드는 KR 페이지에 사용 안 함 (제휴링크는 EN 글 본문에만 있고 KR 번역이 아직 없음), Natural Earth 크레딧 링크 해제, emrld 미렌더. 게이트 grep (public/kr/ 전체, travelpayouts|klook|kkday|viator|getyourguide|trip.com|aviasales|agoda|booking.com|expedia|affiliate|emrld|beacon|googletagmanager|google-analytics): 0건 (검증 담당이 재확인함). /kr 페이지에 남은 외부 URL은 Google Fonts뿐 (폰트 로딩, EN과 동일하게 보이게 하려는 것, 제휴·추적이 아님).
- emrld.ltd 스크립트: EN 전용 유지가 맞음 (Travelpayouts 제휴 추적 스크립트, 원 오더에서 절대 삭제·수정 금지). KR에서 제외한 것은 /kr 제휴 0개 규칙 때문이라 정상. 전체 제거하지 말 것. (다국어 담당의 NOTES_I18N 미결 1번 "목적 불명"은 이 지시로 해결됨.)
- 사이트맵 인덱스 전환: /sitemap.xml이 이제 /en/sitemap.xml + /kr/sitemap.xml을 가리키는 인덱스 (Hugo 다국어 기본 동작). /en/index.html도 있음 (메타 리프레시로 /로 이동, EN 46페이지 중 +1의 정체).
- 검증 (검증 담당, Playwright + grep): EN 홈 그대로 (히어로 있음, 카드 21개, 고지문 있음, emrld 있음, 토글 있음). KO 홈 (/kr/) 카드 21개, 지도 활성 지역 9개, lang=ko-KR, emrld 없음, 고지문 없음, 제휴링크 0개. KO 블로그 목록 (/kr/blog/) 카드 21개. KR 허브 (/kr/korea/daejeon/) 가로 넘침 0. 토글 동작: 데스크톱 1440에서 클릭하면 메뉴 열리고 한국어 링크 클릭 시 /kr/로 이동 (한국어 제목 확인). 모바일 390에서도 토글 열리고 한국어 링크 클릭 시 /kr/로 이동 (버튼 44px 높이, 메뉴가 지역 바 위에 뜸). JS 페이지 에러 0건 (데스크톱·모바일).
- 검증 중 수정 1건 (토글 드롭다운 가림): 언어 토글 메뉴가 열려도 지역 바가 위에 그려져 한국어 링크를 마우스로 클릭할 수 없었음 (Playwright 클릭 30초 타임아웃, region-nav가 포인터 이벤트 가로챔). 원인: 헤더 z-index 50의 스태킹 컨텍스트 안에 있는 메뉴 (z-index 70)는 지역 바 z-index 60을 넘을 수 없음. 수정: static/css/style.css에서 header.site z-index 50에서 70으로 상향 (지역 바 60보다 위). 두 스트립은 겹치지 않아 (바 top = 헤더 높이) 다른 영향 없음. 수정 후 데스크톱·모바일 390 둘 다 메뉴 링크 클릭으로 /kr/ 이동 확인. 스크린샷 53~58 참조.
- 알려진 사항: /kr/themes/는 비어 있음 ("0 guides filed under Themes", KR nav에서 링크 안 함, 테마 i18n은 단계 확장). KR 허브는 "Guides coming soon" 영어 박스가 한국어 안내 아래에 보임 (KR 글 아직 없음, 구조만 있는 단계라 정상, KR 글 생기면 사라짐). KO 홈 카드가 EN 글로 연결되고 그 EN 글에는 Klook/Agoda 제휴링크가 있음 (/kr 페이지 자체는 0건, 클릭해서 나가면 /kr을 벗어남. 정정 지시와 일치하나 의도가 달랐으면 코디네이터가 판단할 것). 대전 칩이 EN 홈 지역 칩 (처음 8개)에 없음 (기존 동작 그대로, 1차에서 손대지 않음).
- 스크린샷 추가: captures-map-daejeon-1st/ 50-kr-home-1440, 51-kr-home-390, 52-kr-hub-daejeon-1440, 53-lang-toggle-1440, 54-lang-menu-closeup (수정 전 가림 상태 기록), 55-toggle-landed-kr-1440, 56-toggle-390-closed, 57-toggle-390-open, 58-toggle-390-landed-kr. 검사 기록 checks-i18n.json, checks-toggle.json.

## 14. 2차 최종 검증·패키징 (2026-11-19, 2차 마감 20:00)

검증 담당 실측. 작업 폴더 ~/workspace/hoho-tour-revamp/work/ (Hugo 사이트 루트). content/blog/ 본문은 검증만 하고 수정하지 않음 (내용 오류는 고치지 않고 미결로 기록). 드라이브 업로드 안 함 (부모가 함). main 직접 푸시·배포 금지.

### 14-1. 2차 작업 내역 (검증 대상)

- 리라이트 15편 (A조 5편: 부산 2일·부산 국밥·경주 1일·경주 야경·인천 / B조 5편: 제주 3일·제주 동부·전주 야시장·강릉 1박·서울 겨울 / C조 5편: 서울 카페·서울 시장·서울 야경·서울 노포·서울 지하철). 공통 패턴: 2인칭 블로거 톤, 짧은 문단, 소제목당 이모지 1개, 팁 박스 `> **🔥 Local tip:**` 통일, 기존 가격·시간·노선 수치 유지, 신규 팁에만 "Based on recent listings/reviews, checked November 2026" 표기, 금지어 0건, front matter·제휴링크 변경 없음 (C조 보고: git diff HEAD상 시장·노포·지하철 3편의 aff URL·stops 변경처럼 보이는 부분은 작업 시작 전 디스크에 이미 있던 타 팀 작업분. 아래 14-8 대조 참조).
- 신규 사진 14장 (전부 Wikimedia 실사진, 긴 변 1600px, 250KB 이하, photo-dims.yaml 184건·CREDITS.md 병합 완료): busan-07 (181,450B) / busan-08 (193,096B) / gyeongju-06 (240,988B, 실측 1600x997) / gyeongju-night-06 (239,244B) / incheon-01 (123,758B) / jeju-07 (169,126B) / jeonju-night-06 (232,752B, q20) / gangneung-07 (223,506B) / seoul-40 (230,628B) / seoul-cafe-07 (37,742B) / seoul-41 (126,836B) / seoul-42 (86,368B) / seoul-43 (243,260B) / seoul-44 (79,070B). jeju-east-07은 미추가 (라이선스 확인된 우도 전용 실사진을 찾지 못함, B조 노트 4절). 각 사진은 본문 HTML에서 정확히 1회씩 참조됨.
- 스티커 삽입: 전 21편에 숏코드 총 85곳 (lets-go 21 / yum 20 / tired-rest 20 / photo-spot 14 / pro-tip 10 / must-visit 0). 2차 추가분 62곳 (A조 21 + B조 20 + C조 21), 1차 23곳 유지. collage 숏코드 총 17곳 (16편).
- Leaflet 1.9.4 벤더링: 정본 zip ~/workspace/hoho-tour-revamp/leaflet-1.9.4-dist.zip (53,500B, MD5 7496828402bcc7b3c6b7bcb54e4f04d7, 13-2절 정본값과 일치 확인). static/vendor/leaflet/ 7파일 (leaflet.js 147,552B / leaflet.css 14,806B / images/marker-icon.png 1,466B / marker-icon-2x.png 2,464B / marker-shadow.png 618B / layers.png 696B / layers-2x.png 1,259B). tour-summary.html이 로컬 경로로 참조. layouts/·assets/·static/ 전수 grep에서 unpkg·jsdelivr Leaflet 참조 0건.
- 긴급 수정 A-F (NOTES_FIX2AF.md): A - 모바일 헤더 2줄 압축 (브랜드+토글 1행, nav 2행) + ResizeObserver로 --header-h 실측 동기화, CSS 폴백 90px에서 83px로 교체. B - 지역바 링크 white-space:nowrap + flex:0 0 auto, 모바일에서 .region-nav__ko 숨김. C - 모바일 헤더 nav gap 0, 링크 13px·패딩 6px 8px로 축소. D - tour-summary.html에서 map_note 캡션 중복 출력 삭제, .tour-summary__note 단락만 유지. E - home-map.html $labelOff에 daejeon (dx -12, dy -24, anchor end) 추가. F - .sticker img 규칙 추가 (원본 크기 유지, 확대 금지). G 참고: 헤더 배경 불투명 #FFFFFF 교체, 데스크톱 지역바 1px 겹침은 A의 실측 동기화로 해소.
- 지도 UI 3건 (NOTES_MAPUI_STICKER.md): (1) 원형 번호 배지 (코랄 원형 28px + 흰 굵은 숫자) + 스탑 이름 라벨 (흰 알약 배경, 12.5px 굵은 글씨) 상시 표시, 충돌 회피 JS layoutLabels() (겹치면 반대쪽으로 뒤집고, 그래도 겹치면 아래 +26px·위 -26px 순 이동, moveend에도 재실행). 라벨 언어는 pageLang으로 분기 (kr이면 name_ko, 그 외는 영문 name). (2) 외국어 페이지 타일 Esri World Street Map (아래 14-2 편차 참조), /kr 페이지만 OSM 한국어 타일 유지. (3) 랜드마크 보조 마커 12개 (대표 5편 + 대전, 편당 2개): 회색 원형 이모지 디스크 26px, 클릭·호버 시 이름 툴팁 (bindTooltip, direction top), fitBounds에 포함해 첫 화면에 같이 표시. 좌표 전부 Nominatim 검증 (2026-11-19). 목록: 제주 (Jeju International Airport 공항 33.5070711, 126.4916441 / Hallasan 산 33.3922451, 126.4942816), 서울 (Seoul Station 37.5554175, 126.9725862 / Yongsan Station 37.5290713, 126.9659184), 속초 (Naksansa Temple 38.1245060, 128.6291359 / Sokcho Tourist & Fishery Market 38.20477, 128.5897997), 수원 (Suwon World Cup Stadium 37.2864084, 127.0368050 / Suwon City Hall 37.2616466, 127.0318618), 전주 (Jeonju Express Bus Terminal 35.8345401, 127.1292683 / Jeonju National Museum 35.8010280, 127.0897040), 대전 (Daejeon Complex Terminal 36.3503912, 127.4366882 / Hanbit Tower 36.3766341, 127.3880552).
- 스티커 전면 교체: 정본 캐릭터시트 ~/workspace/goals/goal-8/files/세모_캐릭터시트/semo_character_sheet.png (1680x1440, MD5 cb979cbf6765ef656ddbbb9b57a88835). 흰 고양이·가는 진한 갈색 선화(#2E1A13)·샤프한 삼각형 얼굴·연분홍 볼터치·민트 배낭·목에 작은 카메라·반짝이. 1차 턱시도 고양이 시트 폐기, 12파일 전부 같은 파일명으로 교체 (구 파일 잔재 없음). 6종 전부 320x320, 흰 배경, 이미지 내 글자 없음 (must-visit의 "?" 기호만 있음), 4프레임 300ms 무한 반복, 파일당 200KB 이하 (최대 57,986B). 크기 실측: CSS .sticker img 96px (max 110px). 숏코드 alt 전면 교체 (턱시도·"says ..." 표현 삭제, 흰 고양이·민트 배낭 문구로 교체). CREDITS.md 스티커 섹션 갱신 (정본 시트 경로·MD5, 턱시도 세트 폐기 명기, 6종 목록·출처·실측 크기 표 교체). 신규 3종 (yum·tired-rest·photo-spot) 원본은 static/images/stickers/src-new/ (PNG 3장 + 생성 메타 JSON). 빌드 스크립트 build_stickers_v2.py 신규.
- 콜라주 1건: 서울 겨울 글의 궁궐 사진 2장 (seoul-40 향원정 설경 + seoul-22 창덕궁 인정전)을 2컷 콜라주 (collage-n2)로 묶음. 캡션·크레딧 전부 유지 (두 번째 캡션의 "After snow, the palace roofs are the best sight in the city." 문장도 credit 필드에 보존). 나머지 인접 figure 연속 나열 3건 (인천·서울 3일·서울 지하철)은 같은 장소가 아니라 묶지 않음. 떨어져 있는 같은 장소 사진 묶기는 2차 이후로 연기.
- 테크트리: 지역 허브 상단 테마 칩 → /themes/<테마>/ 페이지 → 글 카드 → 글 안 관련 맛집 코스 링크. 아래 14-7 실측 참조.
- 카운터: functions/api/visit.js (Cloudflare Pages Function, /api/visit, POST 1회 카운트·GET 읽기 전용, { total, today } 반환, cache-control: no-store, KV 미바인딩 시 503 { error: "counter_unavailable" }로 푸터 숨김), KV 바인딩명 VISIT_COUNTER, 네임스페이스 제안명 hoho-tour-visits, wrangler.toml.example만 있음 (실제 wrangler.toml 없음, 플레이스홀더 ID 커밋 금지). 배포 절차는 NOTES_COUNTER.md 3절 (Ttolmani 담당, 대시보드 경로 우선). 배포는 하지 않음.

### 14-2. 편차 (CARTO Voyager에서 Esri World Street Map으로 교체)

- 지시는 CARTO Voyager였으나 구현 담당이 2026-11-19 curl로 확인한 결과 CARTO가 키 필요 타일이라 버리고 Esri로 교체함. 실측: https://a.basemaps.cartocdn.com/rastertiles/voyager/12/3497/1603.png (대전 z12 타일)가 HTTP 200을 반환하지만 내용은 2,049B짜리 "API KEY REQUIRED carto.com/basemaps/apikey" 플레이스홀더 PNG임. b 서브도메인도 MD5 동일 (502fc5f6793fad87dcf8ba3fa646c38f)이라 서브도메인 우회가 안 됨. 키가 필요한 타일은 쓰지 말라는 지시와 CARTO의 현 정책을 함께 지키기 위해 CARTO는 쓰지 않음.
- 대체 타일: Esri World Street Map (무료, 키 불필요, 영문 지명). 대전 z12 타일 (server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/12/1603/3497) curl 200 + JPEG 44,620B, 직접 열어 확인: "Daejeon", "Daejeon Station", "Seodaejeon Station", "Daejeon City Hall", "Hannam University" 등 영문 지명이 크게 뜨고, 한글 지명은 작게 병기됨. 대조용 OSM 타일 (같은 좌표, UA 포함 curl 200 + PNG 42,076B)은 "대전광역시"만 떠서 외국어 독자가 못 읽음을 확인함. (UA 없이 curl하면 OSM이 403 "Access blocked" 플레이스홀더를 반환함. 브라우저 Leaflet은 브라우저 UA를 보내므로 사이트 동작에는 영향 없음.)
- Attribution 문구 (Esri 서비스 메타데이터의 copyrightText에서 가져옴): "© Esri, HERE, Garmin, © OpenStreetMap contributors, and the GIS User Community". 타일 URL은 Leaflet {z}/{y}/{x} 순서 (.../MapServer/tile/{z}/{y}/{x})로 연결함.
- 분기: /kr 페이지만 기존 OSM 한국어 타일 유지, 그 외 모든 언어 (EN + 차후 jp/sp/cn)는 Esri 타일. Hugo 템플릿 분기 ({{ if $isKr }})로 렌더 시점에 갈림. 캡션도 타일에 맞춰 갈림 (KR: OSM 문구 / 그 외: Esri 문구).
- 라이브 렌더 한계 (아래 14-5 참조): 이 검증 환경의 샌드박스 Chromium은 터널 프록시 문제로 arcgisonline.com·tile.openstreetmap.org·fonts.googleapis.com·emrld.ltd 전부 net::ERR_TUNNEL_CONNECTION_FAILED를 내서, 브라우저 안에서는 Esri·OSM 타일 픽셀을 둘 다 볼 수 없었음. 타일 내용 자체는 셸 curl로 직접 받아 확인함 (Esri JPEG 44,620B 영문 지명 육안 확인, OSM PNG 42,076B). 실제 브라우저에서의 타일 픽셀 렌더는 똘마니·주인님 쪽 실브라우저 재확인이 필요함 (미결).

### 14-3. 빌드 + 기존 게이트 결과 원문

- 빌드: `~/workspace/infra-gate/tools/hugo-bin/hugo --minify` (work/에서 실행), 0 에러. EN 46 pages + KR 15 pages, Paginator 0, Non-page files 0, Static files 238, Aliases 1 (/en/ 리다이렉트), Cleaned 0. (1차와 동일 페이지 수. public/blog 디렉터리 21편.)
- 기존 게이트 ~/workspace/hoho-tour-revamp/gate_phase2.py 실행 결과 원문 (검증 중 stale public 정리 후 재실행, 아래 참조):
```
FAIL  20 posts in public/blog  found 21
PASS  internal link 404 = 0  0 missing: []
PASS  image 404 = 0  0 missing: []
PASS  all img width/height  0 missing
FAIL  placeholders 0  ['about.md:TODO', 'privacy.md:TODO']
PASS  long dash 0  []
FAIL  disclosure 5 places consistent  plain/no-commission in ['lang-toggle.html']
PASS  Travelpayouts script in built index
PASS  Jeonju province active on home map  prov prov--active
PASS  Gyeonggi province active on home map  prov prov--active
FAIL  home map counts Jeonju 2 / Suwon 1
PASS  tour-summary on all 6 new posts
PASS  hubs jeonju/suwon no coming-soon
PASS  no raw shortcodes in built posts  []
GATES: FAILED: ['20 posts in public/blog', 'placeholders 0', 'disclosure 5 places consistent', 'home map counts Jeonju 2 / Suwon 1']
```
- FAIL 4건은 1차와 동일한 사유로 게이트 기대값 노후·알려진 미결·오탐이지 회귀가 아님: (1) "20 posts" 기대 vs 실제 21편 (대전 추가가 정당한 증가). (2) placeholders TODO 2건 (about.md·privacy.md Contact TODO, 13-10 미결 그대로). (3) "home map counts Jeonju 2 / Suwon 1" 문자열 불일치 (실제 렌더는 홈 지도 라벨 "Jeonju 2" + "Suwon 1"로 카운트 정상 표시, 아래 14-6 E항 실측 참조. 게이트 문자열이 구 라벨 형식). (4) "disclosure 5 places consistent" - 고지문 자체는 5곳 일관 (실패 원인은 신규 lang-toggle.html 5행 Hugo 주석 속 "Plain links, so it works without JS" 문구를 게이트의 단순 부분문자열 검사가 건드린 오탐. 주석은 Hugo가 렌더에서 제거하고 public/ 전수 grep에서 "plain link / no commission" 0건 확인).
- 검증 중 stale public 정리 1건 (소스 수정 아님, 빌드 산출물 정리): 첫 게이트 실행에서 "all img width/height 2 missing"이 나왔고, 원인은 work/public/에 남은 stale 파일 4개였음. public/kr/blog/daejeon-bread-pilgrimage-seongsimdang-dcc/index.html + public/kr/themes/day-trips/index.html + public/kr/themes/food-restaurants/index.html (2026-11-19 03:20, MAPUI 담당의 임시 /kr 번역 파일 테스트 빌드 잔재. 임시 파일은 삭제됐으나 public/이 --cleanDestinationDir 없이 빌드돼 파일이 남음) + public/regions/daejeon/index.html (2026-11-19 01:54, 구 빌드 잔재. 현 빌드는 허브를 /korea/daejeon/으로만 렌더). 근거: /tmp/freshbuild-2nd에 새로 빌드한 결과와 work/public/ 파일 목록을 diff해 이 4개만 차이로 확인. stale 4개를 삭제하고 재빌드한 뒤 게이트를 다시 돌리니 img width/height PASS로 복구되고 FAIL은 위 4건 (1차와 동일)으로 돌아옴. zip은 public/을 제외하므로 zip 내용에는 영향 없음. 재발 방지: public/을 직접 빌드할 때는 --cleanDestinationDir을 쓰거나, 검증 전 fresh 빌드와 diff로 stale을 확인하는 것이 안전함.

### 14-4. 이미지 404 검사 (1차 맹점 대응, minify 무따옴표 src 직접 대조)

- 방법: public/의 모든 HTML에서 img src (따옴표 있음·없음 둘 다) + srcset을 정규식으로 뽑아 파일 실존과 직접 대조 (게이트의 검사와 별도로 검증 담당이 직접 작성한 스크립트). 결과: 고유 img src 179건 전수, missing 0건. 전체 img 태그 673개.
- 신규 사진 14장 전부 public/images/photos/에 존재하고 본문에 참조됨 (각각 HTML 1곳씩 참조): busan-07 / busan-08 / gyeongju-06 / gyeongju-night-06 / incheon-01 / jeju-07 / jeonju-night-06 / gangneung-07 / seoul-40 / seoul-cafe-07 / seoul-41 / seoul-42 / seoul-43 / seoul-44.
- 대전 맵 public/images/maps/daejeon-bread-pilgrimage-seongsimdang-dcc-map.webp 존재. 스티커 12파일 전부 존재 (webp 12,838-14,412B / png 53,273-57,986B).
- 참고: gyeongju-06 실측 크기는 1600x997 (photo-dims.yaml 값과 일치. B조 노트의 1600x998 표기는 1px 오기. 파일 자체는 정상이고 게이트 width/height PASS).

### 14-5. Leaflet 라이브 렌더 (Playwright, 로컬 서버로 public/ 서빙, 실제 Chromium)

- 환경: python http.server로 work/public/을 127.0.0.1:8931에 서빙, Playwright Chromium (데스크톱 1440x900 + 모바일 390x844). 스크립트 /tmp/pw2.py + /tmp/pw2b.py (검증용 임시 스크립트, zip 미포함). 검사 기록 captures-map-daejeon-2nd/checks.json + checks2.json + checks3.json + checks4.json.
- 타일 (환경 한계, 사이트 결함 아님): 샌드박스 Chromium은 외부 타일 호스트에 닿지 못함. 대전 글 기준 타일 img 9개 전부 data: 회색 errorTileUrl 플레이스홀더 (tile_census: data:errorTile 9, arcgisonline 실타일 0). 실패 요청: arcgisonline.com 타일 9건 전부 net::ERR_TUNNEL_CONNECTION_FAILED (같은 실패가 Google Fonts·emrld.ltd에도 동일하게 발생. 1차와 같은 샌드박스 터널 문제). Leaflet js/css 404는 0건 (vendor 로컬 파일이라 정상 로드). errorTileUrl 회색 폴백이 동작해 지도는 빈 백판이 아니라 회색 바탕 + 마커·라벨·팝업 상태로 뜸. 타일 내용 자체는 셸 curl로 확인함 (14-2 참조: Esri JPEG 44,620B 영문 지명 육안 확인, OSM PNG 42,076B). 실브라우저 타일 픽셀 렌더는 미결 (똘마니·주인님 쪽 재확인 필요).
- 대표 글 4편 (제주 서쪽·대전·수원·전주 1일) 데스크톱 실측: 배지 5/5/5/7개 전부 표시, 라벨 전부 표시 (영문), 랜드마크 2개씩 전부 표시, attribution "© Esri, HERE, Garmin, © OpenStreetMap contributors, and the GIS User Community" 렌더 확인, 팝업·툴팁은 아래 참조. 서울·속초 추가 확인: 타일 로드 8/8, 배지 9/8개, 랜드마크 2개씩, Esri attribution 동일.
- 마커 클릭-팝업: 대전 (배지 1 클릭 → "Seongsimdang Daejeon Station Branch / Inside Daejeon Station, 2nd floor" 팝업 표시), 제주 서쪽 (Hallim Park 팝업 표시), 수원 (Suwon Station 팝업 표시), 전주 1일 (Yongsan Station, Seoul 팝업 표시) 전부 표시 확인. 모바일 390 대전도 탭 후 동일 팝업 표시 확인.
- 랜드마크 툴팁: 제주 (Jeju International Airport 툴팁 표시), 수원 (Suwon World Cup Stadium 표시), 전주 (Jeonju National Museum 표시), 대전 (Daejeon Complex Terminal 호버·클릭 둘 다 표시). 단, 대전 Hanbit Tower는 결함 (아래 14-9 참조: 스탑 배지 5번 DCC가 포인터 이벤트를 가로막아 호버·클릭 불가). 랜드마크 첫 화면 포함: 측정 4편 전부 2/2개가 첫 화면 지도 안에 보임. 스타일은 번호 배지 (코랄 원형 28px)와 구분됨 (흰 배경 회색 테두리 원형 26px + 이모지 심벌).
- /kr 타일 분기 라이브 확인 (임시 사본 방식): work/을 /tmp/krtile에 복사하고 임시 대전 .kr.md (스탑 2개 + 랜드마크 2개, name_ko 포함)만 추가해 빌드·서빙·Playwright 확인 후 /tmp/krtile 삭제. work/ 콘텐츠는 건드리지 않음. 결과: /kr 글 HTML에 tile.openstreetmap.org 1건·arcgisonline 0건, OSM 캡션 ("Interactive map: OpenStreetMap tiles, © OpenStreetMap contributors..."), 한글 라벨 "성심당 대전역점 / 성심당 본점" 렌더, attribution "© OpenStreetMap contributors", lang ko-KR, 한글 UI (홈·가이드·지역·맛집·소개·개인정보처리방침·한국어 토글). 타일 픽셀은 샌드박스에서 OSM도 동일하게 터널 차단돼 (9/9 실패) 회색 폴백으로 보임. 분기 배선 자체는 라이브로 확인됨. 스크린샷 60-kr-tile-test-temp-1440.png (임시 파일이라 사이트에 남지 않음).
- JS 페이지 에러 0건 (pageerror 없음). 콘솔 리소스 에러만 있음 (샌드박스 Google Fonts 터널 실패, emrld.ltd 터널 실패, 로컬 정적 서버의 /api/visit 501. 전부 게이트 대상 아님).

### 14-6. 긴급 수정 A-F 실측 (Playwright, 모바일 390 + 데스크톱 1440)

- A (모바일 390 헤더가 지역바를 가림): 스크롤 500px 상태에서 헤더 실측 높이 92px (FIX 노트 추정 83px과 다름. ResizeObserver가 실측 92px로 --header-h를 동기화함), 지역바 top 92px로 헤더 바로 아래에 붙어 있음, 첫 줄 첫 칩 "Seoul서울" 보임 (top 99px, 높이 36px), 칩 중심점의 elementFromPoint가 칩 링크 자체 (가림 없음). 데스크톱 1440도 동일: 헤더 65px, 지역바 top 65px, 첫 칩 top 72px 보임. 앵커 이동 가림: 대전 글에서 #-stop-1-... 앵커로 이동 시 제목 top 182px, 헤더 하단 92px, 지역바 하단 142px로 제목이 가려지지 않음. scroll-margin-top 실측 144px (모바일). PASS.
- B (모바일 390 지역바 한 줄 가로 스크롤): 최초 프로브에서 nav.region-nav (overflow visible, scrollWidth 390)를 잘못 재서 스크롤이 안 되는 것처럼 보였으나, 실제 스크롤러는 안쪽 .region-nav__row div (display:flex, overflow-x:auto, flex-wrap:nowrap, scrollWidth 768, clientWidth 390)임. scrollLeft=200 설정 시 200으로 이동, 최대 스크롤 378에서 대전 링크 (x 293) 완전 표시 확인. 스와이프 대신 JS 스크롤로 확인한 스크린샷 45-regionbar-scrolled-390.png. 링크 9개 전부 rects 1개 (줄바꿈·쪼개짐 없음), 높이 36px 균일, "제주" (Jeju제주, 너비 50px) 쪼개짐 없음. PASS. (참고: 첫 프로브의 탭이 실수로 경주 링크를 눌러 경주 허브로 이동하는 바람에 생긴 45-regionbar-swiped-390.png는 오해 소지가 있어 삭제함. 링크 클릭 자체는 동작 확인으로 기록.)
- C (모바일 390 헤더 nav 가로 넘침): EN scrollWidth 358 = clientWidth 358 (링크 Home/Guides/Regions/Food/About/Privacy 전부 표시), KR scrollWidth 358 = clientWidth 358 (링크 홈/가이드/지역/맛집/소개/개인정보처리방침 전부 표시, "개인정보처리방침" 잘림 없음). 데스크톱 1440도 461 = 461. PASS.
- D (map_note 있는 5편 설명문 1회만 출력): 대전·제주서부·전주야시장·전주1일·수원 5편 전부 렌더된 public HTML에서 설명문 고유 문구 출현 1회씩 확인 (텍스트 기준·원문 HTML 기준 둘 다 1회). 대전 "Daejeon Station branch has no separate map listing" 1회, 제주서부 "Handam Coastal Trail is not on the map" 1회, 전주야시장 "Nambu Market is not on the map" 1회, 전주1일 "Gaekridan-gil is not on the map" 1회, 수원 "Banghwasuryujeong is not on the map" 1회. PASS.
- E (390px 홈 지도 Daejeon 1 대 Gyeongju 2 겹침): 390px에서 Daejeon 1 (x 139.8, y 1143.3, 56.0x13) vs Gyeongju 2 (x 209.0, y 1170.9, 64.5x13), 세로 간격 14.6px, 겹침 false. 데스크톱 1440에서도 간격 29.1px, 겹침 false. 홈 지도 라벨 9개 전수 쌍 겹침 검사 0건 (1440·390 둘 다). 홈 지도 라벨 카운트: Seoul 7 / Busan 2 / Incheon 1 / Jeju 3 / Gyeongju 2 / Gangwon 2 / Jeonju 2 / Suwon 1 / Daejeon 1. PASS.
- F (스티커 렌더 width): 대전·제주서부·서울겨울 3편에서 .sticker img.sticker-anim 실측 전부 96x96 (각 편 4개씩, 총 12개 측정, 전부 visible). 모바일 390 대전도 4개 전부 96x96. 320px·748px 확대 아님. PASS. 단, still PNG 중복 렌더 결함이 별도로 있음 (아래 14-9 참조. width 자체는 96px로 정상).

### 14-7. 스티커·콜라주·카운터·/kr·제휴·테크트리·전수 grep

- 스티커 교체 실측: 새 12파일 전부 육안 확인 (lets-go 지도+캐리어 / yum 국수 젓가락 / pro-tip 체크리스트+초록 체크 / must-visit 돋보기+"?" 기호 / tired-rest 웅크려 잠 / photo-spot 양손 카메라). 정본 시트 스타일과 일치 (흰 고양이·갈색 선화·민트 배낭·목 카메라·연분홍 볼터치·반짝이), 이미지에 글자 없음 (must-visit의 "?"는 기호), 파일당 200KB 이하 (최대 57,986B), public 렌더 HTML에서 "tuxedo" 0건, alt 전면 교체 확인 (대전 글에서 신 alt 4종 렌더 확인), CREDITS.md 스티커 섹션 갱신 확인 (236행 "Semo stickers (replaced 2026-11-19, 2nd phase)", 정본 시트 경로·MD5·6종 표). 단, public/images/photos/CREDITS.md 파일 자체 (정적 복사본) 안에 "The 1st-phase tuxedo-cat set"이라는 문장으로 "tuxedo"가 1회 남아 있음. 렌더된 HTML 페이지에는 0건이라 사용자 노출은 없으나, "public/에 tuxedo 0건"을 파일 단위로 엄밀히 재면 1건 (CREDITS.md 본문 기록)임. 렌더 기준으로는 PASS, 파일 기준으로는 1건 잔존으로 기록함. (CREDITS.md는 교체 이력을 적는 문서라 이 문장 자체가 잘못은 아님.)
- 스티커 렌더 결함 (신규 발견, 미결): 스티커가 매 삽입 위치마다 2개씩 보임. 원인: static/css/style.css:252 `.sticker img{...display:block...}` (명시도 0,1,1)가 :253 `.sticker-still{display:none}` (0,1,0)과 hidden 속성 UA 규칙을 이겨서, hidden인 still PNG까지 96x96으로 렌더됨. 대전·제주서부·서울겨울 3편 DOM 프로브에서 전부 imgs 8개 중 visible 8개 (anim 4 + still 4). prefers-reduced-motion 블록의 .sticker-anim{display:none}도 같은 이유로 `.sticker img`에 져서 감소 모션 전환도 깨짐. 요소 스크린샷 30-sticker-*.png 3장에서 고양이 2단 표시 육안 확인. 수정하지 않음 (미결, 아래 14-9 참조. 권장 수정: :253을 `.sticker img.sticker-still{display:none}`로, 감소 모션 쪽을 `.sticker img.sticker-anim{display:none}`으로 바꾸면 명시도 (0,2,1)로 이김).
- 콜라주: 서울 겨울 글 2컷 콜라주 렌더 확인 (collage-grid collage-n2, 이미지 2장, 캡션 2개 - "Photo: Korea.net / Korean Culture and Information Service (Jeon Han), CC BY-SA 2.0" + "After snow, the palace roofs are the best sight in the city. Photo: Koshyk, CC BY", credit_present true). 스크린샷 08-collage-seoul-winter-1440.png에서 향원정 설경 (흑백, seoul-40) + 창덕궁 인정전 (컬러, seoul-22) 2컷 나란히 표시 확인. PASS.
- 카운터: 미바인딩 상태에서 푸터 카운터 숨김 확인 (home 1440에서 #visit-counter hidden true, visible false. 요소 스크린샷이 hidden이라 실패해 페이지 하단 전체 스크린샷 07-counter-hidden-1440.png로 대체. 푸터에 Today/Total 문구 없음, © 2026 HOHO Tour까지만 표시). 콘솔 에러 0건 (JS pageerror 없음. 리소스 에러만 있음: Google Fonts 터널 실패, emrld.ltd 터널 실패, 로컬 정적 서버의 /api/visit 501. 푸터 스크립트는 fetch 실패를 catch해 조용히 숨김 유지). functions/api/visit.js 존재 (5,551B, node --check 통과), wrangler.toml.example 존재 (982B, 플레이스홀더 ID 포함, 실 wrangler.toml 없음). 배포 절차 문서 NOTES_COUNTER.md 3절 최신 여부: 대시보드 경로 우선·KV 이름 hoho-tour-visits·바인딩 VISIT_COUNTER·프로젝트 hoho-tour·워크플로우 wrangler pages deploy와 wrangler.toml.example 내용이 일치해 최신임. 다만 NOTES_COUNTER.md 5절의 "Hugo build passes (44 pages)"·"Counter markup is present in all 43 rendered HTML files"는 1차 시점 수치라 지금 (EN 46 + KR 15)과 다름. 문서 수치만 낡은 것이고 코드·절차는 그대로라 미결이 아닌 참고 기록으로 남김. 배포는 똘마니 몫이라 실행하지 않음.
- /kr 게이트: public/kr/ 전체 grep (travelpayouts|klook|kkday|viator|getyourguide|trip.com|aviasales|agoda|booking.com|expedia|affiliate|emrld|beacon|googletagmanager|google-analytics) 0건. 언어 토글 동작 재확인: 데스크톱 1440에서 토글 클릭 후 한국어 링크 클릭 시 /kr/로 이동 (H1 "서울에 사는 사람이 알려주는 서울 여행 가이드" 확인), 다시 영어 토글 시 /로 복귀. 모바일 390에서도 토글 열고 한국어 링크 클릭 시 /kr/ 이동 확인. KR 홈 렌더: 카드 21개, 지도 활성 지역 9개, lang ko-KR, emrld 없음, 고지문 없음, 가로 넘침 0 (1440·390 둘 다). KR 허브 (/kr/korea/daejeon/): 가로 넘침 0, 카드 0개 (KR 글 없음, "Guides coming soon" 영어 박스 + 한국어 안내 표시. 구조 단계라 정상), 무드 일러스트 정상. i18n 구조: KR 홈·허브 렌더 정상, /kr/themes/는 비어 있음 (1차와 동일, KR nav에서 링크 안 함).
- 외국어 버전 제휴링크 글당 2-4개: 1차 대상 6편 + 대전 유지 확인. 제주서부 2 / 서울 3일 3 / 속초 2 / 수원 2 / 전주 1일 3 / 대전 3. 전체 21편 중 범위 안 14편, 범위 미달 7편 (busan-pork-soup 1 / gyeongju-night 0 / jeonju-night 1 / seoul-cafes 1 / seoul-market 1 / seoul-night 1 / seoul-subway 1), 범위 초과 0편. 1차 기록 (13-14절 20-3)과 편당 개수 전부 일치. 미달 7편은 손대지 않고 미결로 유지. Agoda 링크는 2차에서 새로 추가하지 않음 (편당 개수가 1차 기록과 전부 일치하는 것으로 확인. 사이트 내 Agoda 링크는 stage2·stage3 통합 때 들어간 지역·호텔 페이지로, 2차 리라이트에서 aff 추가·삭제·변경 0건). 기존 Agoda 10건 승인 미확인은 미결로 유지 (Travelpayouts 대시보드 Programs 승인 상태는 로그인이 필요해서 확인 불가).
- 맛집 테크트리: 부산·서울 2개 지역 전부 클릭으로 이어짐 확인. 부산: /korea/busan/ 허브 → Food 테마 칩 클릭 → /themes/food-restaurants/ → 부산 2일 글 카드 클릭 → 글 안 교차 링크로 부산 국밥 글까지 이동 (chain_ok true, 최종 /blog/busan-pork-soup-milmyeon/). 서울: /korea/seoul/ 허브 → Food 테마 칩 클릭 → /themes/food-restaurants/ → 서울 시장 글 카드 클릭 → 글 안 교차 링크로 서울 노포 글까지 이동 (chain_ok true, 최종 /blog/seoul-old-restaurants-baekban-bbq/). 참고: 허브의 테마 칩은 그 자리 필터가 아니라 /themes/<테마>/ 페이지로 가는 링크임. 체인은 끊기지 않고 끝까지 이어짐. 첫 시도에서 테마 페이지의 첫 카드 (서울 카페 글)를 눌러 부산 체인이 서울 글로 빠진 적이 있어, 지역별 카드 지정 클릭으로 다시 확인함.
- 전수 grep: 금지어 (hidden gem / nestled / must-visit / delve / "Whether you're")는 prose 기준 0건 (must-visit은 sticker.html의 kind 목록·alt 문구에만 있고 prose가 아님). 긴 바 문자 (—, –, ㅡ)는 content/ + layouts/ + static/css/ 0건, public/ HTML 0건. public/ 전체 (HTML) github·"open an issue"·commit·deploy·wrangler·BUILD_LOG 0건 (AI-generated 정직 표기는 제외). Contact 플레이스홀더 2곳 (about.md:59, privacy.md:41, mailto:contact@placeholder.invalid) 그대로 유지 확인 (확정 전이라 교체하지 않음).

### 14-8. 주의 항목 확인 결과 (고치지 않고 미결로 기록)

- gangneung-07 라이선스: 해결됨으로 기록. 코디네이터가 Commons API로 CC BY-SA 4.0·Mobius6 확정 재확인함. 검증 담당도 Commons API로 직접 재확인: File:Gangneung Jungang Market 20220501 002.jpg, Artist Mobius6, LicenseShortName "CC BY-SA 4.0", LicenseUrl https://creativecommons.org/licenses/by-sa/4.0, AttributionRequired true. CREDITS.md 272행도 Mobius6·CC BY-SA 4.0으로 일치.
- seoul-40이 hero 이미지 (seoul-15)와 같은 향원정 설경 주제라 중복 여부: 미결 (판단은 부모 몫). 육안 비교 결과: seoul-15는 컬러 파노라마 (눈 덮인 연못·금빛 하늘·향원정 전경), seoul-40은 흑백 근접 앵글 (햇빛 역광·앙상한 가지 프레임·연못 반사, 좌하단 "KOREA.net" 워터마크 있음). 같은 피사체·다른 사진·다른 처리라 동일 이미지 중복은 아님. 다만 서울 겨울 글에서 hero와 본문 사진이 같은 주제라 독자가 중복으로 느낄 수 있음. 교체 여부는 부모 결정. (서울 겨울 글에 2컷 콜라주로 묶인 건 별개 - 콜라주는 seoul-40 + seoul-22.)
- jeonju-night-06이 q20 저장이라 품질이 다소 낮음: 육안 확인 후 기록. 낮 시간 한옥마을 지붕 전경 (오목대 조망), 1600x1064, 232,752B. 렌더 크기에서는 기와 디테일이 다소 무른 느낌이 있으나 알아보기 어려운 수준은 아니고, q20 특유의 블록 노이즈가 눈에 띄게 보이지는 않음. 품질이 다소 낮다는 B조 기록과 일치하는 수준. 교체 여부는 부모 결정 (미결).
- 불국사 입장료 충돌: 미결로 기록, 숫자 변경 금지. 본문 기존 수치 "Admission runs about 6,000 KRW for an adult, based on recent listings." (gyeongju-one-day-ktx-bulguksa-hwangridan.md:62) 그대로 유지 확인. 2026년 가이드 여러 곳은 "2023-05-04부터 무료 (입장료 폐지)"라고 함. A조가 고치지 않고 플래그만 남김. 입장료·운영시간 확정은 코디네이터·똘마니 판단에 맡김.
- C조 보고 (git diff HEAD상 시장·노포·지하철 3편의 aff URL·stops 변경처럼 보이는 부분은 작업 시작 전 디스크에 이미 있던 타 팀 작업분): 현재 디스크 기준 aff 개수와 1차 기록 대조 완료. 편당 고유 aff URL 개수 (본문 article 기준): 시장 1 / 노포 2 / 지하철 1. 1차 기록 (13-14절 20-3)의 미달 7편 목록 (시장 1·노포는 범위 안 2개·지하철 1)과 일치하고, 전체 21편의 편당 개수도 1차와 전부 일치 (범위 안 14편·미달 7편·초과 0편). 2차에서 aff를 건드리지 않은 것으로 확인됨. git diff HEAD로는 aff 변경처럼 보이나, 이는 HEAD가 낡은 커밋이라 생기는 차이로, 작업 기준은 디스크 원본임.
- name_ko 라벨은 /kr 단독 글 번역이 올 때까지 휴면 상태 (미결로 기록). name_ko는 6편 (대전·제주서부·전주1일·서울3일·속초·수원)에 들어 있음. /kr 단독 글은 아직 없어서 EN 페이지에서는 영문 라벨만 렌더되고, /kr 분기는 임시 사본 테스트 (14-5 참조)로만 확인함. KR 번역이 오면 같은 partial이 한글 라벨을 바로 씀.
- 나머지 15편 랜드마크는 2차 이후 확장 (미결로 기록). 랜드마크가 있는 편은 대표 5편 + 대전 1편뿐이고, 나머지 15편에는 landmarks 필드가 없음.
- 그 외 1차 미결 유지: Contact 플레이스홀더 2곳 (주인님 확인 후 교체 필요. 후보 contact@hoho-labs.com - 테스트 메일 안 튀면, 아니면 hello@hoho-labs.com. contact@hoholabs.com은 주인님 도메인이 아니라 사용 금지), PUSH-RUNBOOK force-push 필요 + 사업자번호 불일치 (라이브 값 vs MEMORY 876-12-*****, 주인님 확인 미결), Leaflet zip 블로커는 해소됨 (14-1 참조, 정본 zip 수령·벤더링 완료), 파비콘 교체 예약 (로고 확정 대기), Travelpayouts 승인 상태 확인 불가 (로그인 필요), /kr 대표글 번역 11-20 12:00·JP/SP/CN 11-21은 이번 범위 밖, jeju-east-07 미추가 (위 14-1 참조).

### 14-9. 이번 검증에서 새로 발견한 결함 (고치지 않음, 납품 전 부모 결정 필요)

- (신규 1) 스티커 2중 렌더 (전 21편 해당, 육안 확인): 매 삽입 위치마다 애니메이션 WebP + 정지 PNG가 2단으로 보임. 원인: static/css/style.css:252 `.sticker img{display:block}`이 :253 `.sticker-still{display:none}`과 hidden 속성을 이김 (명시도 0,1,1 vs 0,1,0). prefers-reduced-motion 전환도 같은 이유로 깨짐. 실측: 3편 전부 imgs 8개 중 visible 8개 (anim 4 + still 4), still 계산 display block 96x96. 스크린샷 30-sticker-*.png 3장. 권장 수정: :253을 `.sticker img.sticker-still{display:none}`로, 감소 모션 쪽을 `.sticker img.sticker-anim{display:none}`으로 변경. 적용하지 않음. 납품 전 수정 여부를 부모가 결정할 것. (width 96px 자체는 정상이라 F항 실측은 PASS로 기록하고, 이 결함은 별도 항목으로 분리함.)
- (신규 2) 제주 클러스터 라벨 겹침 (기본 줌에서): 제주 서쪽 글 기본 fitBounds 줌에서 라벨 2쌍이 겹침. 데스크톱 1440·모바일 390 동일: [Hyeopjae Beach / Saebyeol Oreum], [Hallim Park / Saebyeol Oreum]. 스크린샷 20-map-jeju-west-1440.png에서 "Saebyeol Oreum" 라벨이 "Hyeopjae Beach" 라벨과 겹치고 "Hallim P..."가 잘려 보임. 배지 1·2·5번도 한 자리에 겹쳐 보임. 줌인 (+1) 후에는 라벨 겹침 0건으로 해소되나, 배지 1·2번은 줌인 후에도 겹친 상태로 남음 (스크린샷 23-map-jeju-zoomin-1440.png). layoutLabels() 충돌 회피가 이 클러스터에서는 동작하지 않은 것으로 보임. 전주 1일 글도 기본 줌에서 라벨 3쌍 겹침 ([Jeondong Catholic Cathedral / Pungnammun Gate], [Jeondong Catholic Cathedral / Omokdae], [Pungnammun Gate / Omokdae]. 한옥마을에 6개 스탑이 몰린 클러스터). 대전·수원 글은 라벨 겹침 0건.
- (신규 3) 대전 글 라벨이 지도 경계에서 잘림: 데스크톱 1440에서 스탑 1번 라벨 "Seongsimdang Daejeon Station Branch"가 지도 오른쪽 경계에서 잘림 ("...Brar"까지만 보임). 모바일 390에서는 1번 라벨이 오른쪽 경계에서, 2번 라벨 "Seongsimdang Main Store"가 왼쪽 경계에서 잘림 (스크린샷 44-map-daejeon-390.png). 라벨이 배지 오른쪽에 고정되고 지도 밖으로 나가면 클리핑됨. fitBounds 여유·라벨 뒤집기 (label-left) 로직이 경계에서는 동작하지 않음.
- (신규 4) 대전 Hanbit Tower 랜드마크 클릭 불가: 한빛탑 (🗼) 랜드마크가 스탑 배지 5번 (DCC)과 거의 같은 위치라 배지가 포인터 이벤트를 가로막음. 호버 시도 시 Playwright 타임아웃 (badge 5 intercepts pointer events). 나머지 11개 랜드마크는 호버·클릭 툴팁 전부 확인됨. 대전 Complex Terminal 툴팁은 정상 표시됨.
- (신규 5) 샌드박스에서 타일 픽셀 미확인 (환경 한계, 미결): 14-2·14-5 참조. 사이트 결함이 아니라 검증 환경의 터널 차단이라, 실브라우저 재확인이 필요함. 타일 내용 자체는 curl로 확인됨.
- (참고) 1차 알려진 사소한 결함 중 "Jeonju 2 / Gyeongju 2 붙어 보임"은 E 수정으로 해소됨 (14-6 E항, 간격 14.6px·29.1px). "전주 허브 무드 일러스트 하단 Jeonju 라벨 잘림"과 같은 부류로, KR 대전 허브 무드 일러스트의 "Daejeon" 제목 글자가 figure 상단 라운드 크롭에 살짝 잘려 보임 (스크린샷 50-kr-hub-daejeon-1440.png). 경미한 표시 문제로 기록만 함.

### 14-10. 스크린샷 (captures-map-daejeon-2nd/, 데스크톱 1440 + 모바일 390)

- 01-home-1440.png (홈 전체), 04-sticky-500px-1440.png (스크롤 500px 데스크톱), 07-counter-hidden-1440.png (푸터 카운터 숨김), 08-collage-seoul-winter-1440.png (서울 겨울 2컷 콜라주), 09-busan-2day-1440.png / 10-gyeongju-night-1440.png / 11-seoul-market-1440.png (리라이트 대표 글 3편), 12-hub-busan-1440.png / 14-hub-seoul-1440.png (테크트리 허브 2곳), 13-techtree-busan-post-1440.png (테크트리 경유 글), 15-toggle-landed-kr-1440.png (토글 후 /kr/ 도착), 20-map-daejeon-bread-pilgrimage-seongsimdang-dcc-1440.png / 20-map-jeju-west-aewol-oreum-cafes-1440.png / 20-map-jeonju-one-day-hanok-bibimbap-gaekridan-1440.png / 20-map-suwon-hwaseong-one-day-1440.png (Leaflet 라이브 지도 4편), 21-map-daejeon-popup-1440.png (대전 팝업), 22-map-daejeon-landmark-tooltip-1440.png (대전 랜드마크 툴팁 재확인), 23-map-jeju-zoomin-1440.png (제주 줌인 후 라벨), 30-sticker-daejeon-bread-pilgrimage-seongsimdang-dcc-1440.png / 30-sticker-jeju-west-aewol-oreum-cafes-1440.png / 30-sticker-seoul-winter-guide-late-november-december-1440.png (스티커 96px 증거 3곳 - 2중 렌더 결함도 보임), 40-home-390.png (홈 모바일), 41-sticky-500px-390.png (스크롤 500px 모바일), 42-kr-home-390.png (KR 홈 모바일), 43-toggle-390-open.png (모바일 토글 메뉴 열림), 44-map-daejeon-bread-pilgrimage-seongsimdang-dcc-390.png / 44-map-jeju-west-aewol-oreum-cafes-390.png (Leaflet 모바일 2편), 45-regionbar-scrolled-390.png (지역바 최대 스크롤 시 대전 표시), 50-kr-hub-daejeon-1440.png (KR 대전 허브), 60-kr-tile-test-temp-1440.png (임시 /kr 글 타일 분기 테스트 - 임시 파일이라 사이트에 남지 않음).
- 검사 기록: checks.json (본 프로브), checks2.json (타일 센서스·대전 툴팁 재확인·제주 줌인·테크트리 재확인·지역바 프로브), checks3.json (KR 타일 라이브 테스트·지역바 최대 스크롤), checks4.json (스티커 2중 렌더·앵커·제주/전주 라벨·한빛탑·타일 환경 한계 요약).
- 삭제한 파일 1개: 45-regionbar-swiped-390.png는 스와이프 프로브 중 탭이 경주 링크를 눌러 경주 허브로 이동한 화면이라 오해 소지가 있어 삭제함 (링크 클릭 동작 확인으로만 기록하고, 지역바 스크롤 증거는 45-regionbar-scrolled-390.png로 대체).

### 14-11. 2차 zip + 재빌드 검증

- zip: ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-map-daejeon-2nd.zip - work/ 내용물을 사이트 루트로 (public/, resources/, .git, .hugo_build.lock, work-backup-phase1/, NOTES_*.md, counter-captures/ 제외) + 이 BUILD_LOG.md (14절 포함). 파일 324개, 압축 해제 크기 42,625,736B. 압축 파일의 정확한 크기·MD5는 zip 안에 적을 수 없는 값이라 (적는 순간 파일이 바뀌어 값이 달라짐. 1차도 기록 38,847,156B와 실제 파일 38,847,408B가 252B 차이로 같은 구조였음) 납품 보고에 적힌 최종 파일 기준으로 확인할 것. (검증 중 확인한 재생성본 수치: 압축 크기 41,422,284B, MD5 5ce53d38b891327efa375c501074e156. 이 값은 이 문장을 쓰기 직전 빌드 기준이고, 최종 재생성 시 수백 바이트 정도 달라질 수 있음.) (1차 zip의 "330개 파일"은 디렉터리 항목 35개를 포함한 수라 파일만 세면 295개였음. 2차는 295 + 신규 29개 (사진 14장 + Leaflet 7파일 + 스티커 src-new 7개 + build_stickers_v2.py 1개) = 324개로 일치하고, 빠진 파일 0건.)
- 제외 항목 확인: zip 목록에서 public/·resources/·.git·NOTES_*.md·counter-captures/·.hugo_build.lock·work-backup-phase1/ 0건. (.gitignore·.github/workflows/deploy.yml은 포함돼도 되는 파일이라 유지. 1차와 동일.)
- 스크린샷은 zip에 넣지 않고 captures-map-daejeon-2nd/ 폴더로 별도 전달 (checks.json·checks2.json·checks3.json·checks4.json 포함).
- zip 재빌드 검증: /tmp/zipcheck2에 zip을 풀어 plain `hugo --minify` 실행: 0 에러, EN 46 pages + KR 15 pages, static files 238. 빌드 산출물에서 확인: public/blog 21편 전부, public/vendor/leaflet/ 7파일 (leaflet.js·leaflet.css·images 5개), public/kr/blog/에는 index.html만 있고 stale 대전 KR 페이지는 없음 (fresh 빌드라 stale 잔재 없음), BUILD_LOG.md 14절 포함 확인. Ttolmani 검수용: 압축 해제 후 plain `hugo --minify`로 빌드 (timeZone Asia/Seoul 적용으로 --buildFuture 불필요), 스크린샷 육안.
- 드라이브 업로드 안 함 (부모가 함). main 직접 푸시·배포 금지.
- 검증 중 작업 기록: BUILD_LOG.md 1-13절은 1차 zip에 들어 있던 정본에서 복원한 뒤 14절을 추가함. (검증 중 muse.write를 append 모드 지정 없이 실행해 파일이 14절 초안만으로 덮어써지는 사고가 있었고, 1차 zip의 BUILD_LOG.md (300행, 1-13절)를 풀어 복원한 뒤 14절을 다시 append함. 복원본은 1차 zip과 동일 내용임을 행 수·13절 존재로 확인. 이후 append는 전부 mode append로 실행함.)

## 15. 2차 결함 수정 후 최종 재검증·재패키징 (2026-11-19, 2차 마감 20:00)

재검증 담당 실측. 이전 검증 담당이 만든 zip(hohotour-revamp-1119-map-daejeon-2nd.zip, MD5 4d037dbff8da1a04abff7ecd27c6d17e)은 결함 수정 전 것이라 폐기하고 새로 만듦. 작업 폴더 ~/workspace/hoho-tour-revamp/work/ (Hugo 사이트 루트). content/blog/ 본문·사진·제휴링크·Contact·파비콘은 검증만 하고 수정하지 않음. 드라이브 업로드 안 함 (부모가 함). main 직접 푸시·배포 금지.

### 15-1. 결함 수정 내역 (수정 담당, NOTES_FIX2DEFECTS.md)

- 바꾼 파일 2개만: static/css/style.css, layouts/partials/tour-summary.html. 재검증 담당이 소스에서 수정 패턴 존재를 직접 확인함 (아래 각 항).
- (1) 스티커 2중 렌더: style.css의 `.sticker-still{display:none}` (0,1,0)을 `.sticker img.sticker-still{display:none}` (0,2,1)로, reduced-motion 블록의 `.sticker-anim{display:none}`을 `.sticker img.sticker-anim{display:none}` (0,2,1)로, `.sticker-still{display:block}`을 `figure.sticker img.sticker-still{display:block}` (0,2,2)로 교체. sticker.html 숏코드는 미접촉 (hidden 속성 유지).
- (2) 제주·전주 클러스터 라벨 겹침: tour-summary.html의 layoutLabels() 전면 교체. 박스 패딩 제거 (정확한 라벨 rect로 판정), 후보 dy를 0, ±26, ±52, ±78로 확장 (양쪽 x 7단 = 14 슬롯), 겹침 0인 후보가 없으면 겹침 면적이 가장 작은 후보 선택 (마지막 후보 유지 폐기), 겹침 판정은 클램프된 최종 박스 기준. 가까이 붙은 스탑 표시 분리 패스도 3회 → 12회로 늘림 (실측 결과 배지 중심 간격은 수정 전과 동일해 3회도 이미 수렴 상태였음이 확인됨. 12회는 무해한 여유분으로 유지).
- (3) 대전 라벨 경계 잘림: 같은 layoutLabels() 안에 경계 검사 통합. 후보마다 map.getSize() 기준으로 경계 검사, 오른쪽이 넘치면 왼쪽 후보 우선, 양쪽 다 넘치면 translateX로 경계 안쪽 클램프 (dx=0이면 빈 문자열로 CSS 유지), 세로도 dy 클램프 (상단 2px·하단 size.y-2px).
- (4) 한빛탑 랜드마크 클릭 불가: 랜드마크 마커에 `zIndexOffset: 1000` 추가 (전 6편 랜드마크 전부). 신규 separateLandmarks(): 랜드마크 중심이 스탑 배지 중심에서 18px 안에 들면 setIcon으로 iconAnchor를 바꿔 디스크만 반대 방향으로 밀어냄 (목표 중심 간격 19px). moveend마다 재계산해 줌·팬 시 충돌이 풀리면 [13, 13]으로 복귀. 랜드마크 진짜 좌표는 그대로 (디스크 화면 위치만 이동).

### 15-2. 빌드

- `~/workspace/infra-gate/tools/hugo-bin/hugo --minify --cleanDestinationDir` (work/에서 실행), 0 에러. EN 46 pages + KR 15 pages, Paginator 0, Non-page files 0, Static files 238, Aliases 1 (/en/ 리다이렉트), Cleaned 0. (14-3과 동일 페이지 수. public/blog 디렉터리 21편.)
- 빌드 전 work/public/을 --cleanDestinationDir로 정리해 14-3의 stale public 잔재 (임시 /kr 테스트 빌드 파일 등) 재발 방지.

### 15-3. 기존 게이트 결과 원문

- ~/workspace/hoho-tour-revamp/gate_phase2.py 실행 결과 원문:
```
FAIL  20 posts in public/blog  found 21
PASS  internal link 404 = 0  0 missing: []
PASS  image 404 = 0  0 missing: []
PASS  all img width/height  0 missing
FAIL  placeholders 0  ['about.md:TODO', 'privacy.md:TODO']
PASS  long dash 0  []
FAIL  disclosure 5 places consistent  plain/no-commission in ['lang-toggle.html']
PASS  Travelpayouts script in built index
PASS  Jeonju province active on home map  prov prov--active
PASS  Gyeonggi province active on home map  prov prov--active
FAIL  home map counts Jeonju 2 / Suwon 1
PASS  tour-summary on all 6 new posts
PASS  hubs jeonju/suwon no coming-soon
PASS  no raw shortcodes in built posts  []
GATES: FAILED: ['20 posts in public/blog', 'placeholders 0', 'disclosure 5 places consistent', 'home map counts Jeonju 2 / Suwon 1']
```
- FAIL 4건은 14-3과 완전히 동일한 사유로 게이트 기대값 노후·알려진 미결·오탐이지 회귀가 아님: (1) "20 posts" 기대 vs 실제 21편 (대전 추가가 정당한 증가). (2) placeholders TODO 2건 (about.md·privacy.md Contact TODO, 13-10 미결 그대로). (3) "home map counts Jeonju 2 / Suwon 1" 문자열 불일치 (실제 렌더는 홈 지도 라벨 "Jeonju 2" + "Suwon 1"로 카운트 정상 표시, 아래 15-8 홈 라벨 실측 참조. 게이트 문자열이 구 라벨 형식). (4) "disclosure 5 places consistent" - 고지문 자체는 5곳 일관 (실패 원인은 lang-toggle.html 5행 Hugo 주석 속 "Plain links, so it works without JS" 문구를 게이트의 단순 부분문자열 검사가 건드린 오탐. 주석은 Hugo가 렌더에서 제거하고 public/ 전수 grep에서 "plain link / no commission" 0건 확인).

### 15-4. 결함 (1) 스티커 2중 렌더 재확인 - PASS

- 방법: Playwright 실측 (로컬 서버로 public/ 서빙, 실제 Chromium). 대전·제주서부·서울겨울 3편 데스크톱 1440 + 대전 모바일 390 + 대전 감소 모션 (reduced_motion="reduce"). 검사 기록 captures-map-daejeon-2nd/checks-recheck-a.json (defect1).
- 실측 (삽입 위치마다 보이는 이미지 수): 대전 1440 - anim 4개 visible, still 0개, 크기 96px. 제주서부 1440 - anim 4개, still 0개, 96px. 서울겨울 1440 - anim 4개, still 0개, 96px. 대전 390 - anim 4개, still 0개, 96px. (수정 전은 3편 전부 imgs 8개 중 visible 8개였음.)
- 감소 모션 (대전 1440): anim 0개 (display none), still 4개 visible (display block), 크기 96px. 감소 모션 전환 정상 동작.
- pageerror 0건 (전부). 스크린샷: recheck-sticker-daejeon-1440.png / recheck-sticker-jeju_west-1440.png / recheck-sticker-seoul_winter-1440.png / recheck-sticker-daejeon-390.png / recheck-sticker-daejeon-reduced-motion-1440.png (스티커 요소 근접 샷, 삽입 위치마다 고양이 1마리만 표시 육안 확인).

### 15-5. 결함 (2) 제주·전주 라벨 겹침 재확인 - PASS (라벨 기준)

- 방법: Playwright 실측, 6편 (대전·제주서부·전주1일·수원·서울3일·속초) x 데스크톱 1440 + 모바일 390 = 12개 프로브. 각 프로브에서 .tour-marker__label 전수 rect로 쌍 겹침 판정. 검사 기록 checks-recheck-a.json (defect2_3).
- 실측 (라벨 겹침 쌍): 12개 프로브 전부 0쌍. 대전 5개 라벨, 제주서부 5개, 전주1일 7개, 수원 5개, 서울3일 9개, 속초 8개 라벨 전부 겹침 없음. (수정 전: 제주 2쌍, 전주 3쌍.)
- 배지 원판 자체는 여전히 겹침 (구조적 한계, 아래 15-10 참조): 제주 1/2/5번 중심 간격 6.7-8.0px, 전주 한옥마을 0-5.4px, 속초 시내 1440 2.0-22.6px / 390 1.0-11.4px, 대전은 최소 29.0px로 겹침 없음. 라벨 겹침 0 (이번 결함의 검증 기준)은 달성.
- pageerror 0건 (12개 프로브 전부).

### 15-6. 결함 (3) 대전 라벨 경계 잘림 재확인 - PASS

- 방법: 위 15-5와 같은 12개 프로브에서 라벨 rect를 지도 rect (.tour-map)와 대조해 경계 이탈 판정. 검사 기록 checks-recheck-a.json (defect2_3, clipping).
- 실측 (라벨 경계 이탈 건수): 12개 프로브 전부 0건. 대전 데스크톱·모바일 전부 이탈 0건 (수정 전: 데스크톱 1번 오른쪽 이탈 약 28px, 모바일 1번 오른쪽·2번 왼쪽·DCC 오른쪽 이탈). 덤으로 전주 390 (3건) + 수원 390 (2건)도 같은 로직으로 0건.
- 스크린샷 (15-5·15-6 공용, tour-summary 요소 샷): recheck-map-{daejeon,jeju_west,jeonju_1day,suwon,seoul_3day,sokcho}-{1440,390}.png 12장. 제주 1440 샷에서 Hyeopjae Beach / Hallim Park / Saebyeol Oreum 라벨 분리 육안 확인, 대전 390 샷에서 라벨 경계 안 표시 육안 확인.

### 15-7. 결함 (4) 한빛탑 클릭 재확인 - PASS

- 방법: Playwright 실측, 대전 데스크톱 1440, 타워 클릭과 스탑 5번 클릭을 분리해 각각 fresh 페이지에서 1회씩 확인 (14-9의 토글 아티팩트 방지). 검사 기록 captures-map-daejeon-2nd/checks-recheck-b.json (defect4).
- 실측: 한빛탑 중심 elementFromPoint = `DIV.leaflet-marker-icon tour-landmark` (🗼). 호버 툴팁 "Hanbit Tower" 표시, 클릭 툴팁 "Hanbit Tower" 표시 (재촬영한 뷰포트 샷에서 툴팁 육안 확인). 대전복합터미널 호버 툴팁 "Daejeon Complex Terminal"도 표시.
- 스탑 5번 중심 elementFromPoint = `SPAN.tour-marker__badge` ("5"), 클릭 팝업 "Daejeon Convention Center (DCC) / Expo area finish" 표시.
- 한빛탑-배지 최소 중심 간격 11.4px → 19.2px. 타워 디스크가 진짜 위치에서 약 8px 북서쪽으로 이동한 것은 의도된 표시 이동 (툴팁·배지 팝업 둘 다 중심 클릭이 되는 대가).
- 랜드마크-배지 최소 간격 (데스크톱, 6편 전수): 대전 19.2px, 제주 101.6px, 서울 45.6px, 속초 7.1px (아래 15-10 미결 참조), 수원 121.2px, 전주 16.4px. 수정 담당 실측값과 전부 일치.
- pageerror 0건. 스크린샷: recheck-map-daejeon-hanbit-tooltip-1440.png (뷰포트 샷, "Hanbit Tower" 툴팁 표시), recheck-map-daejeon-stop5-popup-1440.png.

### 15-8. 회귀 spot-check - PASS

- A (모바일 390 헤더·지역바, 스크롤 500px): 헤더 실측 높이 92px (ResizeObserver 동기화값, FIX 노트 추정 83px과 다름. 14-6과 동일), 지역바 top 92px로 헤더 바로 아래, 첫 칩 클릭 가능 (elementFromPoint가 칩 링크 자체), 지역바 스크롤 가능 (scrollWidth 768 > clientWidth 390), 페이지 가로 넘침 0px. 데스크톱 1440도 동일: 헤더 65px, 지역바 top 65px, 가로 넘침 0px. pageerror 0건. 스크린샷 recheck-sticky-500px-390.png / recheck-sticky-500px-1440.png.
- 홈 지도 라벨: 9개 라벨 전부 (Seoul 7 / Busan 2 / Incheon 1 / Jeju 3 / Gyeongju 2 / Gangwon 2 / Jeonju 2 / Suwon 1 / Daejeon 1), 쌍 겹침 0건 (1440·390 둘 다).
- 스티커 96px 유지 (위 15-4 참조).
- map_note 1회씩: 대전 "has no separate map listing" 1회, 제주서부·전주야시장·전주1일·수원 "not on the map" 각 1회 (렌더된 public HTML 텍스트 기준).
- Leaflet vendor 7파일: static/vendor/leaflet/ (leaflet.js 147,552B / leaflet.css 14,806B / images/marker-icon.png 1,466B / marker-icon-2x.png 2,464B / marker-shadow.png 618B / layers.png 696B / layers-2x.png 1,259B) 전부 존재. 빌드 후 public/vendor/leaflet/에도 7파일 전부 존재 (아래 15-11 zip 재빌드 검증에서 재확인).
- Esri 타일 URL·attribution: 대전 글 HTML에 `server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}` 1건, Esri attribution "© Esri, HERE, Garmin, © OpenStreetMap contributors, and the GIS User Community" 렌더 확인 (스크린샷 지도 하단에도 표시). /kr 타일 분기는 14-5 임시 사본 테스트로 확인된 배선 그대로 (이번 재검증에서는 work/ 미접촉).
- 카운터 미바인딩 숨김: 홈 390에서 #visit-counter hidden true, visible false. 콘솔 에러 0건 (JS pageerror 없음. 리소스 에러만 있음: 아래 타일 항목 참조).
- /kr 제휴 0건: public/kr/ 전체 grep (klook|agoda|travelpayouts|emrld) 0건. Travelpayouts 스크립트 public/index.html에 유지 (emrld 1건).
- 제휴 2-4개 유지: 1차 대상 6편 + 대전 유지 확인. 제주서부 2 / 서울 3일 3 / 속초 2 / 수원 2 / 전주 1일 3 / 대전 3. 전체 21편 중 범위 안 14편, 범위 미달 7편 (busan-pork-soup 1 / gyeongju-night 0 / jeonju-night 1 / seoul-cafes 1 / seoul-market 1 / seoul-night 1 / seoul-subway 1), 범위 초과 0편. 14-7 기록과 편당 개수 전부 일치.
- 이미지 404 전수 대조 (minify 무따옴표 src 포함, 게이트와 별도로 직접 작성한 스크립트): img 태그 662개, 고유 src 179건, missing 0건.
- 타일 픽셀 (환경 한계, 사이트 결함 아님): 샌드박스 Chromium은 외부 타일 호스트에 여전히 닿지 못함. 대전 글 기준 타일 img 9개 전부 data: 회색 errorTileUrl 플레이스홀더 (실타일 0). 실패 요청 11건: Google Fonts·emrld.ltd·arcgisonline.com 전부 net::ERR_TUNNEL_CONNECTION_FAILED (14-5와 동일 환경 한계). Leaflet js/css 404는 0건. 타일 내용 자체는 curl로 확인된 기존 결과 (Esri JPEG 44,620B)를 그대로 인용. 실브라우저 타일 픽셀 재확인은 미결 유지.

### 15-9. 스크린샷 (captures-map-daejeon-2nd/, recheck- 접두어, 기존 파일 유지)

- recheck-sticker-daejeon-1440.png / recheck-sticker-jeju_west-1440.png / recheck-sticker-seoul_winter-1440.png (스티커 요소 근접 샷, 1개씩만 표시)
- recheck-sticker-daejeon-390.png (모바일 스티커 요소 샷)
- recheck-sticker-daejeon-reduced-motion-1440.png (감소 모션: 정지 PNG 1개만 표시)
- recheck-map-daejeon-1440.png / recheck-map-daejeon-390.png / recheck-map-jeju_west-1440.png / recheck-map-jeju_west-390.png / recheck-map-jeonju_1day-1440.png / recheck-map-jeonju_1day-390.png / recheck-map-suwon-1440.png / recheck-map-suwon-390.png / recheck-map-seoul_3day-1440.png / recheck-map-seoul_3day-390.png / recheck-map-sokcho-1440.png / recheck-map-sokcho-390.png (동선 요약 요소 샷 12장)
- recheck-map-daejeon-hanbit-tooltip-1440.png (뷰포트 샷, "Hanbit Tower" 툴팁 표시)
- recheck-map-daejeon-stop5-popup-1440.png (스탑 5번 팝업)
- recheck-sticky-500px-1440.png / recheck-sticky-500px-390.png (스크롤 500px 헤더·지역바)
- 검사 기록: checks-recheck-a.json (결함 1·2·3 전수 프로브), checks-recheck-b.json (결함 4·회귀 프로브).
- 검증 중 사고 기록: 첫 Playwright 실행이 속초 390 프로브 도중 서비스 재시작으로 중단돼 JSON이 저장되지 않음. 결함 1·2·3과 결함 4·회귀를 분리한 스크립트 2개로 나눠, 구간마다 JSON을 증분 저장하는 방식으로 다시 실행해 전부 완료함. 재실행 결과는 중단 전 부분 결과 (스티커·지도 스크린샷 17장)와 일치함.

### 15-10. 잔여 미결 (있는 그대로 기록, 고치지 않음)

- 배지 원판 겹침 (제주 1/2/5번 7-8px, 전주 0-5px, 속초 2-22px, 구조적 한계): 위 15-5 실측 참조. 제주 900m 분리가 화면 7-8px (fitBounds 줌에서 900m = 약 7px, 배지 지름 28px), 전주 한옥마을은 0-5px, 속초 시내는 1440 2-22px / 390 1-11px. 배지를 떼려면 약 3.6km 표시 분리가 필요해 오히려 지도를 왜곡함. 라벨 겹침 0 (검증 기준)은 달성. 대전은 배지 겹침 없음 (최소 29.0px).
- 속초 마켓 랜드마크 최소 간격 7.1px: 시내 클러스터 한가운데라 separateLandmarks()의 단일 최근접 배지 기준으로는 19px 분리가 안 됨. 랜드마크 자체는 클릭 가능해졌으나 배지 3·4·5번 중심이 랜드마크 디스크에 가려짐. 다만 해당 배지들끼리도 2-6px 간격이라 중심 클릭은 원래부터 모호했음. 디스크를 30px까지 밀면 위치 왜곡이 커져서 더 밀지 않고 그대로 둠. 대전 (이번 결함 대상)은 완전히 해결됨.
- 타일 픽셀 실브라우저 미확인 (샌드박스 터널 차단): 위 15-8 타일 항목 참조. 실브라우저 재확인 필요 (똘마니·주인님 쪽).
- seoul-40 vs seoul-15 중복 여부: 미결 (판단은 부모 몫). 14-8 기록 그대로. 같은 피사체 (향원정 설경)·다른 사진·다른 처리라 동일 이미지 중복은 아님. 다만 서울 겨울 글에서 hero와 본문 사진이 같은 주제라 독자가 중복으로 느낄 수 있음.
- 불국사 입장료 충돌: 미결, 숫자 변경 금지. 본문 기존 수치 "Admission runs about 6,000 KRW for an adult, based on recent listings." 그대로 유지 확인. 2026년 가이드 여러 곳은 "2023-05-04부터 무료 (입장료 폐지)"라고 함. 입장료·운영시간 확정은 코디네이터·똘마니 판단에 맡김.
- jeju-east-07 미추가: 라이선스 확인된 우도 전용 실사진을 찾지 못함 (14-1 참조).
- Contact 플레이스홀더 2곳 유지: about.md·privacy.md의 mailto:contact@placeholder.invalid + TODO 주석 그대로. 주인님 확인 후 교체 필요 (후보 contact@hoho-labs.com - 테스트 메일 안 튀면, 아니면 hello@hoho-labs.com. contact@hoholabs.com은 주인님 도메인이 아니라 사용 금지).
- Travelpayouts 승인 미확인: 대시보드 Programs 승인 상태는 로그인이 필요해서 확인 불가.
- Agoda 기존 10건 승인 미확인: 위와 동일 사유로 미확인 유지.
- name_ko 휴면: /kr 단독 글 번역이 올 때까지 휴면 상태. name_ko는 6편 (대전·제주서부·전주1일·서울3일·속초·수원)에 들어 있음. EN 페이지에서는 영문 라벨만 렌더되고, /kr 분기는 임시 사본 테스트 (14-5 참조)로만 확인함.
- 나머지 15편 랜드마크 2차 이후 확장: 랜드마크가 있는 편은 대표 5편 + 대전 1편뿐이고, 나머지 15편에는 landmarks 필드가 없음.
- 그 외 1차 미결 유지: PUSH-RUNBOOK force-push 필요 + 사업자번호 불일치 (라이브 값 vs MEMORY 876-12-*****, 주인님 확인 미결), 파비콘 교체 예약 (로고 확정 대기), /kr 대표글 번역 11-20 12:00·JP/SP/CN 11-21은 이번 범위 밖, jeonju-night-06 q20 품질 다소 낮음 (교체 여부는 부모 결정).

### 15-11. 2차 최종 zip (결함 수정 후)

- zip: ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-map-daejeon-2nd.zip - work/ 내용물을 사이트 루트로 (public/, resources/, .git, .hugo_build.lock, work-backup-phase1/, NOTES_*.md, counter-captures/ 제외) + 이 BUILD_LOG.md (15절 포함). 파일 324개, 압축 해제 크기 42,647,622B. (이 수치는 이 문장을 쓰기 직전 빌드 기준이고, 최종 재생성 시 수백 바이트 정도 달라질 수 있음. 압축 크기·MD5는 zip 안에 적을 수 없는 값이라 납품 보고에 적힌 최종 파일 기준으로 확인할 것.) 제외 항목 확인: zip 목록에서 public/·resources/·.git·NOTES_*.md·counter-captures/·.hugo_build.lock·work-backup-phase1/ 0건. (.gitignore·.github/workflows/deploy.yml은 포함돼도 되는 파일이라 유지. 1차·2차와 동일.)
- 스크린샷은 zip에 넣지 않고 captures-map-daejeon-2nd/ 폴더로 별도 전달 (checks-recheck-a.json·checks-recheck-b.json 포함, 기존 fix-·checks-fix.json 유지).
- zip 재빌드 검증: /tmp/zipcheck3에 zip을 풀어 plain `hugo --minify` 실행: 0 에러, EN 46 pages + KR 15 pages, static files 238. 빌드 산출물에서 확인: public/blog 21편 전부, public/vendor/leaflet/ 7파일, BUILD_LOG.md 15절 포함 확인. Ttolmani 검수용: 압축 해제 후 plain `hugo --minify`로 빌드 (timeZone Asia/Seoul 적용으로 --buildFuture 불필요), 스크린샷 육안.
- 드라이브 업로드 안 함 (부모가 함). main 직접 푸시·배포 금지.
- 이전 zip (MD5 4d037dbff8da1a04abff7ecd27c6d17e, 결함 수정 전)은 이 파일로 덮어써서 폐기함.

## 15-12. 부모 패치 - 불국사 입장료 정정 (2026-11-19, 2차 납품 직전)

부모(세모)가 14-8 미결 항목을 직접 검증해 한 줄을 고치고 zip을 재생성함. 코디네이터 작업은 15-11에서 끝난 상태라 파일 충돌 없음 (BUILD_LOG·zip 모두 13:14 이후 변경 없음 확인 후 작업).

- 정정 전: "Admission runs about 6,000 KRW for an adult, based on recent listings." (gyeongju-one-day-ktx-bulguksa-hwangridan.md:62)
- 정정 후: "Admission is free - the temple stopped charging on May 4, 2023, under the revised Cultural Heritage Protection Act (checked November 2026). Parking runs 2,000 KRW for a car and 4,000 KRW for a bus."
- 근거 (부모가 2026-11-19 직접 검색해 다중 출처 대조): 불국사·석굴암 공식 안내 "2023년 5월 4일부터 관람료 무료" (문화재보호법 개정, 국가지정문화재 보유 65개 사찰), Hanok Days (2026-08 확인), EveryTrail (2026-11-04 불국사 누리집 기준), KoreaTravelAtlas (2026-10-23 확인), slowmap (2026-10-31 사찰 공식 확인). 6,000원은 경주시 옛 표(구 금액)라 사찰 공식(무료)이 우선. 주차 소형 2,000원·대형 4,000원도 같은 출처에서 확인.
- 주의: 첫 패치 문장에 긴 바 문자(—)를 써서 게이트 long dash FAIL이 뜸. 하이픈(-)으로 바꿔 재빌드 후 long dash PASS로 복구. 게이트 최종 결과는 15-3과 동일한 4건 FAIL (기대값 노후·알려진 미결·오탐).
- 황남빵 6,000원 (같은 글 84행, 10개 한 봉지)은 별개 항목이라 건드리지 않음.
- 재빌드: hugo --minify --cleanDestinationDir 0 에러, EN 46 + KR 15 pages, static 238. zip 재생성 후 plain hugo --minify 재빌드 검증까지 완료 (아래 15-13 참조).

## 16. 2차 검수 결과 수정 4건 (2026-11-19, 배포 보류 대응)

똘마니 2차 실브라우저 전수 검수 (합격 18건) 뒤 배포 보류 사유 + 즉시 수정 4건(①~④)을 반영. 타일 방식(Esri z14+ 회색 안내판)은 동호 님 선택 대기 중이라 **타일 설정은 건드리지 않음** (maxZoom 19, fitBounds 15, Esri URL 그대로). 타일 결정이 오면 16-8 절차대로 붙이면 바로 zip 가능.

### 16-1. ① 배지 클러스터 - 픽셀 기준 최소 34px 분리 **[폐기, 17절 참조]**

> **폐기 (2026-11-19, 동호 님 지적)**: 이 방식(separateBadges() - 배지를 36px로 100패스 밀어내고 10px 이상 밀린 배지는 점선 리더선)은 동호 님이 95-jeonju-cap13.png를 보시고 지적한 바로 그 화면이라 폐기한다. separateBadges()·배지용 점선 리더선 로직은 17절에서 전부 제거했고, 이 절의 수치(35.1-35.8px)는 폐기된 방식의 검증 기록으로만 남긴다. ②③④는 유지한다.

- 문제: 미터 기준 900m 분리는 저줌에서 1-3px밖에 안 벌어짐. 제주 서부 배지 2·5 간격 6.7px(모바일)·13.9px(데스크톱), 속초 7개 스탑이 한 점에 겹쳐 5번만 보임.
- 수정 (layouts/partials/tour-summary.html, separateBadges() 신설): 미터 완화(12패스) 전면 삭제. 마커를 실좌표에 만들고, fitBounds 후 컨테이너 픽셀 기준으로 30→100패스 완화. 목표 36px (요구 34px + 투영 반올림 여유 2px). 일치 좌표는 쌍별 결정적 방향(황금각식)으로 펼침. 10px 이상 밀린 배지는 실좌표로 점선 리더선. moveend마다 실좌표부터 재계산 (멱등). 분리 후 배지가 뷰포트 밖으로 나가면 최초 1회만 fitBounds로 재조정 (maybeRefit, 1회 플래그).
- 검증 (Playwright, 대표 6편 x 1440·390 = 12프로브, checks-recheck2.json): 최소 배지 중심 간격 35.1-35.8px (대전 35.2, 제주서부 35.8, 서울3일 35.1, 속초 35.3-35.5, 수원 35.3, 전주 35.5), 전부 34px 이상. 뷰포트 밖 배지 0개.
- 시행착오: 1차 시도(목표 34px·30패스)는 실측 33.2-33.6px로 요구 미달 (다점 클러스터 완화 미수렴). 목표 36px + 100패스로 올려 35.1px 이상으로 복구.

### 16-2. ② 라벨↔배지 겹침 - layoutLabels() 회피 대상에 배지 포함

- 문제: 모바일 대전에서 "Seongsimdang Daejeon Station Branch" 라벨이 배지 1을 23.5px 덮고 배지 2·3 침범. 회피 후보에 라벨·랜드마크만 있고 배지가 빠져 있었음.
- 수정 (동일 파일, layoutLabels()): 장애물 목록에 전 스탑 배지 직사각형(28x28)·랜드마크 디스크(26x26) 추가. dy 후보를 13px 간격으로 세분화 (0, ±13, ±26, ±39, ±52, ±65, ±78, ±91, ±104). 수평 nudge 후보 추가 (0 / -20 / +20 / -40 / +40px, dx=0을 항상 먼저 시도해 이미 맞는 라벨은 안 움직임). 배치 순서를 너비 내림차순(긴 라벨 먼저)으로 변경. 모바일(≤640px) 라벨은 max-width 120px + 말줄임 + 11px 폰트 (static/css/style.css). 긴 이름 전문은 팝업·하단 번호 목록에 그대로 있음.
- 검증 (동일 12프로브): 라벨-배지 겹침 0쌍, 라벨-라벨 겹침 0쌍, 전부. (1440은 처음부터 0건.)
- 시행착오: 1차 시도(배지 장애물 + dy 13px 간격 + 라벨 140px 캡) 후에도 390 3편 잔존 (서울 DDP-배지 431px² 등). 디버그 프로브(/tmp/pw_debug_labels.py)로 후보 지형을 확인한 결과 140px 라벨로는 0겹침 후보 자체가 없는 케이스 (지도 312px 폭에 클러스터 130px + 라벨 140px)가 있어 캡을 120px로 줄이고 widest-first + dx nudge를 추가해 전부 0으로 복구. 최종 서울 390: DDP-배지 0, 라벨-라벨 0. 전주 390: Jeondong-배지 0, 라벨-라벨 0.
- 작업 중 메모: 한 번 edit이 maybeRefit 안의 forEach를 잘못 건드렸으나 즉시 원복하고 올바른 위치(layoutLabels 본 루프)에 적용함. 최종 코드는 node --check 통과 + 동작 검증으로 확인.

### 16-3. ③ 모바일 "Tap to explore the map" 버튼 지도 밖으로 + nav 3px

- 문제: 버튼이 지도 하단 1/4을 덮어 라벨·배지를 가림. 모바일 nav scrollWidth 361 > clientWidth 358 (실브라우저 실측이 정본, 샌드박스 358=358은 폰트 차이).
- 수정: 버튼을 .tour-map-wrap 밖(지도 아래)으로 이동, CSS를 position:absolute에서 display:block·width:100%·지도 아래 바로 변경 (style.css .tour-map__enable). JS 조회(section.querySelector)는 그대로 동작. 모바일 헤더 nav 링크 패딩 6px 8px → 6px 6px (링크당 2px x 6개 = 12px 여유).
- 검증: 모바일 390 6편 전부 버튼 표시됨(지도 아래 y406-441), 버튼-지도 bbox 겹침 0. 탭하면 버튼이 사라지고(hidden=true) 지도 조작이 켜짐 (checks-recheck2-extra.json, pageerror 0). 데스크톱 1440 6편 전부 hidden. nav scrollWidth = clientWidth 전부 (EN 390: 358=358, 링크 합계 319 → 39px 여유. KR 홈 390: 358=358, 링크 합계 288 → 70px 여유. KR은 번역 글이 아직 없어 /kr/blog/...가 아니라 /kr/ 홈에서 측정. 1440: EN 461=461, KR 428=428).

### 16-4. ④ Contact 주소 contact@hoho-labs.com 확정 반영

- 근거: 2026-11-19 10:54 테스트 메일이 dongho****@gmail.com INBOX로 정상 수신돼 라우팅 확인됨 (똘마니 검수). hoholabs.com(하이픈 없음)은 타인 도메인이라 사용 금지, hoho-labs.com(하이픈 있음)이 정본.
- 수정: content/about.md:59 + content/privacy.md:41의 contact@placeholder.invalid → contact@hoho-labs.com, TODO 주석 2개 삭제. hello@hoho-labs.com 잔존 0건 (work/ 전수 grep).
- 검증: 빌드 산출물 public/about/index.html·public/privacy/index.html에 contact@hoho-labs.com 각 1건, placeholder.invalid 0건, TODO 0건. 게이트 placeholders 항목이 FAIL에서 PASS로 바뀜 (16-5 참조). 15-10의 "Contact 플레이스홀더 유지" 미결은 해결됨.

### 16-5. 빌드·게이트

- 빌드: hugo --minify --cleanDestinationDir 0 에러, EN 46 + KR 15 pages, static 238. JS 문법 node --check 통과 (추출본 /tmp/tourmap.js).
- 게이트 gate_phase2.py 원문:
```
FAIL  20 posts in public/blog  found 21
PASS  internal link 404 = 0  0 missing: []
PASS  image 404 = 0  0 missing: []
PASS  all img width/height  0 missing
PASS  placeholders 0  []
PASS  long dash 0  []
FAIL  disclosure 5 places consistent  plain/no-commission in ['lang-toggle.html']
PASS  Travelpayouts script in built index
PASS  Jeonju province active on home map  prov prov--active
PASS  Gyeonggi province active on home map  prov prov--active
FAIL  home map counts Jeonju 2 / Suwon 1
PASS  tour-summary on all 6 new posts
PASS  hubs jeonju/suwon no coming-soon
PASS  no raw shortcodes in built posts  []
GATES: FAILED: ['20 posts in public/blog', 'disclosure 5 places consistent', 'home map counts Jeonju 2 / Suwon 1']
```
- FAIL 3건은 1·2차와 동일한 노후 기대값·알려진 미결·오탐 (대전 추가로 21편이 정당한 증가 / lang-toggle.html Hugo 주석 오탐 / 홈 지도 카운트 문자열 노후, 실제 렌더 "Jeonju 2"+"Suwon 1" 정상). placeholders는 ④ 덕분에 PASS로 바뀜 (2차 때 4건 FAIL → 지금 3건).
- /kr 제휴·추적 grep 0건. 감사 grep (github·open an issue·commit·deploy·wrangler·BUILD_LOG, 대소문자 무시) public/ HTML 0건.
- 참고: Hugo --minify가 인라인 JS 지역 식별자를 바꿔서 빌드 산출물에서 separateBadges·MIN_SEP_PX 문자열 grep은 0건. 새 코드 적용 여부는 동작 검증(16-1·16-2 수치 변화 + CSS max-width:120px·버튼 block 스타일 빌드 확인)으로 증명함.

### 16-6. 회귀 spot-check - PASS

- 홈 390 스크롤 500px: 헤더 실측 92px, 지역바 top 92px, 지역바 링크 높이 36px 9개 균일, 홈 지도 라벨 겹침 0, pageerror 0.
- 대전 1440: 스티커 8개 중 anim 4개 표시·still 0개 (2중 렌더 0), 스티커 실측 96px 유지, map_note 1회.
- A~F 실측 유지 (헤더·지역바·map_note·홈 라벨·스티커). 타일 픽셀은 샌드박스 터널 차단으로 이번에도 못 봄 (회색 errorTile 폴백으로 표시됨, 레이아웃 검증에는 영향 없음).

### 16-7. 스크린샷 (captures-map-daejeon-2nd/, recheck2- 접두어)

- recheck2-map-daejeon-1440.png, recheck2-map-daejeon-390.png, recheck2-map-daejeon-390-tapped.png (탭 후 버튼 사라짐), recheck2-map-jeju_west-1440.png, recheck2-map-jeju_west-390.png, recheck2-map-sokcho-1440.png, recheck2-map-sokcho-390.png, recheck2-map-seoul_3day-390-final.png (기존 실패 케이스 최종 상태), recheck2-map-jeonju_1day-390-final.png (기존 실패 케이스 최종 상태), recheck2-sticky-500px-390.png, checks-recheck2.json, checks-recheck2-extra.json.
- 검증 스크립트: /tmp/pw_recheck2.py (12프로브 본검증), /tmp/pw_recheck2_extra.py (탭 기능 + 최종 상태), /tmp/pw_debug_labels.py (후보 지형 디버그, 일회성).

### 16-8. 타일 결정 후 남은 작업 (결정 오는 대로)

- 타일 설정은 지금 건드리지 않음. 결정안 3개 (A maxZoom 13 상한 / B EN도 OSM 복귀 / C Esri 위성+라벨 오버레이) 중 하나가 오면 tour-summary.html의 L.tileLayer 호출 1곳 + 캡션 문구(tour-summary__caption, EN/KR 분기)만 바꾸면 됨. 타일 URL·maxZoom·attribution은 그 호출 안에만 있음.
- 그 뒤 순서: hugo --minify --cleanDestinationDir 재빌드 → 게이트 + 16-1~16-4 동일 프로브 재실행 (타일 변경이 지도 줌·레이아웃에 영향 줄 수 있음) → 15-11과 같은 제외 규칙으로 zip 재생성 (public/·resources/·.git·NOTES_*.md·counter-captures/·work-backup-phase1/·.hugo_build.lock 제외, BUILD_LOG.md 16절 포함) → 부모가 드라이브 업로드 + 크기·MD5·파일수 보고 → 똘마니 실브라우저 전수 검수 → 통과 시 main 반영·Cloudflare 배포 (똘마니 몫).

### 16-9. 잔여 미결 (있는 그대로 기록)

- 타일 z14+ 회색 안내판 (치명): 결정 대기 중. 기본 화면 회색 3편 (서울 노포 z14, 전주 야시장 z15, 서울 시장 z15) + 확대 시 전부. 16-8 참조.
- ①② 검증 범위: 대표 6편(대전·제주서부·서울3일·속초·수원·전주1일) x 1440·390 전수. 나머지 15편은 같은 코드 경로(동일 partial)라 동작은 같지만 개별 프로브는 안 함. 똘마니 전수 검수에서 확인 필요.
- 배지 원판 겹침 (15-10 기록)은 ①로 해결됨: 대표 6편에서 배지 중심 최소 35.1px > 배지 지름 28px라 원판끼리도 안 겹침. 속초 마켓 랜드마크 7.1px 문제는 별개로 그대로 (랜드마크-배지 간격, 15-10 참조).
- seoul-40 vs seoul-15 중복 여부: 미결 (부모 판단 몫, 15-10 그대로).
- PUSH-RUNBOOK force-push 필요 + 사업자번호 불일치 (라이브 758-12-***** vs 기록 876-12-*****): 미결 (15-10 그대로).
- 파비콘 교체 예약 (로고 확정 대기), /kr 대표글 번역 11-20 12:00·JP/SP/CN 11-21 (별도 트랙), jeonju-night-06 q20 품질, Travelpayouts·Agoda 승인 미확인, name_ko 휴면, 나머지 15편 랜드마크 미확장: 15-10 그대로.

## 17. 지도 배지·타이틀 동호 님 확정 규격(A·B) 재구축 (2026-11-19, 마감 16:00)

16-1 separateBadges() 폐기 (동호 님 지적, 95-jeonju-cap13.png) 뒤 확정 규격 A·B로 다시 만듦. 타일 설정은 건드리지 않음 (Esri maxZoom 19·fitBounds 15·Esri URL 그대로). ②③④(라벨 회피·Tap 버튼·Contact)는 유지한다.

### 17-1. 확정 규격 A - 원형 번호 배지: 실제 동선 위에 100% 고정

- 배지를 경로 밖으로 분리하거나 점선으로 길게 빼지 않음. separateBadges()·배지용 점선 리더선·maybeRefit()·separateLandmarks() 전부 제거.
- 원형 배지 지름 22px (기존 28px), 숫자 11px/800 흰색, 흰 테두리 2px 유지 (static/css/style.css .tour-marker__badge).
- 커스텀 pane 고정 순서: 동선 400 (기본 overlayPane) < 랜드마크 610 < 타이틀 640 < 배지 660 < 팝업 700 (기본 popupPane). DOM 순서에 기대지 않음. 랜드마크 zIndexOffset 1000 (배지보다 위에 있던 상태) 제거.
- 단일 스탑의 원 중심은 꼭짓점과 픽셀 오차 0 (절대 좌표에서 떼지 않음). 같은 좌표로 겹치는 스탑만 한 원에 병기하거나 작은 클러스터 원으로 묶음 (아래 17-3 참조).

### 17-2. 확정 규격 B - 타이틀(스탑 이름): 겹칠 때만 선으로 빼기

- 타이틀은 배지 아이콘 안이 아니라 title pane(640)의 별도 마커 (layouts/partials/tour-summary.html, layoutTitles()).
- 여유가 있으면 원 바로 옆(2-4px)에 붙임. 다른 원·동선·다른 타이틀·랜드마크와 겹치면 타이틀 박스만 주변 빈 공간으로 밂 (원 중심 기준 8방위 x 간격 4/12/24px). 원 가장자리에서 타이틀 박스의 가장 가까운 변까지 얇은 리더선 (1px, 회색 #6B7280 70%, 원에서 2px 띄움)으로 이음. 리더선은 간격이 4px를 초과할 때만 그림.
- 타이틀 박스가 번호 원이나 다른 타이틀을 덮지 않음. 겹침 면적 0인 자리를 먼저, 없으면 최소인 자리를 고름 (배치 순서는 너비 내림차순). 리더선은 다른 배지나 다른 리더선을 가로지르지 않음 (리더선 검사는 원 기준: 배지는 원이라 네모 경계가 아니라 원 반지름+1px로 판정. 네모 기준으로 하면 배지 4의 네모 모서리만 스치는 리더선까지 막혀 인천 390의 깨끗한 슬롯이 거부되는 것을 recheck3에서 확인하고 고침).
- 좁은 구간은 타이틀을 짧은 약칭으로 줄임 (front matter `short` / `short_ko`, 16개 파일 39건 삽입). 예: `Jeonju Hanok Village Tourist Information` → `Hanok Village`, `Seongsimdang Daejeon Station Branch` → `Seongsimdang`, `성심당 대전역점` → `성심당`. 전체 이름은 팝업·툴팁·하단 번호 목록·map_note에서 유지. 약칭은 전체 이름으로 깨끗한 자리가 없을 때만 쓰고, 모바일에서 전체 이름이 120px 캡에 잘리면 맞는 약칭을 우선함.
- 대각선 배치 보정: 박스의 가장 가까운 점이 모서리라, 거리 R+gap으로는 모서리가 배지 네모 경계 안쪽에 0.4px 들어감 (recheck3에서 0.2-3px² 헤어라인 겹침 17건 원인). 대각선은 거리를 +3px 더 둬 모서리가 네모를 ~1.7px 비켜가게 함. 겹침 계산에는 장애물 1px 부풀림을 넣어 타이틀 아이콘의 1px 위쪽 렌더 오프셋을 흡수함.
- 동선은 얇은 장애물 (Liang-Barsky로 박스 안에 들어간 선분 길이 x 1px 가중치). 처음에는 선분 전체 길이를 가중치로 써서 모서리만 스치는 선분을 과대평가했고, 그 때문에 서울 지하철 390·제주 동부 390·인천 390에서 타이틀이 배지 위로 밀리는 것을 recheck3에서 확인하고 고침 (클립 길이가 정본).
- 화면 밖 배지(먼 출발점)의 타이틀은 지도 모서리에 고정하지 않음. 화면 밖이면 그대로 화면 밖에 두고 (사용자가 팬하면 그때 나타남), 화면 안 배지인데 자리가 없을 때만 기본 자리를 지도 안에 고정함. (처음에는 화면 밖 타이틀을 모서리에 고정했더니 속초 1440에서 "Seoul Expre..."가 어트리뷰션과 겹쳐 보임.)

### 17-3. 초기 화면: 먼 출발점 제외 + 줌 맞춤 + 클러스터링 (실측 근거 C)

- 먼 출발점은 fit에서 제외: 중앙값 중심에서 중앙값 거리의 5배 초과 AND 15km 초과인 스탑 (속초 서울, 전주 용산, 인천 서울역, 지하철 인천공항, 강릉 서울). 핵심 동선 스탑(대전 DCC·경주 불국사 등)은 2-5배·15km 이내라 남음. 제외된 스탑은 지도에 그대로 있고 (타임라인 + 팬/줌아웃으로 보임) 초기 화면에만 안 들어감.
- 줌 맞춤: fit 줌에서 스탑 간 최소 픽셀 간격이 22px 미만이면, 모든 fit 스탑이 화면 안에 들어가는 (12px 여유) 가장 높은 줌까지 올림 (fitBounds maxZoom 15 유지). 랜드마크는 fit에 넣지 않음 (넣으면 제주가 fit z12 → z10으로 악화됨).
- 그래도 22px 미만으로 겹치는 스탑은 연결 요소로 묶어 한 원에 `3·4`처럼 병기 (그룹 평균 좌표에 클러스터 알약 배지, 팝업에 묶인 스탑 전부 나열). 클러스터 배지에는 지도 위 타이틀을 달지 않음 (이름은 팝업 + 하단 목록).
- 원 간 최소 중심 간격 기준 22-26px (36px 아님). 배지 지름 22px라 22px이면 원이 맞닿는 수준.

### 17-4. 수정 파일

- layouts/partials/tour-summary.html: separateBadges()·maybeRefit()·layoutLabels()·separateLandmarks() 삭제. pane 생성 (landmark 610·title 640·badge 660), outlier 제외 + 줌 맞춤, 클러스터링 (연결 요소), layoutTitles() (8방위 x 간격 4/12/24, 겹침 0 우선·최소 차선, 리더선, 약칭, Liang-Barsky 동선 가중치, 대각선 +3px, 장애물 1px 부풀림, 화면 밖 타이틀 미고정). 타일 호출·fitBounds maxZoom 15·Tap 버튼·폴백·noscript은 그대로. 디버그 훅 `mapEl._tourDebug` (zoom·fitZoom·clusters·outliers·leaderCount·shortUsed·movedGap) 추가 (화면에 안 보임).
- static/css/style.css: 배지 28px → 22px, 숫자 14px → 11px, line-height 24px → 18px. 클러스터 알약 (.tour-marker__badge--cluster) 추가. 타이틀 아이콘 (.tour-title) 추가, 라벨은 그 안에서 static. 구 .tour-marker-wrap--label-left 규칙 삭제.
- content/blog/*.md 16개 파일: `short` / `short_ko` 39건 삽입 (스크립트 /tmp/add_shorts.py). 전주 야시장 한옥·겨울 DDP 스탑은 원래 name_ko가 없어 short_ko를 붙일 곳이 없음 (/kr에서는 기존처럼 영문 전체 이름 표시, 동작 변경 없음).

### 17-5. 빌드·게이트

- 빌드: hugo --minify --cleanDestinationDir 0 에러, EN 46 + KR 15 pages, static 238. (최종 빌드 시각 2026-11-19 15:50경.)
- 게이트 gate_phase2.py는 이번 작업에서 재실행하지 않음 (16-5와 동일 코드 경로·동일 FAIL 3건이 예상되며, 지도 JS만 바뀐 작업이라 게이트 대상 파일에 변경 없음). 대신 아래 17-6 전수 프로브로 지도 동작을 직접 검증함.
- /kr 제휴·추적 grep 0건 (recheck3 회귀). 타일 픽셀은 샌드박스 터널 차단으로 이번에도 못 봄 (회색 errorTile 폴백, 레이아웃 검증에는 영향 없음).

### 17-6. 검증 (Playwright, 로컬 서버로 public/ 서빙, 실제 Chromium) - 전수 21편 x 1440·390 = 42프로브

- 검증 스크립트: /tmp/pw_recheck3.py, 결과: captures-map-daejeon-2nd/checks-recheck3.json. 진단 스크립트: /tmp/pw_diag3.py (좌표 덤프), /tmp/pw_one.py (단건 재확인).
- ① 라벨↔원 겹침 0쌍 (42프로브 전부, 라벨-배지·라벨-라벨·라벨-랜드마크 전부 0). ② 원↔원 최소 중심 간격: 최솟값 22.1px (서울 야간 1440, 1·2번 "1·2" 클러스터와 4·5번 사이) - 22px 기준 이상 전부. ③ 리더선 사용 개수: 21편 x 2해상도 합계 17개 (디버그 카운트와 DOM의 weight-1 회색 path 개수 일치). ④ 스크린샷·zip은 아래 17-7·17-8 참조.
- 타깃 4편(5편) 실측:
  - 전주 야시장: 1440 z15·390 z15, 배지 5개 전부 22x22, 최소 47.3px, 리더선 390 1개 (3번 이동), 약칭 390 1번 (Hanok Village). 겹침 0.
  - 제주 서부: 1440 z12·390 z11, 클러스터 [1,2,5] 알약 42x22 ("1·2·5"), 나머지 3·4번 단일 배지. 최소 147.1px(390)·293.6px(1440). 다섯 개 전부 읽힘 (알약 + 하단 목록). 겹침 0.
  - 속초: 1440 z12·390 z11, 클러스터 [2,6] 알약 32x22, 출발점 1번(서울) 화면 밖 제외. 최소 22.2px(390)·42.4px(1440). 리더선 390 3개·1440 1개, 약칭 3·5번 (Seoraksan·Gwongeumseong). 겹침 0.
  - 대전: 1440 z13 (fit z12에서 상향), 배지 5개 전부 22x22, 최소 42.5px, 약칭 3번 (Soje-dong). 390 z12, 클러스터 [[1,3],[4,5]] 알약 32x22 2개 + 2번 단일, 최소 31.4px. 기존 결함이던 타이틀의 배지 1 덮음 23.5px·2·3번 침범 8.8·5.7px 전부 0. 겹침 0.
  - 서울 시장: 1440 z15·390 z14, 배지 3개, 최소 27.7px(390)·54.3px(1440). 기존 배지 1 덮음 23.5px → 0. 겹침 0.
- 전수 21편 클러스터·outlier·리더선 (1440 / 390): 부산2일 [5,6] / [[1,2],[5,6]], 부산국밥 [2,6] / [2,6], 대전 위 참조, 강릉 outlier [5], 경주야간 [2,3](390만), 경주1일 [[3,5],[4,6]] / [[3,4,5,6]], 인천 outlier [1], 제주3일 [1,2](390만), 제주동부 없음, 제주서부 [1,2,5] / [1,2,5], 전주야간 없음, 전주1일 [[4,5,6]] + outlier [1], 서울카페 [3,4](390만), 서울3일 없음, 서울시장 없음, 서울야간 [[1,2]] / [[1,2],[4,5]], 서울노포 없음, 서울지하철 outlier [1], 서울겨울 없음, 속초 [2,6] + outlier [1], 수원 없음.
- 화면 밖 배지 (설계상 제외, 결함 아님): 출발점 outlier만 해당 - 속초 1번(서울)·전주1일 1번(용산)·인천 1번(서울역)·서울지하철 1번(인천공항)·강릉 5번(서울). 전부 타임라인 + 팬/줌아웃으로 보임. 그 외 화면 밖 배지 0개.
- pageerror 0 (42프로브 전부).
- 시행착오 (recheck3 1차 → 수정 → 재검증): 1차에서 큰 겹침 3건 (서울 지하철 390 명동-배지2 61.5px² + 라벨끼리 84.3px², 제주 동부 390 성산일출봉-배지2 158.2px², 인천 390 차이나타운-자유공원 라벨끼리 60px²) + 헤어라인 0.2-3px² 17건. 원인 3가지: (a) 동선 가중치가 선분 전체 길이 (클립 길이로 교체, Liang-Barsky) (b) 대각선 모서리가 배지 네모 안쪽에 들어감 (대각선 거리 +3px) (c) 타이틀 1px 위쪽 렌더 오프셋 (장애물 1px 부풀림). 2차에서 인천 390 자유공원-배지4 42.7px² 1건 잔존: 리더선 검사가 네모 기준이라 배지 4의 원은 3.9px 비켜가는데 네모 모서리만 스쳐 깨끗한 슬롯을 거부한 것 → 리더선 검사를 원 기준으로 바꿈 (클러스터 알약은 네모 유지). 3차 전수 재검증에서 전부 0으로 복구. 화면 밖 타이틀 모서리 고정 문제 (속초 1440 "Seoul Expre..." 어트리뷰션 겹침)도 같은 라운드에 고침 (화면 밖 타이틀은 고정하지 않음).

### 17-7. 회귀 spot-check - PASS

- 홈 390 스크롤 500px: 헤더 실측 92px, 지역바 top 92px, 지역바 scrollWidth 768, pageerror 0.
- 대전 1440: 스티커 8개 중 anim 4개 표시·still 0개 (2중 렌더 0), 스티커 실측 96px 유지, map_note 1회.
- /kr 제휴 0건 (agoda·klook·viator·getyourguide·myrealtrip·booking.com 전부 0).

### 17-8. 스크린샷 (captures-map-daejeon-2nd/, recheck3- 접두어)

- recheck3-map-jeonju-night-market-cafes-1440.png, recheck3-map-jeonju-night-market-cafes-390.png, recheck3-map-jeju-west-aewol-oreum-cafes-1440.png, recheck3-map-jeju-west-aewol-oreum-cafes-390.png, recheck3-map-sokcho-seorak-one-night-from-seoul-1440.png, recheck3-map-sokcho-seorak-one-night-from-seoul-390.png, recheck3-map-daejeon-bread-pilgrimage-seongsimdang-dcc-1440.png, recheck3-map-daejeon-bread-pilgrimage-seongsimdang-dcc-390.png, recheck3-map-seoul-market-food-walk-1440.png, recheck3-map-seoul-market-food-walk-390.png, checks-recheck3.json.
- 육안 확인: 전주 야시장 390 (5개 배지·타이틀 전부 읽힘), 제주 서부 390 ("1·2·5" 알약 + 3·4번), 속초 390 (2·6 알약 + 3·4·5·7·8번, 리더선 3개가 배지를 안 가로지름), 대전 390 ("1·3"·"4·5" 알약 + 2번), 대전 1440 (5개 배지·전체 이름 타이틀, Soje-dong 약칭), 서울 시장 390 (3개 배지·타이틀), 속초 1440 (2·6 알약 + 나머지, 서울 출발점 화면 밖), 제주 서부 1440 ("1·2·5" 알약 + 3·4번). 타일은 샌드박스에서 못 봐 회색 배경으로 보이나 레이아웃 수치는 DOM 실측으로 확인함. 대전 1440 스크린샷에서 5번(DCC) 배지가 스티키 지역바 아래에 살짝 가려져 보이나, DOM 실측상 배지 중심은 지도 안에 있음 (스크린샷 촬영 시 스크롤 위치 아티팩트).

### 17-9. 수정본 zip (16:00 마감)

- zip: ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-map-specAB.zip - work/ 내용물을 사이트 루트로 (public/·resources/·.git·.hugo_build.lock·work-backup-phase1/·NOTES_*.md·counter-captures/ 제외) + 이 BUILD_LOG.md (17절 포함). 파일 363개, 압축 해제 크기 42,694,034B, 압축 크기 41,449,800B, MD5 808d593d20a71a85745d7521d9fbf40f. (zip 안에 들어 있는 BUILD_LOG.md는 재생성 직전 zip의 수치(41,449,720B, MD5 9d23003ebbdd218d30ce44d1681e88e3)를 적고 있음. 압축 크기·MD5는 zip 안에 적을 수 없는 값이라 이 문장 + 납품 보고의 최종 파일 기준 수치가 정본. 15-11과 동일 관례.) 제외 항목 확인: zip 목록에서 public/·resources/·.git/·NOTES_*.md·counter-captures/·.hugo_build.lock·work-backup-phase1/ 0건. (.gitignore·.github/workflows/deploy.yml은 포함돼도 되는 파일이라 유지. 15-11과 동일 규칙.)
- 스크린샷은 zip에 넣지 않고 captures-map-daejeon-2nd/ 폴더로 별도 전달 (checks-recheck3.json 포함).
- zip 재빌드 검증: /tmp/zipcheck-specAB에 zip을 풀어 plain `hugo --minify` 실행: 0 에러, EN 46 pages + KR 15 pages, static files 238. 빌드 산출물에서 확인: public/blog 21편 전부, public/vendor/leaflet/ 7파일, BUILD_LOG.md 17절 포함 확인, 대전 빌드 HTML에 tourBadgePane(새 코드) 포함 확인. Ttolmani 검수용: 압축 해제 후 plain `hugo --minify`로 빌드 (timeZone Asia/Seoul 적용으로 --buildFuture 불필요), 스크린샷 육안.

### 17-10. zip 재생성·재빌드 검증 (17-9 직후)

- BUILD_LOG 17-9·17-10 문구를 채운 뒤 zip을 재생성함 (최종 파일: 363개, 압축 해제 42,694,034B, 압축 41,449,800B, MD5 808d593d20a71a85745d7521d9fbf40f). 재생성한 zip을 /tmp/zipcheck-specAB에 풀어 plain `hugo --minify` 실행: 0 에러, EN 46 pages + KR 15 pages, static files 238, public/blog 22개 항목 (21편 + index). zip 안의 BUILD_LOG.md는 재생성 직전 zip의 수치를 적고 있음 (17-9 괄호 참조, 15-11 관례). 납품 보고의 수치가 정본.

### 17-11. 잔여 미결 (있는 그대로 기록, 고치지 않음)

- 타일 z14+ 회색 안내판 (치명): 결정 대기 중 (16-8·16-9 그대로). 타일 결정이 오면 L.tileLayer 1곳 + 캡션만 바꿔 재빌드·게이트·프로브·zip 재생성.
- 16-9의 나머지 미결 전부 그대로 (seoul-40 vs seoul-15 중복, PUSH-RUNBOOK force-push, 사업자번호 불일치, 파비콘 교체 예약, /kr 번역 별도 트랙, jeonju-night-06 q20, Travelpayouts·Agoda 승인 미확인, name_ko 휴면, 나머지 15편 랜드마크 미확장).
- 전주 야시장 한옥·겨울 DDP 스탑은 원래 name_ko가 없어 short_ko를 붙일 곳이 없음 (/kr에서는 기존처럼 영문 전체 이름 표시).
- 랜드마크는 fit에서 제외돼 초기 화면에 안 들어갈 수 있음 (제주 공항·한라산, 속초 낙산사 등). 의도된 트레이드오프 (배지 가독성 우선), 팬하면 보임. 랜드마크 툴팁은 팬 후 확인 필요 (이번 프로브는 초기 화면 기준).
- 클러스터링은 초기 화면 줌 기준 1회만 계산함. 사용자가 줌인하면 알약은 그대로 남고, 줌아웃하면 떨어진 배지가 겹칠 수 있음. 타이틀 레이아웃만 moveend마다 다시 계산함.

---

## 18. 영문 타일 Google 교체 + 경미 2건 (2026-11-19, 동호 님 직접 지시)

### 18-1. 배경 - 타일 선택 대기 종료

- 동호 님이 모바일 전주 스크린샷의 회색 빈 판을 보시고 "구글 지도를 쓰든 암튼 고배율에서도 백판 안 뜨게 수정하라"고 지시. 타일 선택 대기는 끝남.
- 교체 전 상태: 외국어 페이지 타일 Esri World Street Map, maxZoom 19, fitBounds 15. Esri는 한국 z14 이상 전부 2,521 B 회색 안내판("Map data not yet available")이라 배포 보류 상태였음. /kr은 OSM 한국어 타일 유지 (안 건드림).

### 18-2. 교체 - Google 영문 타일 (layouts/partials/tour-summary.html, L.tileLayer 1곳)

- 새 URL: `https://mt1.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}` (외국어 페이지 /en·/jp·/sp·/cn만, /kr은 기존 한국어 OSM 유지).
- maxZoom 19 유지 (Google z19 실측 정상), maxNativeZoom은 안 건드림.
- Attribution: 지도 어트리뷰션 `© Google`, 캡션 문구도 Google로 교체 ("Interactive map: Google Maps tiles (English place names), © Google."). 기존 Esri 캡션·주석 문구 전부 교체 (빌드 HTML에서 arcgisonline 0건 확인).
- 비공식 엔드포인트 리스크 + 폴백: mt1.google.com은 비공식이라 차단·약관 리스크가 있음. 타일 에러 4회 누적 시 Google 레이어를 제거하고 OSM 레이어(tile.openstreetmap.org, attribution © OpenStreetMap contributors)로 교체하는 폴백이 있음 (기존 errorTileUrl 회색 SVG 유지). 폴백이 뜬 뒤에는 다시 Google로 안 돌아감 (1회성). 폴백 레이어도 못 받으면 errorTileUrl 회색 타일만 남고 지도 컨테이너·배지·타이틀은 그대로 동작함.
- _tourDebug.tileFallback 스냅샷 문제 수정: layoutTitles() 시점의 스냅샷이라 폴백이 나중에 터져도 False로 남아 있었음 → tileerror 핸들러가 폴백을 켤 때 `mapEl._tourDebug.tileFallback = true`도 함께 갱신하게 수정.

### 18-3. 타일 실측 (curl, 2026-11-19, 똘마니 실측 + 재확인)

- Google (4지점 x z13-z19, 28개 타일 전부): HTTP 200, 5.2-38.7 KB 정상 이미지 (최소 5,229 B, 최대 38,674 B), 색상 수 36-209, 2,521 B 플레이스홀더 0건. z13·z15·z17 (전주·서울 시장·대전·속초) + z14·16·18·19 전부 정상.
- 영문 라벨 육안 확인: 전주 z15 타일에 GYEONGWON-DONG·Chungyeol-ro·Girin-daero 등 영문 지명 렌더 확인 (픽셀 밴드 분석: 흰색 도로면 + 회색·검정 텍스트 라인).
- 대조 (같은 지점 Esri World_Street_Map): z15·z17 전부 2,521 B 안내판 4/4, z13만 정상. Esri 교체 근거 확정.
- 샌드박스 터널은 외부 타일을 막음 (mt1.google.com 포함): 샌드박스 브라우저에서는 Google 타일이 안 와서 폴백이 터지고, OSM도 막혀 회색 errorTileUrl 배경으로 보임. 스크린샷의 회색 배경은 샌드박스 한계이고, 실제 브라우저 타일은 위 curl 수치로 검증함 (이 절에 명기).

### 18-4. 경미 2건

1) `.tour-marker__label`에 `display:inline-block` 추가 (assets/css/main.css): 기존 position:static inline span이라 모바일 max-width:120px + 말줄임 가드가 무시돼 실폭 최장 189.5px였음. 수정 후 390px에서 라벨 실폭 최대 120px 확인 (42프로브 max_label_w_390=120).
2) 배지 중심 14px 이내 랜드마크 겹침 시 랜드마크 생략 또는 20px 오프셋 (tour-summary.html layoutTitles() 앞단): 배지 중심에서 14px 이내 랜드마크가 있으면, 남는 공간 쪽으로 20px 오프셋하거나 둘 다 막히면 숨김. 속초에서만 적용됨 (양쪽 해상도 모두 landmark index 1 Sokcho Tourist & Fishery Market 오프셋 1개, 숨김 0개). 대전은 최종 레이아웃에서 14px 이내 랜드마크가 없어 적용 대상 없음 (규칙 자체는 동작 확인됨). 적용 후 42프로브에서 배지 중심 14px 이내 랜드마크 0개.

### 18-5. 회귀 - recheck4 1차에서 겹침 3건 발견 후 수정 (정직 기록)

- 1차 (inline-block 적용 직후): 라벨-배지 2건 (서울 3일 390 Bukchon Hanok Village-배지3 80.3px², Gwangjang Market-배지2 22.0px²) + 라벨-라벨 1건 (인천 390 Jayu Park-Fairy Tale Village 77.9px²). recheck3에서는 0건이었음. 원인: inline-block으로 라벨 높이 측정값이 패딩 포함 (~19px)으로 바뀌고, 120px 캡으로 너비 정렬 순서가 바뀌면서 탐욕 배치 순서가 달라짐.
- 수정 1 (약칭 추가, spec B "좁은 구간은 약칭으로 줄인다" 정본): Bukchon Hanok Village → short "Bukchon" / short_ko "북촌", Gwangjang Market → short "Gwangjang" / short_ko "광장시장", Fairy Tale Village → short "Fairy Tale" (front matter 3곳).
- 수정 1 적용 후: 서울 배지 겹침 2→1 (Gwangjang-배지2 4.5px²), 라벨끼리 1→2 (Bukchon-Gwangjang 54.4px²) — 인천은 그대로 77.9px². 약칭만으로는 부족했음.
- 수정 2 (후보 슬롯 확장): GAPS [4,12,24] → [4,12,24,36,48] (8방향 x 5간격, 리더선은 gap>4면 그림). 헤더 주석도 갱신.
- 수정 2 적용 후 집중 프로브 (인천·서울 3일, 양쪽 해상도): 전부 0건. 이후 전수 재검증으로 확정 (18-6).

### 18-6. 전수 재검증 - PASS (checks-recheck4.json, /tmp/pw_recheck4.py, 42프로브 = 21편 x 1440·390)

- 라벨-배지 겹침 0쌍, 라벨-라벨 겹침 0쌍, 라벨-랜드마크 겹침 0쌍.
- 배지 중심 14px 이내 랜드마크 0개, 원-원 최소 중심 간격 22.1px (서울 야간 1440, 4·5번).
- 리더선 27개 (recheck3 17개에서 증가 — 간격 36/48 확장으로 리더를 다는 배치가 늘어난 것, spec B 허용 범위. 리더선은 배지·다른 리더선을 가로지르지 않게 후보 검사함).
- tileFallback 42/42 fired (샌드박스에서 Google이 막혀 폴백이 전부 터짐 — 폴백 동작 자체의 증거. 어트리뷰션이 "© OpenStreetMap contributors"로 바뀐 것도 확인. 실제 브라우저에서는 Google이 오므로 폴백이 안 터짐).
- 랜드마크 오프셋 2건 (속초 양쪽 해상도), 숨김 0건, pageerror 0, 라벨 실폭 390 최대 120px.
- 타깃 10프로브 수치: 전주 47.3px (양쪽), 제주 서부 293.6/147.1px, 속초 42.4/22.2px, 대전 42.5/31.4px, 서울 시장 54.3/27.7px (1440/390 순).
- 빌드: `hugo --minify --cleanDestinationDir` 0 에러, EN 46 pages + KR 15 pages, static 238. 빌드 HTML 확인: mt1.google.com 21편 전부 포함, arcgisonline 0건, /kr 제휴 0건 (agoda·klook·viator·getyourguide·myrealtrip·booking.com 전부 0), 감사 grep (github·commit·deploy 등) 0건.
- 게이트 (gate_phase2.py): 알려진 FAIL 3건만 (1차·2차와 동일, 비회귀). "20 posts vs 21", "disclosure 5 places" (lang-toggle.html 휴고 주석 오탐), "home map counts Jeonju 2 / Suwon 1" (문자열 불일치, 실제 렌더는 Jeonju 2 + Suwon 1 확인됨). 그 외 전부 PASS (placeholders 0 포함).

### 18-7. 스크린샷 (captures-map-daejeon-2nd/, recheck4- 접두어)

- recheck4-map-jeonju-night-market-cafes-1440.png, recheck4-map-jeonju-night-market-cafes-390.png, recheck4-map-jeju-west-aewol-oreum-cafes-1440.png, recheck4-map-jeju-west-aewol-oreum-cafes-390.png, recheck4-map-sokcho-seorak-one-night-from-seoul-1440.png, recheck4-map-sokcho-seorak-one-night-from-seoul-390.png, recheck4-map-daejeon-bread-pilgrimage-seongsimdang-dcc-1440.png, recheck4-map-daejeon-bread-pilgrimage-seongsimdang-dcc-390.png, recheck4-map-seoul-market-food-walk-1440.png, recheck4-map-seoul-market-food-walk-390.png, checks-recheck4.json, recheck4-focus-seoul-essential-3-day-guide-390.png, recheck4-focus-incheon-day-trip-from-seoul-390.png (18-5 1차 겹침 실물 증거).
- 육안 확인: 전주 1440 (지도 영역 회색 = 샌드박스 타일 차단, DOM 실측으로 레이아웃 확인), 서울 3일 390 (1차 겹침: Bukchon Hanok V… 라벨이 배지 3 위에 겹침 — 수정 후 재검증에서 0건), 인천 390 (1차 겹침: Jayu Park·Fairy Tale Village 라벨 겹침 — 수정 후 재검증에서 0건). 샌드박스에서는 타일이 안 와 회색 배경으로 보이나, 실제 브라우저 타일은 18-3 curl 수치로 검증함.

### 18-8. 최종 zip

- zip: ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-map-final.zip - work/ 내용물을 사이트 루트로 (public/·resources/·.git/·NOTES_*.md·counter-captures/·work-backup-phase1/·.hugo_build.lock 제외, .gitignore·.github/workflows/deploy.yml 유지). 15-11·17절과 동일 제외 규칙. 파일 363개, 압축 해제 크기 42,708,211B, 압축 크기 41,453,923B, MD5 3a44e83b5404845c7bcbedf8c458c61c. (zip 안에 들어 있는 BUILD_LOG.md는 재생성 직전 zip의 수치를 적고 있음. 압축 크기·MD5는 zip 안에 적을 수 없는 값이라 이 문장 + 납품 보고의 최종 파일 기준 수치가 정본 — 15-11 관례.) 제외 항목 확인: zip 목록에서 public/·resources/·.git/·NOTES_*.md·counter-captures/·.hugo_build.lock·work-backup-phase1/ 0건. (.gitignore·.github/workflows/deploy.yml은 포함돼도 되는 파일이라 유지. 15-11과 동일 규칙.)
- 스크린샷은 zip에 넣지 않고 captures-map-daejeon-2nd/ 폴더로 별도 전달 (checks-recheck4.json 포함).
- zip 재빌드 검증: /tmp/zipcheck-mapfinal에 zip을 풀어 plain `hugo --minify` 실행: 0 에러, EN 46 pages + KR 15 pages, static files 238. 빌드 산출물에서 확인: public/blog 22개 항목 (21편 + index), 서울 3일 빌드 HTML에 mt1.google.com 포함·arcgisonline 0건, BUILD_LOG.md 18절 포함 확인. Ttolmani 검수용: 압축 해제 후 plain `hugo --minify`로 빌드 (timeZone Asia/Seoul 적용으로 --buildFuture 불필요), 스크린샷 육안.

### 18-9. 잔여 미결 (있는 그대로 기록, 고치지 않음)

- 17-11의 미결 전부 그대로 (seoul-40 vs seoul-15 중복, PUSH-RUNBOOK force-push, 사업자번호 불일치, 파비콘 교체 예약, /kr 번역 별도 트랙, jeonju-night-06 q20, Travelpayouts·Agoda 승인 미확인, name_ko 휴면, 나머지 15편 랜드마크 미확장).
- Google mt1 비공식 엔드포인트 리스크는 폴백으로 완화했으나 완전히 없앨 수는 없음. 공식 대안(Google Maps API 키)이 필요해지면 별도 결정.
- 리더선 27개는 recheck3 17개보다 많음 (간격 확장 때문). 리더선이 배지·다른 리더선을 가로지르지 않는 것은 후보 검사로 보장되나, 육안으로 리더선이 길어진 배치가 어색해 보이면 주인님·똘마니 검수에서 지적받을 수 있음.

## 19. 히어로 배너 긴급 재설계 (2026-11-19, 동호 님 라이브 지적 건)

- 착수 2026-11-19 16:47 KST, 지시: 슬랙 #일반 스레드 ts 1795074320.090859 (부모 1795031586.385169). 동호 님 지적 2건: 1) "배너가 코드 깨진 것처럼 이상하게 줄글로 보이고 안 예쁘다" 2) "배너사진을 모바일용·컴퓨터용으로 다르게 하고, 실제로 보면 글씨나 테두리가 잘려 나온다".
- 기반: map-final zip (18절) 위의 누적 수정. Google 타일 교체·배지 규격 specAB·경미 2건은 그대로 유지 (되돌림 없음).

### 19-1. 원인 (똘마니 라이브 8개 폭 실측, 스레드 전문)

- 원본 home-banner.webp 1600x533 (3.00:1) 한 장 + 고정 px 높이 (300/420/480) + object-fit:cover → 가로 잘림 1440/1280 25.6%, 1024 32.3%, 768 42.9%, 430 56.7%, 390 61.1%, 375 62.8%, 360 64.5%. 모바일은 원본 1600px 중 569~622px만 남고, 남은 중앙은 정보가 가장 없는 구간이라 배너가 빈 화면처럼 보임. 사진 안 표지판/글씨/플랭크가 양쪽에서 잘려 나감.
- 카드가 사진 하단 64~72px를 덮어 사진 하단 테두리가 안 보임 (테두리 잘림). 390x844 첫 화면 = 헤더 91.9px + 사진 236px(64px 덮임) + 흰 카드 450px (eyebrow 20 + h1 32px 3줄 + lede 16px 4줄 + 버튼 2줄) → "잘린 사진 + 10줄 텍스트"라 줄글로 읽힘.
- 폰트 리플로우: h1 52px이 1440px에서 로드 전 1줄(59.8px) → 로드 후 2줄(119.6px). 카드 높이 60px 점프.
- 캐시: CSS가 /css/style.css 무버전 + cache-control max-age=14400. 16:20 배포 직후 옛 CSS가 남아 옛 스타일로 보였을 가능성 (지적 1번 유력 원인).

### 19-2. 재설계 (레이아웃)

- "고정 px 높이 사진 + 겹치는 흰 카드" 폐지. `<picture>` + aspect-ratio 컨테이너로 재설계 (layouts/index.html, assets/css/style.css).
- <768px: 세로형 배너 (9:10) 위 + 텍스트 카드 아래 (겹침 없음, margin-top 12px). 768~1023px: 가로 배너 위 + 카드 아래 (사진이 짧아 오버레이가 비좁음). >=1024px: 사진 위 반투명 넓은 카드 오버레이 (2계층) — 사진 안전영역 안에만 배치 (left 10% / bottom 12% / width min(640px, 68%)).
- 사진 모서리 라운드는 4면 24px, 사진 자체에 온전히 보임 (카드가 사진 경계에 닿지 않음).
- 텍스트 예산: h1 최대 2줄 (데스크톱 42px, 태블릿 32px, 모바일 clamp(19px, 5.5vw, 22px), text-wrap:balance), lede 모바일 1줄 절기 / 그 위 2줄 절기 (-webkit-line-clamp), CTA 버튼 각 1줄 (모바일 세로 쌓기 14px, 데스크톱 가로 1줄).
- 컨테이너 비율 = 이미지 비율: 데스크톱 1920/820, 모바일 9/10. 크롭 5% 이하 (실측 0.03~0.16%, 19-6 표).

### 19-3. 이미지 분리 제작 (PC용/모바일용)

- 기존 home-banner.webp (1600x533, "Seoul / Korea" 글씨가 그림 안에 박혀 있음)는 폐기·삭제. 같은 플랫 벡터 분위기로 새로 생성 (미디어 이미지 생성, 2026-11-19). 그림 안에는 글씨·로고·테두리·플랭크 일절 없음 (순수 풍경, 텍스트는 HTML 오버레이로만).
- 데스크톱: 생성 2352x992 → 중앙 크롭 2323x992 (1920:820 정확 비율, 좌우 15px씩만 잘림) → 1x 1920x820 (49,016B), 2x 2560x1093 (68,928B, Lanczos). 왼쪽 2/3은 빈 크림색 하늘 (타이틀 안전영역), 오른쪽에 N서울타워·궁궐 지붕·한강 유람선.
- 모바일: 생성 1440x1600 (정확 9:10) → 1x 1080x1200 (72,528B), 2x 2160x2400 (145,860B, 플랫 벡터라 Lanczos 1.5x 업스케일도 디테일 손실 없음). 위에서 아래로 타워·궁궐·강+유람선, 중앙 정렬.
- 마크업: `<picture>` — media="(max-width: 767px)" 모바일 srcset 1x/2x, media="(min-width: 768px)" 데스크톱 srcset 1x/2x, img width=1920 height=820, loading=eager, fetchpriority=high. 파일: static/images/banner/home-banner-desktop[.webp|@2x.webp], home-banner-mobile[.webp|@2x.webp]. 구 home-banner.webp 참조 0건 (grep 확인), CREDITS.md 4행으로 교체, data/photo-dims.yaml에 desktop/mobile 2건 추가 (구 home-banner 항목은 설명과 함께 교체).

### 19-4. 안전영역·겹침·리플로우·캐시

- 안전영역: 데스크톱 좌우 10%·상하 12%, 모바일 좌우 8%·상하 10% 안에만 글씨·로고·테두리·플랭크 배치. 실측 (19-6): 오버레이 카드 위치 L 10% / T 13.5~20.2% / R 24.4~30.3% / B 12% (1024px에서 상단 13.5%로 가장 빡빡하나 12% 기준 통과), 카드가 사진 안에 완전히 들어감 (overlayInsidePhoto True).
- 겹침 제거: 카드가 사진 테두리를 덮던 margin:-64px 구조 폐지. >=1024px 오버레이 카드도 사진 경계에서 10~12% 안쪽에 떠 있음.
- 폰트 리플로우 제거: 홈 전용 preload 3건 (baseof.html, .IsHome 한정) — 데스크톱/모바일 히어로 이미지 imagesrcset preload (media 분기 포함) + Inter CSS preload as=style. h1 사이즈를 폴백·Inter 양쪽에서 2줄이 안정되게 잡음 (19-6 slack +32.6~+95.5%). 구 52px → 42px (데스크톱 오버레이).
- Fingerprint + no-cache: static/css/style.css → assets/css/style.css로 이동, baseof에서 `resources.Get "css/style.css" | minify | fingerprint` (기존 js/home-map.js와 같은 파이프라인). 빌드 산출물: /css/style.min.a04b177e814503301aab38bd70138d9bc59c04af3c92ba4c9b7bfc6dca69d330.css (integrity 포함). 모든 페이지가 이 URL을 씀 (grep: 무버전 style.css 참조 0건).
- static/_headers 신설 (Cloudflare Pages, public/_headers로 복사됨): /css/*·/js/* → public, max-age=31536000, immutable (둘 다 fingerprint라 안전), /* → no-cache (HTML은 항상 재검증, 배포 직후 옛 스타일이 물리는 구조 자체를 제거). 규칙은 first-match-wins라 전용 규칙을 먼저 둠.

### 19-5. 검수 중 발견한 치명 결함 1건 (스크린샷이 잡음, 수정 완료)

- 1차 검증 수치(크롭·잘림·h1 줄 수)는 전부 통과했으나 390px 스크린샷 육안에서 모바일 카드가 아예 안 보이는 것을 발견. 원인: aspect-ratio + overflow:hidden + border-radius를 figure(.hero-photo)에 직접 건 탓에, figure 높이가 사진 비율(350x388.9)로 고정되고 그 아래 정상 흐름으로 있던 카드가 figure 밖으로 넘쳐 overflow:hidden에 잘려 invisible이 됨. 수치만으로는 안 잡히는 결함 (카드의 getBoundingClientRect·줄 수는 잘려도 측정됨).
- 수정: aspect-ratio + overflow:hidden + border-radius를 <picture>으로 이동 (figure는 위치 기준 + 카드 포함 컨테이너로만). 재검증에서 overlayVisible True 전 폭, heroH = 사진 + 12 + 카드 (390px: 676.1 = 388.9+12+275.2) 확인. 이 결함·원인·수정은 CSS 주석에도 남김.

### 19-6. 자체 검수 - Playwright 8개 폭 (checks-hero.json, /tmp/pw_hero.py)

- 방법: work/public을 로컬 http.server(8123)로 띄워 Chromium 실측. 크롭% = cover 스케일에서 보이는 면적 비율로 계산. 잘림 = 히어로 안 텍스트 5요소(eyebrow·h1·lede·CTA 2개) scrollWidth <= clientWidth. h1 줄 수 = offsetHeight/lineHeight (버튼은 패딩 제외). 폰트 차단 대조는 --disable-remote-fonts 런.
- 8개 폭 수치 (EN 홈, 최종):

| 폭 | 배너 크롭% | 텍스트 잘림 | h1 줄 수 (일반/폰트차단) | h1 2줄 여유% | 오버레이 안전영역 L/T/R/B% | 모바일 총 줄 수 |
|---|---|---|---|---|---|---|
| 1440 | 0.04 | 0 | 2 / 2 | +32.6 | 10/20.2/30.3/12 | - (오버레이) |
| 1280 | 0.04 | 0 | 2 / 2 | +32.6 | 10/20.2/30.3/12 | - |
| 1024 | 0.04 | 0 | 2 / 2 | +32.6 | 10/13.5/24.4/12 | - |
| 768 | 0.16 | 0 | 2 / 2 | +95.5 | - (카드 분리) | - |
| 430 | 0.08 | 0 | 2 / 2 | +54.8 | - | 6 |
| 390 | 0.03 | 0 | 2 / 2 | +41.1 | - | 6 |
| 375 | 0.06 | 0 | 2 / 2 | +39.7 | - | 6 |
| 360 | 0.12 | 0 | 2 / 2 | +38.2 | - | 6 |

- KR 스팟체크: 1440 크롭 0.04%·잘림 0·h1 2줄·여유 +47.3%·안전영역 동일, 390 크롭 0.03%·잘림 0·h1 2줄·여유 +56.0%·모바일 6줄.
- 모바일 6줄 내역: eyebrow 1 + h1 2 + lede 1(절기) + CTA 1+1 (세로 쌓기). 구 10줄(390px)에서 6줄로.
- 크롭이 정확히 0이 아닌 이유: 2x 파일 2560x1093의 비율(2.3421)이 컨테이너 1920/820(2.3415)과 0.03% 어긋나고, 소수점 px 반올림이 더해짐. 최대 0.16% (768px) — 기준 5% 대비 무시 가능.
- 사진 선택 확인: 768px 이상은 home-banner-desktop.webp 1920x820, 767px 이하는 home-banner-mobile.webp 1080x1200이 currentSrc로 잡힘.
- 폰트 리플로우 대조 (정직 기록): 샌드박스 Chromium은 fonts.gstatic.com에 닿지 않아 document.fonts가 비어 있음 — 즉 본 검증의 "일반" 런도 폴백 폰트 렌더링이다. 그래서 실제 Inter 렌더링은 별도 프로브로 확인: Google이 서빙하는 Inter 800 latin woff2를 curl로 받아 페이지에 FontFace로 직접 로드한 뒤 측정 → EN 8개 폭 전부 h1 2줄, 여유 +35.0%(1440)~+41.2%(360), KR 1440 +50.4%·390 +58.4%. 폴백(448px @390)과 Inter(442px @390)의 h1 nowrap 폭이 1.4%밖에 안 벌어져 로드 전후 줄 수가 바뀔 여지가 없음. 구 52px 1→2줄 점프는 재현되지 않음.
- 스크린샷 8장 (captures-hero-1119/): hero-en-1440/1280/1024/768/430/390/375/360.png + hero-kr-1440/390.png + checks-hero.json. 육안: 1440·1024 오버레이 카드가 사진 안에 떠 있고 타워·궁궐·유람선이 오른쪽에 보임, 사진 4면 라운드 전부 보임. 390·360 세로 배너 + 아래 카드 (eyebrow·h1 2줄·lede 1줄 말줄임·CTA 2개 1줄씩). 768 가로 배너 + 아래 카드 (lede 2줄, CTA 가로 1줄씩).

### 19-7. 회귀 - map-final 게이트 재실행 (gate_phase2.py)

- 결과: 알려진 FAIL 3건만 (18-6과 동일, 비회귀 — "20 posts vs 21", "disclosure 5 places" lang-toggle.html 오탐, "home map counts Jeonju 2 / Suwon 1" 문자열 불일치). 그 외 전부 PASS (internal link 404 0, image 404 0, all img width/height 0 missing, placeholders 0, long dash 0, tour-summary 6편, hubs coming-soon 없음).
- 추가 확인: Travelpayouts 스크립트(emrld.ltd/NTk5NzYz.js?t=599763) EN 홈에 1건·/kr 0건 (그대로 유지, 손대지 않음). 서울 가이드에 mt1.google.com 포함. /kr 제휴 0건. 빌드: `hugo --minify --cleanDestinationDir` 0 에러, EN 46 pages + KR 15 pages, static 241 (map-final 238에서 -home-banner.webp -static CSS +배너 4개 +_headers = 241).

### 19-8. 최종 zip

- zip: ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-hero.zip - work/ 내용물을 사이트 루트로 (public/·resources/·.git/·NOTES_*.md·counter-captures/·work-backup-phase1/·.hugo_build.lock 제외, .gitignore·.github/workflows/deploy.yml 유지). 15-11·18절과 동일 제외 규칙. 파일 367개 (unzip -l 기준, 디렉터리 항목 포함 — 18절과 같은 기준), 압축 해제 크기 42,991,212B. (zip 안에 들어 있는 BUILD_LOG.md는 재생성 직전 zip의 수치를 적고 있음. 압축 크기·MD5는 zip 안에 적을 수 없는 값이라 이 문장 + 납품 보고의 최종 파일 기준 수치가 정본 — 15-11·18절 관례.)
- 스크린샷은 zip에 넣지 않고 captures-hero-1119/ 폴더로 별도 전달 (checks-hero.json 포함).
- zip 재빌드 검증: /tmp/zipcheck-hero에 zip을 풀어 plain `hugo --minify` 실행: 0 에러, EN 46 pages + KR 15 pages, static files 241. 빌드 산출물에서 확인: index.html에 picture + home-banner-desktop/mobile 포함, fingerprinted CSS 링크 포함, public/_headers 존재, Travelpayouts EN 1건·KR 0건, mt1.google.com 포함.

### 19-9. 잔여 미결 (있는 그대로 기록, 고치지 않음)

- 18-9의 미결 전부 그대로.
- 1~8항 중 이번 차수에 못 넣은 항목: 없음. 8항 전부 반영 (이미지·레이아웃·안전영역·겹침 제거·리플로우·fingerprint+no-cache·8폭 검수·개인정보 없음).
- 주의: _headers의 /* no-cache는 Cloudflare Pages 배포 후 실제 헤더로 확인이 필요함 (샌드박스 로컬 서버에서는 검증 불가). fingerprint CSS라 HTML이 잠깐 캐시돼도 새 해시가 나가면 옛 스타일은 안 물림.
- 모바일 lede 1줄 절기는 스펙(1~2줄) 안이지만, lede 전문이 카드에 안 보이는 것이 아쉽다면 차수에 lede 2줄 + CTA 1개만 노출 같은 대안을 검토할 것 (이번 차수는 6줄 예산을 우선함).

## 20. 모션 업그레이드 (2026-11-19 19:48-21:30, 똘마니 오더·동호 님 지시)

### 20-1. 오더·기준·레퍼런스

- 오더: 2026-11-19 19:48 똘마니 새 오더 (동호 님 지시, 오늘 밤 최신 웹디자인·모션 레퍼런스 8선 X 게시물 기반). 대상은 새 기능이 아니라 첫 화면 히어로 + 도시·가이드 카드의 모션·타이포·여백의 결. 추가 과금 0원: 순수 CSS (+ 필요하면 무료 경량 JS 한두 개)만. 유료 라이브러리·외부 SaaS 금지. WebGL·Three.js·무거운 라이브러리 금지.
- 기준: 라이브 커밋 99d5009 (= hohotour-revamp-1119-hero.zip 반영본). 그 위에 얹어 ZIP 하나로 납품.
- ACK: 착수 19:48, 패턴 목록 (히어로 로드인 스태거 / 카드 3D 틸트+커서 하이라이트 / 지역 칩 리프트 / 스크롤 리빌 / 전역 토큰 통일), 예상 완료 21:30 전후.
- 레퍼런스 출처 (정직 기록): 오더에 적힌 원문 X 게시물 링크는 부모가 저장한 슬랙 스레드 전체 JSON (/tmp/jarvis-tool-output-hklgjw.json)에서 찾지 못했음 - grep 결과 x.com URL·status ID 0건 ("60fps" 4건, "godly" 1건, "land-book" 2건, "motionsites" 2건, "recent.design" 1건만). 그래서 X 원문이 아니라 아래 4개 사이트를 browser.open으로 직접 열어 결만 뽑았음. 통째로 베끼지 않았음.
  - 60fps.design (모션 종류별 정리, 카드·스크롤·전환 파트만): 카드 팝 (Plasma Card Setup, Revolut Card Ready, CRED Ticket Pop), 스플래시 인트로, 가치 제안 텍스트 플립/캐러셀, 탭 스크롤 인터랙션. 여기서 가져온 결: 카드 호버의 "팝"을 과하지 않은 3도 틸트 + 그림자 승강으로 축소 적용, 텍스트 플립은 히어로 로드인 스태거의 stagger 리듬(40-80ms)으로만 차용.
  - recent.design (godly.website 리다이렉트 목적지, "The best design inspiration on the Internet" 큐레이션): 가져온 결은 타이포 스케일·여백 대비 - 큰 제목과 넉넉한 숨통이 첫 화면의 인상을 결정한다는 점. 섹션 h2 2-4px 상향 + 섹션 간격 8px씩 벌림으로 반영.
  - land-book.com (랜딩 페이지 디자인 갤러리): 가져온 결은 카드 그리드의 균일한 리듬과 호버 상태의 일관성. 카드 전환 이징·duration을 전역 토큰으로 통일한 근거.
  - motionsites.ai ("Fresh Drops Everyday", 모션 중심 랜딩 페이지 프롬프트 서비스): 가져온 결은 스크롤 리빌의 절제 - transform/opacity만으로 살짝 떠오르게, 1회만 발동, stagger로 순서를 주는 방식.
- 뽑아낸 결 4가지 (오더 그대로): ① 타이포 스케일·여백 대비 ② 스크롤 리빌 (IntersectionObserver + transform/opacity만, stagger 40-80ms) ③ 카드 호버 입체감 (3D 틸트 최대 3-5도, 그림자·글로우 승강, 커서 추적 하이라이트) ④ 60fps 매끈한 전환 (easing·duration 통일, cubic-bezier(.22,.61,.36,1), 180-320ms).

### 20-2. 구현

- 전역 토큰 (assets/css/style.css): --dur-fast 180ms / --dur-med 240ms / --dur-slow 320ms, --ease-out과 --ease-standard 모두 cubic-bezier(.22,.61,.36,1)로 통일. (기존 150/250ms, ease (.22,1,.36,1)에서 교체.) CSS minified 24,877B → 27,688B (+2,811B).
- 히어로 로드인 (순수 CSS, JS 불필요): keyframes hero-rise (translateY 12px + opacity, 320ms) - eyebrow 0ms → h1 60ms → lede 120ms → CTA 180ms stagger. hero-zoom (scale 1.02 → 1.0, 640ms) 이미지 subtle scale-in. reduced-motion에서는 animation:none으로 즉시 표시.
- 도시·가이드 카드 (.cards .card): hover 3D 틸트 최대 3도 + translateY(-4px) + 그림자 승강, .cards에 perspective:1200px. ::after radial 하이라이트 (240px circle at var(--mx)/var(--my), rgba(240,86,58,.09), hover 시 opacity 1). 썸네일 scale 1.03-1.04 유지. 전환 --dur-med 통일 이징.
- 지역 칩 (.chip-row .chip) + .map-chip + .term-index li + .related-card a: hover lift (translateY(-2px)) + 색상 전환, transition에 transform/box-shadow 추가. 버튼 (.btn): transition 추가 + hover translateY(-1px).
- 스크롤 리빌 (신규 assets/js/motion.js, 바닐라 ~3.6KB, 사이트 전역 fingerprint + defer): ① html에 js 클래스 추가 (html.js.reveal만 숨김 - no-JS에서는 전부 보이는 안전 설계), ② IntersectionObserver (threshold 0.15, rootMargin 하단 -8%, 1회 발동 후 unobserve, 부모 그룹별 index×60ms stagger, 최대 300ms), reduced-motion 또는 IO 미지원 시 즉시 표시. ③ 카드 틸트 + 커서 하이라이트 (fine-pointer + reduced-motion 아님일 때만, rAF 스로틀 pointermove, rotateX/rotateY 최대 ±3도 + translateY(-4px), --mx/--my %, pointerenter 시 will-change:transform + transition 120ms, pointerleave 시 인라인 transform/transition/will-change 전부 초기화).
- 타이포·여백 대비: .latest h2 26→30px, .browse h2 19→20px, .trust h2 24→26px, .home-map__intro h2 22→24px, .card a.title 19→20px (+keep-all). .hero margin-bottom 40→48px, .browse 48→56px, .home-map 40→48px, .latest padding-top 8→16px, .trust padding-top 56→64px.
- 경미 2건 (이번 턴에 함께 반영):
  - ① /kr/ 히어로 h1 keep-all: body + h1/h2/h3에 word-break:keep-all, body에 overflow-wrap:break-word (긴 영문 URL 같은 안전망). 사이트 전역 h1·본문 적용 결론: h1/h2/h3 + body 전체에 적용했음. 한글은 단어 경계에서만 끊기고, 영문은 단어 단위 줄바꿈이 기본이라 keep-all이 영문 가독성을 해치지 않음 (긴 단어·URL은 overflow-wrap:break-word가 받침). 20-5에서 실측 검증.
  - ② 640-767px 세로 배너 높이 상한: 브레이크포인트를 768→640으로 이동 (picture media (max-width:639px)/(min-width:640px), hero preload media도 동일 이동). 640-767 밴드가 9:10 세로 배너를 써서 사진 667-799px로 카드를 접힌 아래로 밀었던 것이 원인. 640부터 가로 배너를 쓰면 사진 ~256-307px로 카드 상단이 첫 화면에 들어오고 크롭은 0% 유지. 잔여 사례: 600-639 구간은 여전히 세로 배너 (~622-665px)라 카드가 접힌 아래에서 시작할 수 있음 - 이번 턴에서는 손대지 않음 (20-10 참조).
- 템플릿: baseof.html (motion.js 전역 포함 + preload media 640/639), index.html (picture media 640/639 + data-reveal: browse h2 2개, latest h2 + intro, trust.box), guide-card.html (li.card에 data-reveal), home-map.html (section.home-map에 data-reveal), tour-summary.html (section.tour-summary에 data-reveal). 리빌 타겟 총 27개 (h2 2 + latest h2/intro 2 + trust 1 + home-map 1 + 카드 21).
- 접근성·터치: prefers-reduced-motion 블록에 .reveal{opacity:1!important;transform:none!important} 추가 (기존 *{transition:none!important;animation:none!important} 유지). @media(hover:none): hover lift/글로우 무효화 + press 스케일만 (.card:active .98, .chip:active .97, .btn:active .98, .map-chip:active .97).

### 20-3. 기준선 측정 (수정 전, 라이브/히어로 zip 기준)

- 빌드: plain `hugo --minify` 0 에러, Pages EN 46 + KR 15, static 241.
- Lighthouse 모바일 전 (로컬 http.server 8123, Lighthouse 13.6.0 via npx, CHROME_PATH 환경 변수 필요 - --chrome-path 플래그는 Lighthouse 13에서 거부됨, 첫 시도 실패 후 환경 변수로 재실행 성공): Performance 0.84, LCP 3.6초, CLS 0, FCP 1.1초, TBT 290ms, Speed Index 2.4초, Interactive 3.7초. (/tmp/lh-before.json)
- Playwright 기준선 프로브 (/tmp/pw_motion_baseline.py, /tmp/checks-motion-baseline.json, 뷰포트 높이 844px): 크롭 0% 전 폭. EN h1 2줄 (1440/1280/1024: 101px, 768: 77px, 430/390/375/360: 48-53px), 640·700에서는 1줄 (26px). 사진 높이: 640→667px·700→724px (똘마니 실측 733px과 9px 차이, 패딩·스크롤바 차이로 추정), 640에서 카드 상단 820px로 간신히 보임 (-24px), 700에서 카드 상단 851px로 접힌 아래 7px (문제 확인됨). KR h1: 1440 2줄 101px (range rects로 "사람이 알 / 려주는" 단어 중간 끊김 확인), 390 2줄 51px ("사람이 알려 / 주는" 확인). CLS 0 (1024만 0.0012). 잘림 0, 가로 넘침 없음.
- KR heroTitle 원문 (i18n/kr.toml): "서울에 사는 사람이 알려주는 <span class=\"hl-coral\">서울 여행</span> 가이드". EN heroTitle (i18n/en.toml): "Seoul, <span class=\"hl-coral\">explained</span> by <span class=\"hl-sky\">someone who lives there.</span>"

### 20-4. 자체 검수 - Playwright 8개 폭 + 밴드 (수정 후, /tmp/pw_motion_after.py, /tmp/checks-motion-after.json)

| 폭 | 크롭% | EN h1 | 사진 높이 | 카드 상단 | CLS | 잘림 | 가로 넘침 | 배너 |
| 1440 | 0 | 2줄 101px | 458px | 보임 | 0 | 0 | 없음 | desktop |
| 1280 | 0 | 2줄 101px | 458px | 보임 | 0 | 0 | 없음 | desktop |
| 1024 | 0 | 2줄 101px | 417px | 보임 | 0.0009 | 0 | 없음 | desktop |
| 768 | 0 | 2줄 77px | 308px | 보임 | 0 | 0 | 없음 | desktop |
| 767 | 0 | 2줄 77px | 307px | 보임 (434px) | 0 | 0 | 없음 | desktop |
| 744 | 0 | 2줄 77px | 297px | 보임 (424px) | 0 | 0 | 없음 | desktop |
| 700 | 0 | 2줄 77px | 278px | 보임 (405px) | 0 | 0 | 없음 | desktop |
| 640 | 0 | 2줄 77px | 256px | 보임 (410px) | 0 | 0 | 없음 | desktop |
| 430 | 0 | 2줄 48-53px | 433px | 보임 | 0 | 0 | 없음 | mobile |
| 390 | 0 | 2줄 51px | 389px | 보임 | 0 | 0 | 없음 | mobile |
| 375 | 0 | 2줄 48-53px | 372px | 보임 | 0 | 0 | 없음 | mobile |
| 360 | 0 | 2줄 48-53px | 356px | 보임 | 0 | 0 | 없음 | mobile |

- 640-767 밴드 수정 확인: 사진 256-307px (수정 전 667-799px), 카드 상단 405-434px로 첫 화면에 충분히 들어옴. 크롭 0% 전 폭. (700 밴드 스크린샷 motion-en-700-band.png 육안 확인: 가로 배너 + 카드 전부 첫 화면.)
- EN h1: 전 폭 2줄 유지. 640-767 밴드는 32px 태블릿 h1로 2줄 (수정 전 1줄 26px에서 변경됨 - 브레이크포인트 이동의 의도된 변화, 2줄 예산 안).
- CLS: 0 전 폭 (1024만 0.0009, 기준선 0.0012와 동등 수준). 잘림 0, 가로 넘침 없음, 크롭 0% 전 폭.
- heroAnim 실측: eyebrow 0s / h1 60ms / lede 120ms / CTA 180ms delay, hero-rise 320ms; 이미지 hero-zoom 640ms. motion.js 로딩 확인 (motion.min.*.js fingerprint, 58개 페이지에 포함).

### 20-5. 경미 2건 검증 (문자 단위 프로브까지)

- ① KR h1 keep-all: 1440 2줄 101px 유지, 390 2줄 51px 유지 (똘마니 검증 높이 100.8px/51.5px와 일치). 문자 단위 range rects 프로브 (/tmp/pw_motion_recheck.py, 각 글자의 rect top을 직접 측정): 1440·390 둘 다 "서울에 사는 사람이 / 알려주는 서울 여행 가이드"로 단어 경계에서 끊김 확인. 똘마니가 검증한 기대 끊김과 정확히 일치.
- ② 640-767 밴드: 위 20-4 표 참조. 수정 전 (640: 667px·카드 820px, 700: 724px·카드 851px 접힌 아래) → 수정 후 (640: 256px·카드 410px, 700: 278px·카드 405px). 카드 상단이 첫 화면에 405-434px 여유로 들어옴.

### 20-6. 모션 동작 검증 (리빌·틸트·reduced-motion·터치)

- 리빌: 전체 타겟 27개. 중간 실패 1건 (정직 기록): 첫 after-probe의 400px 단위 빠른 스텝 스크롤에서 좁은 폭 18-22/27만 발동됨. 원인은 사이트 버그가 아니라 프로브 아티팩트 - html{scroll-behavior:smooth} 때문에 window.scrollTo가 스무스 애니메이션으로 밀려 페이지 하단에 도달하기 전에 프로브가 끝나버림 (페이지가 긴 좁은 폭일수록 심해짐). behavior:'instant'로 재검증 → 390/640/1440 전부 27/27 발동 확인. 실제 사용자가 스크롤하면 전부 발동함.
- 틸트: 중간 실패 1건 (정직 기록): 첫 after-probe에서 첫 번째 .card에 mouse.move 후 인라인 transform·--mx/--my·willChange 전부 빈 값. 원인은 motion.js 미동작이 아니라 프로브 오류 - 첫 번째 카드가 접힌 아래에 있어 Playwright mouse.move 좌표가 뷰포트 밖이었고, mouse.move는 스크롤을 안 해서 pointermove가 카드에 닿지 않음 (reveal은 동작하므로 스크립트 로딩 자체는 정상이었음). scroll_into_view_if_needed() 후 재검증 → 좌상단 호버: perspective(900px) rotateX(1.8deg) rotateY(-1.8deg) translateY(-4px), --mx 20.0% --my 20.0%, will-change:transform. 우하단 호버: rotateX(-2.16deg) rotateY(2.1deg), --mx 85.0%. 최대 회전 2.16도 (< 3도). pointerleave 후 인라인 transform·will-change 전부 초기화 확인. 호버 스크린샷 motion-hover-card-1280.png 육안 확인: 첫 카드만 기울어져 떠 있고 나머지는 평평함.
- reduced-motion: heroAnim none, hero opacity 1, reveal opacity 1·transform none, revealVisible 27/27 즉시 표시. PASS.
- 터치: finePointer false, 인라인 transform 없음 (틸트 미동작 확인). PASS.

### 20-7. 성능 - Lighthouse 모바일 전후 (정직 기록, 교차 검증 포함)

- 방법: 로컬 http.server (전: 8123 히어로 빌드 / 후: 8123 모션 빌드), Lighthouse 13.6.0 via npx, 모바일, CHROME_PATH 환경 변수. 전 1회 + 후 3회 + 전 2회 + 교차 A/B 4회 = 총 10회.
- 전 (히어로 zip, 5회): Performance 0.84 / 0.88 / 0.88 / 0.91 / 0.89, LCP 3.6 / 3.5 / 3.5 / 3.5 / 3.7초, CLS 0 전부, TBT 290 / 190 / 190ms.
- 후 (모션, 5회): Performance 0.86 / 0.88 / 0.88 / 0.87 / 0.88, LCP 3.7 / 3.7 / 3.7 / 3.8 / 3.5초, CLS 0 전부, TBT 220ms.
- 결론: LCP 범위 겹침 (전 3.5-3.7초, 후 3.5-3.8초). 교차 A/B 4회 (전 3.5 → 후 3.8 → 전 3.7 → 후 3.5)가 번갈아 나와 체계적 차이 없음 - 앞 3회만 보면 후가 0.1-0.2초 느려 보였으나 런 순서 노이즈였음. 무스로틀 직접 측정 (PerformanceObserver, LCP 요소 = IMG home-banner-mobile.webp): 전 776/752ms, 후 828/704ms (평균 764 vs 766ms, 사실상 동일). Performance 점수 전 0.84-0.91 → 후 0.86-0.88, CLS 0 유지. 성능 예산 ("홈 LCP를 지금보다 나쁘게 만들지 말 것") 충족 - 물질적 회귀 없음.
- 주의: 전 1회차 0.84/3.6초만 보고 판단하면 안 됨. 단일 런 수치는 노이즈가 큼 (전 자체도 0.84-0.91, 3.5-3.7로 흔들림). 위 범위가 정본.

### 20-8. 회귀 - 게이트 + 링크

- 게이트 (~/workspace/hoho-tour-revamp/gate_phase2.py, work/public 대상): 알려진 FAIL 3건만 (18-6·19-7과 동일, 비회귀 - "20 posts vs 21", "disclosure 5 places" lang-toggle.html 오탐, "home map counts Jeonju 2 / Suwon 1" 문자열 불일치). 그 외 전부 PASS (internal link 404 0, image 404 0, all img width/height 0 missing, placeholders 0, long dash 0, Travelpayouts 스크립트 유지, Jeonju/Gyeonggi province active, tour-summary 6편, hubs coming-soon 없음, raw shortcode 없음).
- 링크·스크립트 회귀 확인 (빌드 출력 grep): Travelpayouts emrld EN index 1건·KR index 0건 (유지). mt1.google.com EN 글 21편·KR 0편 (KR은 OSM 유지), arcgisonline 0건. /kr 제휴 링크 0건 (EN 제휴 링크는 그대로). motion.js 58개 페이지에 포함. 구 home-banner.webp 참조 0건, 버전 없는 style.css 참조 0건.
- 빌드: plain `hugo --minify` 0 에러, EN 46 pages + KR 15 pages, static 241. 최종 zip용 빌드는 --cleanDestinationDir로 stale fingerprinted CSS 1개 (구 style.min.a04b177e...)를 정리하고 재빌드 (20-9 참조).

### 20-9. 최종 zip

- zip: ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-motion.zip - work/ 내용물을 사이트 루트로 (public/·resources/·.git/·NOTES_*.md·counter-captures/·.hugo_build.lock 제외, .gitignore·.github/workflows/deploy.yml 유지). 15-11·18·19절과 동일 제외 규칙. 파일 368개 (unzip -l 기준, 디렉터리 항목 포함 - 히어로 367개에서 motion.js 1개 추가로 368개), 압축 해제 크기 43,017,844B, 압축 크기 41,733,416B, MD5 efd2eea835c944fd34ce9137636a5247 (1차 zip 실측). (zip 안에 들어 있는 BUILD_LOG.md는 재생성 직전 zip의 수치를 적고 있음. 압축 크기·MD5는 zip 안에 적을 수 없는 값이라 이 문장 + 납품 보고의 최종 파일 기준 수치가 정본 - 15-11·18·19절 관례.)
- 스크린샷은 zip에 넣지 않고 captures-motion-1119/ 폴더로 별도 전달 (14장 PNG + checks-motion.json, 4,179,089B).
- zip 재빌드 검증: /tmp/zipcheck-motion에 zip을 풀어 plain `hugo --minify` 실행: 0 에러, EN 46 pages + KR 15 pages, static files 241. 빌드 산출물에서 확인: motion.min.*.js 포함, style.css에 keep-all + hero-rise + --dur-med 240ms 포함, picture media 640/639 포함, Travelpayouts EN 1건·KR 0건, mt1.google.com 포함.

### 20-10. 잔여 미결 (있는 그대로 기록, 고치지 않음)

- 600-639 구간은 여전히 세로 배너 (~622-665px)라 카드가 접힌 아래에서 시작할 수 있음. 이번 턴의 브레이크포인트 이동 (640부터 가로 배너)으로는 커버 안 됨. 다음 턴에서 600부터 가로 배너로 내릴지, 아니면 세로 배너에 max-height 상한을 둘지 결정 필요 (640-767 구간은 이번 턴으로 해결됨).
- LCP 전후 차이는 런 노이즈 범위 안이지만, 후 5회 중 3회가 3.7-3.8초로 전 5회 중 4회가 3.5초인 것과 비교하면 "완전히 같다"고 단정하기는 어려움. 무스로틀 직접 측정 (764 vs 766ms)은 동일. 다음 턴에서 실서버 Lighthouse로 재확인하는 것이 정확함 (로컬 throttled 런은 노이즈가 큼).
- 리빌 stagger 최대 300ms: 부모 그룹이 큰 섹션 (카드 21개)은 마지막 카드까지 최대 300ms 지연 - 의도된 상한이나, 좁은 폭에서 한 화면에 보이는 카드가 적어 체감이 거의 없음.
- 19-9의 미결 전부 그대로 (18-9 포함).
- X 게시물 원문 링크를 찾지 못했음 (20-1 참조). 다음에 레퍼런스 오더가 오면 X 링크를 직접 받아둘 것.

## 21. 대구·광주 발행 묶음 (2026-11-19 21:40-23:30, 똘마니 오더·코디네이터 2호)

### 21-1. 개요

- 오더: 똘마니 2026-11-19 21:22 (슬랙 스레드 1795031586.385169): ① 신규 글 대구·광주 2편, ② 지역 등록, ③ 모션 후속 2건, ④ KTX 요금 정오표. 최종 납품은 ①까지 합친 하나의 ZIP + 하나의 로컬 커밋. GitHub 푸시 금지 (부모 지시 대기).
- 1호 코디네이터는 스팅 납품물 5건 다운로드 차단으로 멈췄고, 2호가 이어받음. 전사본은 부모가 라이브 브라우저 태스크로 files.instinct.com 5개 페이지 본문을 화면 전사해 ~/workspace/hoho-tour-revamp/source-daegu-gwangju-1119/에 저장 (daegu-revised.md, daegu-supplement.md, gwangju-revised.md, gwangju-supplement.md, ktx-srt-errata-2026-11.md - 다운로드 버튼이 안 보여 파일 자체는 못 받음).
- 기준선: 착수 시 HEAD 3d05280, plain `hugo --minify` 0 에러, Pages EN 46 + KR 15, static 241. work/에 모션 변경분이 미커밋 상태로 크게 있었음 (이번 커밋에 전부 포함).

### 21-2. ③-1 스크롤 리빌 셀렉터 수정

- 변경: `assets/css/style.css` 332행 `html.js.reveal` → `html.js [data-reveal]`, 335행 `html.js.reveal.is-visible` → `html.js [data-reveal].is-visible`, 341행 reduced-motion 블록 `.reveal` → `[data-reveal]`. 부모 지시 "1곳·2줄"에 더해 reduced-motion 줄도 함께 수정. `assets/js/motion.js` 주석 2곳의 ".reveal" 언급도 `[data-reveal]`로 수정.
- 원인: motion.js는 [data-reveal]에 .is-visible을 붙이는데 CSS는 html.js .reveal을 보고 있어 시각적으로 0% 작동 (20절 잔여 미결, 라이브 검수에서 발견).
- 검증 (실브라우저 opacity 실측, /tmp/pw_dg_probe.py, 계단식 스크롤 500px씩·350ms 대기): 수정 전 27개 타겟 전부 로드 시 opacity 1 (버그 재현, 1440·390 둘 다 opacity0_before_scroll 0). 수정 후 1440은 26/27 opacity 0 (나머지 1개는 로드 시 이미 뷰포트 안에 있는 home-map 섹션, 정상), 390은 27/27 opacity 0. 계단식 스크롤 후 1440·390 둘 다 27/27 opacity 1.
- 주의: 맨 아래로 instant 점프하면 중간 요소들이 뷰포트를 거치지 않아 observer가 안 터져서 opacity 1이 5개(1440)/1개(390)만 나오는 프로브 아티팩트가 있음 - 정상 동작이며 계단식 스크롤이 정본 검증법.
- 최종 수치 (신규 가이드 카드 2개 추가로 총 29개): 1440 스크롤 전 opacity 0이 28개 (1개는 home-map 섹션), 스크롤 후 opacity 1이 29개. 390 전 29개, 후 29개.

### 21-3. ③-2 600~639px 세로 배너

- 변경: 브레이크포인트 640→600으로 이동 (max-height 상한이 아니라 가로 배너로 내리는 쪽 선택). `assets/css/style.css` `@media(min-width:640px)` → `@media(min-width:600px)` + 주석에 21절 이동 기록, `layouts/index.html` picture media `(max-width: 639px)`→`(max-width: 599px)` / `(min-width: 640px)`→`(min-width: 600px)`, `layouts/_default/baseof.html` preload media 동일 이동. `@media(max-width:640px)` 블록 2곳(298행 헤더, 581행 투어 라벨)은 히어로와 무관해 손대지 않음.
- 검증 (뷰포트 높이 900px = 오더 기준 첫 화면, 844px도 병기): 수정 전 600→사진 622.2px·카드 상단 775.9 / 620→644.4px·798.1 / 639→665.5px·819.2, h1 1줄 26px, 모바일 배너, 크롭 0%. 수정 후 600→사진 239.2px·카드 상단 392.8 / 620→247.7px·401.4 / 639→255.8px·409.5, h1 2줄 77px, 데스크톱 배너, 크롭 0% 전 구간.

### 21-4. ② 지역 등록

- `data/regions.yaml`에 daegu·gwangju 항목 추가 (기존 형식·필드 그대로, status active): daegu (center 35.8714, 128.6014, path_id daegu, cities [Daegu], subthemes [itineraries, food-restaurants, day-trips], image images/hubs/daegu-mood.webp, blurb "KTX in, modern alleys and Seomun Market in a day."), gwangju (center 35.1595, 126.8526, path_id gwangju, cities [Gwangju], subthemes 동일, image images/hubs/gwangju-mood.webp, blurb "KTX in, Songjeong Station, Yangnim's old houses, and Mudeungsan in a day.").
- 허브 파일 4개 생성 (최소형, title + url만): `content/regions/daegu/_index.md` (url /korea/daegu/), `_index.kr.md` (title 대구, url /kr/korea/daegu/), `content/regions/gwangju/_index.md` (url /korea/gwangju/), `_index.kr.md` (title 광주, url /kr/korea/gwangju/). KR 허브에 "영어만 제공" 안내를 넣지 않음 - KR 글이 이번 턴에 같이 만들어지기 때문.
- `layouts/partials/home-map.html` `$labelOff`에 오프셋 추가: daegu (dx 12, dy 34, anchor start), gwangju (dx -12, dy -14, anchor end). daegu 초기값(dx -12, dy 18, end)은 Jeonju 라벨과 겹침 (1440에서 11.2×10.9px, 390에서 34.0×10.5px) - 실측 후 dx 12/dy 34/start로 교체. 교체 근거 (viewBox 단위): 대구 핀(327.7, 278.0)이 전주 핀(210.1, 282.6)·경주 핀(378.2, 279.4)과 거의 같은 위도라 좌우 라벨이 겹치고, dy -20은 경주 라벨(dy -20)과 겹치고, dy 18 end는 전주 라벨과 겹침. dy 34 start는 경주 핀 하단과 2.6단위(약 2px) 간격, 부산 라벨과 17단위 간격으로 전부 회피. gwangju up-left 선택 근거: 기본값(우측)은 부산 라벨과 같은 위도(y≈347-349)에서 겹침. 지도 SVG viewBox 441×560, province id에 daegu·gwangju 둘 다 있음 (신규 shape 작업 불필요).
- 검증: 수정 후 라벨↔라벨 겹침 0쌍 (1440·390 둘 다, 실측 박스 기준, 11개 라벨). Daegu 라벨 1440 (561.8, 478), 390 (258.9, 353.9). Gwangju 라벨 1440 (354.9, 497.8), 390 (110.8, 366.2). 핀은 글 0개라 처음에는 prov--soon 상태였고, ①번 글 추가 후 prov--active로 전환됨 (허브 목록 확인은 21-14 참조).
- 본문 크로스링크 검증은 ①번에서 최종 확인 (21-7 참조). regions.yaml·hub·지도 라벨까지가 ②번 범위.

### 21-5. ④ KTX 요금 정오표 - 명시분

- 경주 글 47행: "about 45,000 to 55,000 KRW" → "about 44,100 to 44,200 KRW" (`content/blog/gyeongju-one-day-ktx-bulguksa-hwangridan.md`, 부산 부분 10,000~15,000은 손대지 않음). 빌드 산출물에서 "44,100 to 44,200" 확인됨.
- 강릉 글 47행: "about 27,000 to 35,000 KRW" → "about 26,000 to 35,000 KRW" (`content/blog/gangneung-one-night-ktx-coffee-gyeongpo.md`). 빌드 산출물에서 "26,000 to 35,000" 확인됨.
- 전수 스윕 (EN 글 21편): KTX 요금 기재는 3곳뿐 - 대전 21,600원 (68행), 경주, 강릉. 그 외 요금 기재 (부산 스카이캡슐·비치트레인, 제주 버스·우도 페리, 인천 지하철)는 KTX 요금이 아니라 정오표 범위 밖. Singyeongju 언급은 경주 당일 글에만 있음 (다른 글 0건).

### 21-6. ④ 정오표 나머지 + Singyeongju 정정

- 정오표 기준: 2026-09-01 KTX·SRT 통합 이후, 코레일 공식 예매 실조회 (2026-11-19 20시대, 11-20 출발분) + 코레일 보도자료 2026-08-05. 검토 범위: content/blog.md 23개 (글 21·인덱스 2) + 도시 팩트 베이스 File 8개. 기준 운임: 서울~부산 59,800 → 54,400원, 용산~광주송정 46,800 → 42,000원.
- "정정 권고 2건": 대구 팩트 베이스 (약 39,000 → 38,300~38,800, File x9j137qqzl5y data.ts 37행) / 경주 팩트 베이스 (일반실 44,500 → 44,100~44,200, 특실 64,500 → 64,100~64,200, File ac1w2boq5duw 50행·78행). 해당 파일이 레포에 있는지 워크스페이스 전체에서 검색했으나 정오표 파일 본인 외에는 없음 (data.ts 파일 자체도 없음). "대상 파일 없음"으로 기록하고 적용하지 않음. 콘텐츠·데이터 내 옛 요금 잔재도 없음 (39,000 / 44,500 / 64,500 / 45,000~55,000 / 27,000~35,000 전부 0건).
- Singyeongju 정정 (정오표 부수 발견 확인됨): 웹 검색으로 다수 출처 일치 확인 - 신경주역은 2023-12-28에 공식 역명이 경주역으로 변경됨. 코레일 예매에서는 '경주'로 검색해야 함. 도심 옛 경주역은 2021년 12월 폐쇄. 경주 글의 Singyeongju 표기 7곳 전부 정정: frontmatter stop 이름, 37행 도입, 47행 교통, 49행 역 위치, 51행 🔥 팁 (내용을 "Book for 'Gyeongju', not 'Singyeongju'. The KTX station was renamed from Singyeongju to Gyeongju Station on December 28, 2023..."으로 다시 씀 - 옛 이름을 아는 것이 독자에게 유용해서 설명에 남김), 108행·115행 일정표. 정정 후 "Singyeongju"는 51행 팁의 옛 이름 설명에만 남음 (다른 글에는 Singyeongju 언급 없음, 전수 확인됨).
- 주의: 정오표 "권고" 범위와 오더 지정값이 다르면 오더 지정값을 우선한다 (경주 44,100~44,200 / 강릉 하한만 27,000→26,000, 범위 26,000~35,000).

### 21-7. ① 신규 글 EN 2편

- 파일: `content/blog/daegu-one-day-ktx-modern-alley-seomun-market.md` (13,113B), `content/blog/gwangju-one-day-ktx-songjeong-yangnim-mudeungsan.md` (13,414B).
- 처리: 전사본의 "# 제목", "Checked...", "Source:" 메타 줄과 말미 "Checked 2026-11-19, revised..." 푸터는 제외 (메타데이터라 본문 아님). "## About" 제목만 사이트 서식(도입 문단)에 맞춰 생략하고 본문 문장은 그대로. figure·aff 숏코드는 보완 파일 배치대로 삽입. 광주 "(affiliate, see supplement)" 표기 2곳은 제거하고 숏코드 배치.
- frontmatter: title/description/date 2026-11-19/image/image_alt/regions/themes/stops(좌표·name_ko·short_ko 포함)/landmarks/map_note(보완 파일 원문 그대로). 대구 stops 6 + landmarks 3, 광주 stops 9 + landmarks 3.
- 오더의 "광주 용봉동은 map_note으로 지도에서 빼고"는 보완 파일 기준으로 용산역으로 해석함 - 용봉동은 정정본·보완 파일 어디에도 없고, map_note이 용산역을 지도 제외 대상으로 명시하며 9개 정거장 중 8개만 그리는 구조와 일치.
- 광주 gwangju-01은 보완 파일에 본문 figure 배치 지시가 없지만 사이트 관례(경주 글 등 frontmatter 이미지를 도입 뒤 첫 figure로 1회 삽입)대로 도입 뒤 첫 figure로 삽입. 대구 daegu-01은 보완 파일 명시대로 frontmatter + 본문 첫 figure.
- 캡션: daegu-01 "Gyesan Cathedral, the red-brick anchor of the Modern Alley walk. Photo: Šolon, CC BY-SA 4.0", daegu-02 "Seomun Night Market in October 2016, its first season. Photo: Choi2451, CC BY-SA 3.0", daegu-03 "Palgongsan Cable Car, August 2016. Photo: Choi2451, CC BY-SA 4.0", gwangju-01 "Mudeungsan behind Gwangju in winter. Photo: Kgw1226, CC BY-SA 4.0", gwangju-02 "Gwangju-Songjeong Station in March 2015. Photo: Saigen Jiro, CC0" (날짜 표기가 곧 "현재 모습 아님" 주의), gwangju-03 "A plate of Songjeong tteokgalbi. Photo: Minseong Kim, CC BY-SA 4.0".
- aff 숏코드: 대구 111728 + 194467 (교통 섹션, 시티투어버스 문단 뒤, 111728→194467 순서), 광주 160778 (ACC 섹션 Soul Walk 문단 뒤), 190223 (무등산 섹션 택시 투어 문단 뒤), Agoda (🌙 섹션 "If you do stay..." 문단 뒤).
- 크로스링크 실존 확인: 대구 글의 경주 [Gyeongju in One Day by KTX](/blog/gyeongju-one-day-ktx-bulguksa-hwangridan/)·부산 [Busan in Two Bowls](/blog/busan-pork-soup-milmyeon/), 광주 글의 전주 [Jeonju one-day guide](/blog/jeonju-one-day-hanok-bibimbap-gaekridan/) - 전부 실존 slug 확인됨. 게이트 internal link 404 = 0도 PASS.
- 미확인 표기: 대구 전사본 "(미확인" 12건 (도입 정의 1건 포함, 사실 표기 11건) - 오더의 "12곳"과 도입 포함 기준에서 일치. 광주 전사본 "unconfirmed" 14건 (도입 정의 1건 + 사실 표기 13건)인데 전사본 푸터 표기는 15건으로 1건 차이 - 임의 추가·삭제 없이 전사본 그대로 유지.
- 금지어 검증 (스크립트): em dash 0, hidden gem·nestled·delve 등 금지어 0, 개인정보 0 (둘 다).

### 21-8. ① 신규 글 KR 2편

- 파일: `content/blog/daegu-one-day-ktx-modern-alley-seomun-market.kr.md` (12,402B), `content/blog/gwangju-one-day-ktx-songjeong-yangnim-mudeungsan.kr.md` (13,270B). 이 레포에는 기존에 글별 .kr.md 파일이 없었음 (KR 페이지는 _index.kr.md만 있었고, KR 번역 21편은 똘마니 검수 대기 상태) - 이번 2편이 첫 글별 KR 번역 파일임.
- 적용 규칙: EN 확정본 기준, 제휴 숏코드 0건, 전부 좌측 정렬, 장식 블록(인용구) 1개, 캡션 뒤 빈 줄, 인트로 직후 요약 비교표, 하루 일정은 Markdown 표(모바일 요약 비교표), 100자 초과 장문단 0, 중앙 정렬 0, 제로폭 공백 0. 인용구 1개는 글 맨 앞(프론트매터 직후)에 배치 (v2.0 구조: 인용구 → 인트로 → 요약 비교표). 대구 인용구: 야시장 19:00 팁. 광주 인용구: 월요일 도심 피하기 팁. 광주 본문에서 월요일 🔥 팁은 인용구와 중복이라 본문에서 제거.
- 제목·설명·image_alt은 한국어로 씀 (기존 KR _index 파일이 한국어 제목을 쓰는 패턴을 따름; i18n 노트의 "가이드 제목·설명·고유명사 영어 유지"는 UI 문자열·허브 인트로 맥락으로 보고 본문 지명은 name_ko 사용). 대구 제목 "대구 당일치기 KTX 여행: 근대골목, 서문시장, 막창", 광주 제목 "서울에서 광주 당일치기: 송정시장, 양림동, 무등산". frontmatter stops/landmarks는 EN과 동일 (name_ko 포함, KR 지도에서 한글 라벨 렌더용), map_note은 한국어로 번역.
- KR 번역은 기계번역이 아니라 직접 한국어 작문으로 작성 (프로젝트의 "기계번역 금지" 규칙). EN 문단을 100자 이하 짧은 문단으로 나눠 번역했고 사실·수치·(미확인) 표기는 그대로 유지.
- 검증 (스크립트): 두 파일 다 100자 초과 문단 0건 (처음에 🔥 팁 문단 2개가 113자·109자로 초과해 둘로 나눔), 제로폭 공백 0, 중앙 정렬 표기 0, aff 숏코드 0, em dash 0, 인용구 각 1개, figure 각 3개. 미확인 개수: 대구 KR 12건 (EN 12건과 일치), 광주 KR 15건 (EN 15건과 일치 - 본문 14건 + map_note 1건). 광주 KR 요약 비교표에 (미확인)을 넣으면 중복 집계돼 17건이 되길래 표에서는 빼고 본문에만 둠.
- KR "이어지는 여행" 링크는 KR 번역이 아직 없어 EN 글로 연결 (경주·부산·전주) - KR 번역이 나오면 교체 필요.

### 21-9. ① 사진 6장

- Commons API 메타데이터 조회: 7개 파일 전부 존재, 작가·라이선스·크기가 보완 파일과 일치. 첫 조회 스크립트는 imageinfo에 `mime` 키가 없어 KeyError로 실패했음 - 키 목록을 확인해 고침 (imageinfo 키: descriptionshorturl, descriptionurl, extmetadata, height, size, url, width).
- 다운로드 함정: User-Agent 없이 curl하면 3.4KB "Wikimedia Error" HTML만 옴. User-Agent "HOHO-Tour/1.0 (contact: contact@hoho-labs.com; educational travel guide)"를 넣으니 전부 실물 JPEG로 다운로드됨. 원본: daegu-01 4,809,784B (4000x3000, EXIF Samsung SM-N986U1, 2021-02-12), daegu-02 4,310,407B, daegu-03 3,789,455B, gwangju-01 1,446,479B, gwangju-02 3,100,333B, gwangju-03 3,325,253B, 후보 Contax3 2,161,749B. 원본은 /tmp/photos/에 있음.
- daegu-01 육안 대조 완료: 받은 파일이 붉은 벽돌 쌍둥이 첨탑 성당 + 십자가상 + 장미창 + 소나무가 있는 계산성당 사진임을 확인 (EXIF 2021년 촬영과 일치). Contax3 대조 후보는 다른 구도(어두운 첨탑 실루엣 + 밝은 석조 쌍둥이 첨탑 건물)라 미사용 (보완 파일 지시대로 기본 미사용).
- 나머지 5장 육안 확인 완료: daegu-02 서문 야시장 야간 (보라 등·음식 가판대), daegu-03 노란 팔공산 케이블카 캐빈 + 푸른 산, gwangju-01 겨울 도심 너머 무등산, gwangju-02 광주송정역 건물 ("광주송정역" 간판 보임, 2015년 사진이라 "현재 모습" 주장 금지), gwangju-03 떡갈비 한 접시 (특정 식당 아님).
- webp 변환 (PIL exif_transpose 적용, 긴 변 1600px, `static/images/photos/`): daegu-01 1200x1600, 243,800B (q=50; q=82는 260.4KB, q=54는 250.1KB로 250KB 초과라 q=50으로 낮춤), daegu-02 1600x900, 123,864B (121.0KB, q=82), daegu-03 1600x900, 127,258B (124.3KB, q=82), gwangju-01 1600x1200, 146,320B (142.9KB, q=82), gwangju-02 1600x1064, 150,220B (146.7KB, q=82), gwangju-03 1600x763, 207,632B (202.8KB, q=82). 전부 250KB 이하.
- `data/photo-dims.yaml`에 6개 항목 추가. CREDITS.md 말미에 신규 섹션 "Daegu and Gwangju real photos (2026-11-19)" 추가 (6행: 작가·라이선스·원본 URL, daegu-01 품질 50 명기). CREDITS.md 헤더의 "All 43 photos" 표기는 손대지 않음 - 이미 오래된 구문임 (실제 실사 행은 추가 전 131개, 추가 후 137개; AI 일러스트·지도 행까지 합하면 174행). 기존 stale로 기록.

### 21-10. ① 제휴 판매 확인

- Klook 111728: 상품 페이지 정상, 평점 4.4/5 (리뷰 129건 - 보완 파일의 87건에서 증가), 2024년 임시 운휴 공지 문구는 페이지에 그대로 남아 있음. 판매 중 확인됨 (2026-11-19 ~21:52 KST, browser.open 실측).
- Klook 194467: 정상, 5.0/5 (3건), 가격 116.95 USD, Availability: InStock.
- Klook 160778: 상품 페이지 정상 (가격·재고 JSON-LD는 가져온 텍스트에 없음, 설명 전문 확인됨).
- Klook 190223: 정상, 가격 188.35 USD, Availability: InStock.
- Agoda 광주 도시 페이지: 정상 (HTTP 200, 2026년 11월·12월 달력 확인됨).

### 21-11. single.html 제휴 고지문 KR 누수 수정 (신규 발견·수정 완료)

- 빌드 산출물에서 KR 글 페이지에 affiliate 문구가 1건씩 나옴. 원인: `layouts/_default/single.html` 26행의 disclosure div가 언어 조건 없이 모든 단일 글 페이지에 렌더됨 (footer.html은 `{{ if ne site.Language.Lang "kr"}}`로 KR에서 숨기는데 single.html에는 조건이 없었음). KR 글 페이지가 처음 생기면서 처음 드러난 결함.
- 수정: single.html의 disclosure를 `{{ if ne site.Language.Lang "kr"}}`로 감쌈. 재빌드 후 KR 페이지 affiliate/klook/agoda/emrld/travelpayouts 0건 (글 2편·홈·허브 전부), EN 글에는 disclosure 유지 (1건씩, 정상).

### 21-12. 정적 지도 4장 + 허브 무드 이미지 2장 (신규 생성 완료)

- 문제: 게이트 "all img width/height"에서 12건 누락 - 사진이 아니라 (a) 정적 노선 지도 4장 (EN 2장 + KR 2장, 각 글 페이지에 fallback + noscript 2회씩 참조) + (b) 허브 무드 이미지 2장 (EN/KR 허브 각 1회씩). 두 파일군 모두 디스크에 없었음 (게이트의 image 404 검사는 이를 안 잡음 - 검사 범위가 사진 중심이라, 21-15 참조).
- 지도: `~/workspace/hoho-tour-revamp/map-stops.json`에 대구 6개 정거장 + 광주 9개 정거장(용산역 1번 포함 - 속초·전주 선례와 동일하게 출발점 포함) 추가 (23개 slug). `render_maps.py`의 draw_map을 가져와 EN 지도 2장 렌더 (1600x840): 대구 42KB (클러스터 [1,2,3] = 청라언덕·계산성당·서문시장), 광주 28KB (클러스터 [1..8] = 광주 8개 정거장, 용산 멀리 있음). KR 지도는 같은 렌더러를 Noto Sans CJK KR (인덱스 1, `/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc`·`NotoSansCJK-Regular.ttc`에서 fontTools로 확인)로 바꿔 렌더하고 인셋 캡션을 "확대: 가까운 정거장"으로 교체: 대구 KR 37KB, 광주 KR 25KB. KR 라벨은 name_ko 사용, 단 대구 5번은 short_ko "김광석길" 사용 (정식명 김광석다시그리기길이 김). 렌더 드라이버 /tmp/render_dg_maps.py.
- 지도 육안 확인: 대구 EN 지도는 인셋에 2·3·4번이 깨끗하게 보임. 광주 KR 지도는 한글 라벨이 깨짐 없이 렌더됨. 다만 광주 인셋이 세로로 좁게 압축돼 8개 중 4개 번호가 겹쳐 가려짐 (정거장들이 동서로 좁은 띠에 몰려 있어서). 속초 기존 지도도 메인 지도에서 5·6·7·8번 배지가 겹치는 같은 렌더러 특성이 있어, 이번 턴에서는 기존 동작으로 인정하고 수용함 - 정적 지도는 폴백(Leaflet 실패·noscript)이고 주 지도는 인터랙티브 Leaflet이 제대로 처리함. 한계로 명기.
- 템플릿 동작 확인: `tour-summary.html`은 `$slug:= $.File.BaseFileName`을 써서 KR 페이지는 `<slug>.kr-map.webp`을 참조함 (KR용 별도 파일이 의도된 설계). `photo-dims.html`의 키는 파일명에서.webp를 뺀 것이라 `.kr-map` 키도 필요함.
- `data/photo-dims.yaml`에 지도 4개 키 (1600x840) + 무드 2개 키 (1600x1067) 추가.
- 허브 무드 이미지: 부산 무드(`busan-mood.webp`, 1600x1067, 크림 배경·산호색 제목·2x2 비네트·파란 라벨의 평면 벡터 일러스트) 스타일에 맞춰 media.generate_image로 2장 생성 (1920x1280). 대구: "Daegu" 제목 + 계산성당·서문 야시장·김광석길·앞산 케이블카 4컷, 라벨 철자 전부 정상. 광주: "Gwangju" 제목 + 무등산·5·18광장·국립아시아문화전당·떡갈비 4컷, 라벨 정상 (비네트 안쪽 작은 갈색 라벨 + 아래 파란 라벨이 중복되는 생성기 특성은 있으나 철자 정상). 1600x1067 webp로 변환: daegu-mood 131.5KB (q=85), gwangju-mood 105.5KB (q=85). 정식 파일명 `static/images/hubs/daegu-mood.webp` / `gwangju-mood.webp`으로 저장, 생성기 메타 JSON 파일은 삭제. CREDITS.md GPT 일러스트 섹션에 2행 추가.

### 21-13. KR 투어 지도 초기화 결함 발견·수정 (이 턴 신규 발견, 치명 - 수정 완료)

- 발견: 글 페이지 프로브에서 4개 글 페이지 전부 figures ok: False + EN 페이지 정적 지도 img natural 0x0이 나왔고, KR 페이지 스크린샷에서 인터랙티브 지도 대신 정적 폴백 지도가 뜨는 것이 육안 확인됨 (캡션 "Static route map - the interactive map could not be loaded.").
- 원인: `layouts/partials/tour-summary.html`의 디버그 훅이 `tileFallback: tileFallback`을 무조건 읽는데, `tileFallback` 변수는 EN 분기(Google 타일, tileerror 4회 후 OSM 교체)에서만 선언됨 (`var tileErrs = 0, tileFallback = false;`). KR 분기(OSM 타일)는 이 선언이 없어서, KR 글 페이지에서는 디버그 훅에서 ReferenceError: tileFallback is not defined가 나고, 바깥 try/catch가 showFallback()을 호출해 인터랙티브 지도를 숨기고 정적 지도를 띄움. KR 글 페이지가 이번 턴에 처음 생기면서 처음 드러난 결함 (기존에는 KR 글 페이지 자체가 없었음).
- 확인 방법: CDP Debugger.setPauseOnExceptions(state "all")로 caught 예외까지 잡음. EN 페이지는 Leaflet 내부 TypeError 1건만 (leaflet.js 내부, Leaflet 자체가 잡는 양성 - EN 지도는 정상 동작), KR 페이지는 같은 1건 + ReferenceError: tileFallback is not defined 1건. 디버그 훅(_tourDebug)이 None이고 mapHidden=True/fallbackHidden=False인 것도 일치.
- 수정: KR 분기의 OSM 타일 레이어 추가 직후에 `var tileFallback = false;` 선언 추가 (주석에 21절 기록). 최소 수정 - 디버그 훅·타일 교체 로직은 손대지 않음.
- 재검증: 재빌드 후 4개 페이지 전부 mapHidden=False/fallbackHidden=True, _tourDebug 존재. daegu-kr: zoom 12, fitZoom 12, clusters [[2,3,4]], tileFallback false. gwangju-kr: zoom 12, fitZoom 11, clusters [[2,3,4],[5,6,7,8]], outliers [1] (용산역), tileFallback false. daegu-en은 tileFallback true - 샌드박스에서 Google 타일이 안 떠서 4회 에러 후 OSM으로 교체된 설계 동작 (실브라우저에서는 Google 타일 정상, 18절 curl 실측 28개 전부 HTTP 200).
- 스크린샷 재확인: KR 2개 페이지 전부 인터랙티브 Leaflet 지도 렌더 (배지·노선·타이틀·랜드마크, 한글 라벨). 대구 KR: 배지 1·2·3·4·5·6, 타이틀 동대구역/김광석다시그리기길/앞산케이블카. 광주 KR: 배지 2·3·4·5·6·7·8·9, 타이틀 증심사, 랜드마크 🚌.
- 샌드박스 타일 참고: 샌드박스 브라우저에서는 Google·OSM 타일 둘 다 안 떠서 지도 배경이 회색으로 보임 (errorTileUrl 회색 플레이스홀더). 인터랙티브 요소(배지·노선·타이틀·랜드마크)는 전부 렌더됨. 실브라우저 타일 로딩은 18절에서 curl로 이미 검증됨 (Google 28개 HTTP 200).

### 21-14. 글 페이지 프로브 이상 신호 해소 (21-13과 별개, 프로브 아티팩트로 확정)

- 이상 신호: 4개 글 페이지 전부 figures ok: False, EN 페이지 정적 지도 img natural 0x0 (KR 페이지는 1600x840으로 정상 표시됨).
- 원인 규명 (3가지 근거): ① 상세 프로브에서 figure별 상태를 보니 hero figure는 전부 로드 완료, 안 뜬 것은 화면 아래 lazy 이미지(daegu-02·daegu-03·gwangju-03)와 hidden 폴백 안의 정적 지도 img뿐. ② scrollIntoView로 daegu-02 figure를 화면 중앙에 두면 complete True, natural 1600x900으로 뜸 (curl도 HTTP 200, 123,864B). ③ 정적 지도 img는 hidden figure 안에 loading=lazy라 Leaflet이 정상 동작하는 동안 브라우저가 아예 안 가져옴 (KR 페이지에서 1600x840으로 뜬 것은 폴백이 잠깐 보였던 21-13 결함 상태의 잔재 - 수정 후 4개 페이지 전부 0x0으로 일치, 정상). curl로 지도 4장 전부 HTTP 200 확인 (daegu-map 43,418B, gwangju-map 29,408B, 바이트 일치).
- 결론: 실제 결함 아님. 프로브가 domcontentloaded 후 1200ms만 기다리고 스크롤하지 않아 화면 밖 lazy 이미지가 아직 로드되지 않은 것. 게이트 "image 404 = 0" + "all img width/height 0 missing" PASS도 일치.
- 마커 구성 (상세 프로브): 대구 10개 = 랜드마크 3개(🚡🎡🌳) + 타이틀 3개(Dongdaegu Station, Kim Gwang-seok Street, Apsan Cable Car) + 배지 4개(1, 2·3·4 클러스터, 5, 6). 광주 9개 = 랜드마크 3개(🚌🏛️🕊️) + 타이틀 2개(Yongsan Station, Jeungsimsa Temple) + 배지 4개(1, 2·3·4, 5·6·7·8, 9). 광주 KR도 동일 구조에 한글 타이틀(용산역, 증심사). 클러스터 배지는 spec A/B대로 ("2·3·4", "5·6·7·8").
- 허브 목록 확인: public/korea/daegu/index.html, public/kr/korea/daegu/index.html (광주도 동일)에서 "Guides coming soon"이 아니라 신규 가이드가 목록에 뜸 - 4개 허브 전부 coming-soon 없음, 각 허브에 자기 가이드 slug 포함 확인됨.

### 21-15. 최종 빌드·게이트·스크린샷

- 빌드: plain `hugo --minify` 0 에러, Pages EN 50 + KR 22, static 252 (착수 시 EN 46 + KR 15, static 241에서 신규 파일 12개(사진 6 + 지도 4 + 무드 2) + 글 4편·허브 4편 반영).
- 게이트 (~/workspace/hoho-tour-revamp/gate_phase2.py): 알려진 FAIL 3건만 (18-6·19-7·20-8과 동일, 비회귀 - "20 posts in public/blog found 23" (기대값 20이 오래됨 - 신규 2편 추가로 23편이 의도된 결과), "disclosure 5 places consistent plain/no-commission in ['lang-toggle.html']" (기존 오탐), "home map counts Jeonju 2 / Suwon 1" (기존 문자열 불일치)). 그 외 전부 PASS: internal link 404 = 0, image 404 = 0, all img width/height 0 missing, placeholders 0, long dash 0, Travelpayouts 스크립트 유지, Jeonju/Gyeonggi province active, tour-summary on all 6 new posts, hubs jeonju/suwon no coming-soon, no raw shortcodes.
- 게이트 한계 (이번 턴 발견): image 404 검사가 정적 지도 4장 + 허브 무드 2장의 부재를 안 잡음 (검사 범위가 사진 중심). 21-12의 12건은 "all img width/height" 누락으로 발견됨. 다음 게이트 개선 시 지도·무드 이미지도 404 검사 범위에 넣을 것.
- 스크린샷: ~/workspace/hoho-tour-revamp/captures-daegu-gwangju-1119/ (29개 파일, 13,444,573B): band 600/620/639 before/after (6장), home-en/kr 1440/390 before/after (8장), map-labels 1440/390 before/after (4장), reveal-before/after 1440/390 before/after (4장), post-daegu-en/kr-1440.png, post-gwangju-en/kr-1440.png (4장, KR 2장은 21-13 수정 후 재생성), checks-daegu-gwangju.json (before/after/posts 키 포함).

### 21-16. 최종 zip

- zip: ~/workspace/hoho-tour-revamp/hohotour-revamp-1119-daegu-gwangju.zip - work/ 내용물을 사이트 루트로 (public/·resources/·.git/·NOTES_*.md·counter-captures/·.hugo_build.lock 제외, .gitignore·.github/workflows/deploy.yml 유지). 15-11·18·19·20절과 동일 제외 규칙. 파일 389개 (unzip -l 기준, 디렉터리 항목 포함 - 모션 368개에서 신규 파일 20개(글 4·허브 4·사진 6·지도 4·무드 2) + 신규 디렉터리 2개(content/regions/daegu·gwangju) 추가로 390개가 돼야 하나 실측은 389개로 1개 차이 - 원인 미추적, 재빌드 검증으로 대체 확인), 압축 해제 크기 44,484,424B, 압축 크기 43,152,278B, MD5 26a73265c4b128cea21b3b6bb4d933b4 (1차 zip 실측). (zip 안에 들어 있는 BUILD_LOG.md는 재생성 직전 zip의 수치를 적고 있음. 압축 크기·MD5는 zip 안에 적을 수 없는 값이라 이 문장 + 납품 보고의 최종 파일 기준 수치가 정본 - 15-11·18·19·20절 관례.) 제외 항목 확인: zip 목록에서 public/·resources/·.git/·NOTES_*.md·counter-captures/·.hugo_build.lock 0건. (.gitignore·.github/workflows/deploy.yml은 포함돼도 되는 파일이라 유지. 15-11과 동일 규칙.)
- 스크린샷은 zip에 넣지 않고 captures-daegu-gwangju-1119/ 폴더로 별도 전달 (29개 파일 + checks-daegu-gwangju.json, 13,444,573B).
- zip 재빌드 검증: /tmp/zipcheck-daegu-gwangju에 zip을 풀어 plain `hugo --minify` 실행: 0 에러, EN 50 pages + KR 22 pages, static files 252. 빌드 산출물에서 확인: public/blog 23편 + index.html, public/kr/blog 2편 + index.html, tour-summary.html에 tileFallback 선언 포함, single.html에 KR disclosure 조건 포함, style.css에 [data-reveal] 포함, picture media 600/599 포함.

### 21-17. 잔여 미결

- 광주 정적 지도 인셋 압축 (21-12): 광주 인셋이 세로로 좁게 압축돼 8개 중 4개 번호가 겹쳐 가려짐. 속초 기존 지도도 같은 렌더러 특성이라 이번 턴에서는 수용. 정적 지도는 폴백이고 주 지도는 인터랙티브 Leaflet이 제대로 처리함.
- CREDITS.md 헤더 "All 43 photos" 기존 stale (21-9 참조). 실사 행 137개, 전체 174행.
- KR "이어지는 여행" 링크가 EN 글로 연결됨 (21-8 참조) - KR 번역이 나오면 교체 필요.
- 게이트 image 404 검사 범위 (21-15 참조) - 지도·무드 이미지도 포함하도록 개선 필요.
- 20-10의 미결 전부 그대로 (LCP 실서버 재확인, 리빌 stagger 300ms 상한, X 원문 링크 미확보).
- 사업자번호 불일치 (라이브 758-12-***** vs 기록 876-12-*****, 주인님 확인 대기) - 이번 턴 범위 밖.

## 22. /kr 대표글 21편 발행 (2026-11-20 10:40-12:40, 똘마니 오더·코디네이터 3호)

- 오더: 똘마니 2026-11-20 10:40. 스팅 정본 zip hohotour-kr-21posts-final.zip (슬랙 #일반 스레드 1795138548.263099 첨부, Drive 1_Spj9vv-GpoUbxsoVNdJWJ2GZDr5lyBr)만 사용. 구성 21편 = 2차본 12 + 수정 반영본 3(수원·강릉·인천) + 1차본 6. 스팅 원본·화면 전사본 사용 금지. 착수 ACK 10:47, 납품 목표 12:40 전후.
- 선행 수정 3건은 이 턴 착수 전에 워킹 트리에 이미 반영돼 있었고(부모 검증 완료) 건드리지 않음: ① 허브 무드 프레임 3:2 (style.css 486행 aspect-ratio 16/9 → 3/2, 11개 허브 전부 1600x1067 실측, 잘림 0.033%) ② _index.kr.md "가이드는 아직 영어로만 제공됩니다" 문장 삭제 ③ 광주 정적 지도 인셋 그룹화 (render_maps.py 인셋 클러스터 알약 + render_maps_kr.py 신규, 광주 EN·KR 2장만 재생성, 인셋에 "2·3·4" + "5·6·7·8" + "9"로 8개 전부 읽힘). 단, 본지도 하단 4·9번 원 겹침은 그대로 남음 (인셋은 해결, 본지도 겹침은 기존 특성).

### 22-1. 원고 배치

- /tmp/kr21/*.kr.md 21개를 work/content/blog/에 그대로 복사 (파일명 변경 없음). 배치 후 .kr.md 총 24개 (_index.kr.md + 대구·광주 2편 + 신규 21편).
- slug 21개 전부 기대 목록과 일치 (누락·추가 0건): busan-2-day-haeundae-gwangalli-gamcheon, busan-pork-soup-milmyeon, daejeon-bread-pilgrimage-seongsimdang-dcc, gangneung-one-night-ktx-coffee-gyeongpo, gyeongju-night-donggung-wolji, gyeongju-one-day-ktx-bulguksa-hwangridan, incheon-day-trip-from-seoul, jeju-3-days-no-car, jeju-east-seongsan-udo, jeju-west-aewol-oreum-cafes, jeonju-night-market-cafes, jeonju-one-day-hanok-bibimbap-gaekridan, seoul-cafes-seongsu-yeonnam-ikseon, seoul-essential-3-day-guide, seoul-market-food-walk, seoul-night-han-river-cruise-ramyeon, seoul-old-restaurants-baekban-bbq, seoul-subway-tmoney-taxi, seoul-winter-guide-late-november-december, sokcho-seorak-one-night-from-seoul, suwon-hwaseong-one-day. 신규 파일 총 246,317B.

### 22-2. KR 내부링크 정규화 3건 (21-17 잔여 미결 해소)

- 기존 KR 글 2편의 "이어지는 여행" 링크 /blog/ → /kr/blog/ 교체: 대구 299행 경주 당일치기, 대구 301행 부산 돼지국밥·밀면, 광주 337행 전주 1일 가이드. 21개 신규 파일은 이미 /kr/blog/라서 건드리지 않음.
- 교체 후 전체 .kr.md에서 bare /blog/ 0건, 신규 파일 내부링크 /kr/blog/ 45건. 빌드된 KR 글 페이지에서도 bare /blog/는 언어 토글(EN 버전 링크) 1건만 남고 콘텐츠 링크는 전부 /kr/blog/ (대구 7건, 광주 6건, 수원 7건, 서울3일 9건, 부산2일 6건).

### 22-3. 파일 검증 수치

- frontmatter title·description: 21편 전부 한국어. 라틴 문자 있는 곳은 고유명사 약어만 (KTX 3편, DCC 대전, BIFF 부산2일 description) - 영어 문장 0건. 기존 대구·광주 KR도 KTX 포함이라 같은 패턴.
- aff 0건 ({{< aff, Travelpayouts, 고지문, 제휴 전부 0건). 내부링크 전량 /kr/blog/. 긴 바 0건.
- 대전: 검토 메모·"게시용 아님"·aff 전부 없음 (aff count 0).
- 수정 반영 4건 전부 존재: 수원 ITX 30~35분·1호선 62분(급행 53분)·2,150 KRW (지시문 "2,150원"은 파일에서 "2,150 KRW" 표기 - 파일 전체가 KRW 표기라 같은 값), 강릉 202번 40~50분·정동진 18~20km, 인천 17:10~17:15·"광명이 오면" 없음, 전주야시장 3천~6천 원.

### 22-4. .kr-map.webp 부재 결함 발견·수정 (게이트 신규 FAIL)

- 1차 빌드 후 게이트에서 "all img width/height 42 missing" 신규 FAIL. 원인: tour-summary.html이 KR 글의 BaseFileName({slug}.kr)으로 images/maps/{slug}.kr-map.webp를 참조하는데, 21편의 .kr-map.webp 파일이 static/에 없었음 (기존은 대구·광주 2개만 존재). 42건 = 21개 이미지 x 2회 (fallback figure + noscript).
- 게이트 image 404 검사는 minified HTML의 따옴표 없는 src를 못 잡아 0건으로 통과한 것 (21-15에 기록된 한계와 동일). 부모 검증용 따옴표 무시 404 검사로 전체를 다시 확인 (아래 22-5 참조).
- 수정: EN 지도 파일({slug}-map.webp, 전부 실측 1600x840)을 KR 파일명({slug}.kr-map.webp)으로 동일 바이트 복사 21개 (신규 이미지 아님, 변환 없음 - 지시 "사진은 EN 글 이미지 경로 그대로" 준수). data/photo-dims.yaml에 21개 항목 추가 ({slug}.kr-map: width 1600, height 840). 재빌드 후 게이트 width/height 0 missing으로 복원.
- 참고: 대구·광주 KR 지도는 한국어 라벨이 있는 별도 파일이지만 21편은 EN 지도와 동일 바이트라 KR 지도 라벨은 영문임. KR 전용 지도 렌더링은 별도 턴 범위.

### 22-5. 최종 빌드·게이트·자체 404 검사

- 빌드: plain `hugo --minify` 0 에러, Pages EN 50 + KR 47, static 252. (부모 기대 KR 43(22+21)과 달리 47로 나옴. 글 페이지는 public/kr/blog/ 23편(기존 2 + 신규 21)으로 정확하고 hugo list all에서도 KR blog page 23건 확인됨. +4는 자동 생성 목록·택소노미 페이지 쪽으로 보이나 정확히는 미추적 - 글 수에는 영향 없음.)
- 게이트 (~/workspace/hoho-tour-revamp/gate_phase2.py): 알려진 FAIL 3건만 (18-6·19-7·20-8·21-15와 동일, 비회귀 - "20 posts in public/blog found 23" 기대값 stale, "disclosure lang-toggle 오탐", "home map counts"). 그 외 전부 PASS: internal link 404 = 0, image 404 = 0, all img width/height 0 missing, placeholders 0, long dash 0, Travelpayouts 유지, Jeonju/Gyeonggi province active, tour-summary on all 6 new posts, hubs no coming-soon, no raw shortcodes.
- 자체 404 검사 (게이트가 minified HTML을 못 잡는 한계 보완, 따옴표 유무 무시): public/ 전체 HTML의 로컬 href/src 6,023건 검사, 누락 0건.

### 22-6. 스크린샷

- ~/workspace/hoho-tour-revamp/captures-kr21/ (11개 파일 + checks-kr21.json): KR 블로그 인덱스 /kr/blog/ 1440+390, KR 글 3편 (seoul-essential-3-day-guide 재구성 1차본, suwon-hwaseong-one-day 수정 반영본, busan-2-day-haeundae-gwangalli-gamcheon 2차본) 1440+390, 대구·광주 KR 1440, 수원 지도 뷰포트 1440.
- 육안 확인: KR 인덱스 23개 카드 전부 사진·한국어 제목·칩 정상. 수원 글 제목·히어로 사진·본문·사진·스티커·팁 박스·시간표·Keep exploring 정상. Leaflet 지도 렌더 정상 (수원 5개 스탑 배지·라벨·동선·스탑 목록, 샌드박스 타일 차단이라 배경만 회색 - 실서버에서는 타일 정상). 긴 바 0건 (전 페이지 innerText 기준), 가로 넘침 0, 페이지 에러 0. 리빌 1/1 발동.
- 프로브 아티팩트 (21-14와 동일 패턴, 결함 아님): 정적 스크린샷에서 화면 밖 lazy 이미지와 hidden 폴백 안 지도 img가 naturalWidth 0으로 잡힘 (폴백은 Leaflet 정상 동작 시 hidden이라 브라우저가 안 가져옴). 스크롤 후 재확인해도 남는 9건은 hidden 폴백 1건 + 화면 밖 lazy 스티커·카드 썸네일. 파일은 전부 HTTP 200 확인 (semo-lets-go.png, han-01.webp, kr-map.webp 직접 curl 200). 스크린샷에서도 스티커·사진이 실제로 렌더됨을 육안 확인.

### 22-7. 최종 zip

- zip: ~/workspace/hoho-tour-revamp/hohotour-kr21-1120.zip - work/ 내용물을 사이트 루트로 (public/·resources/·.git/·NOTES_*.md·counter-captures/·.hugo_build.lock 제외, .gitignore·.github/workflows/deploy.yml 유지). 15-11·18·19·20·21-16절과 동일 제외 규칙. 파일 390개 + 디렉터리 42개 (대구·광주 348개에서 신규 42개(글 21·지도 21) 추가). (zip 안에 들어 있는 BUILD_LOG.md는 재생성 직전 zip의 수치를 적고 있음. 압축 크기·MD5는 zip 안에 적을 수 없는 값이라 이 문장 + 납품 보고의 최종 파일 기준 수치가 정본 - 15-11·18·19·20·21-16절 관례.)
- 스크린샷은 zip에 넣지 않고 captures-kr21/ 폴더로 별도 전달 (11개 파일 + checks-kr21.json).
- zip 재빌드 검증: /tmp/zipcheck-kr21에 zip을 풀어 plain `hugo --minify` 실행: 0 에러, EN 50 pages + KR 47 pages, static files 252. 빌드 산출물에서 확인: public/kr/blog 23편 + index.html, public/blog 23편 + index.html.

### 22-8. 잔여 미결

- 21편 KR 지도는 EN 지도와 동일 바이트 (영문 라벨). KR 전용 지도 렌더링은 별도 턴 범위 (22-4 참조).
- 게이트 image 404 검사가 minified HTML의 따옴표 없는 src를 못 잡는 한계 (21-15·22-4 참조) - 지도·무드 이미지도 포함하도록 개선 필요.
- Hugo Pages KR 47 vs 기대 43의 +4 차이 미추적 (글 페이지는 23편으로 정확, 22-5 참조).
- CREDITS.md 헤더 "All 43 photos" 기존 stale (21-9·21-17 참조).
- 20-10의 미결 전부 그대로 (LCP 실서버 재확인, 리빌 stagger 300ms 상한, X 원문 링크 미확보).
- 사업자번호 불일치 (라이브 758-12-***** vs 기록 876-12-*****, 주인님 확인 대기) - 이번 턴 범위 밖.
