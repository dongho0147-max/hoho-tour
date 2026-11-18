# 푸시 런북 - 홈페이지 개편 밤샘 (redesign/night-1118)

작성: 2026-11-18 02:20 KST (코디네이터). 상태: **푸시 미실시 - GitHub 커넥터 승인 대기 시간 초과로 차단됨**.
2026-11-18 02:0x경 `github call-tool` (list_branches, get_file_contents)이
"egress approval timed out"으로 실행되지 않음. 개발자 지침상 승인 없이 재시도 금지.
주인님(또는 부모)이 승인 카드를 확인·승인한 뒤 아래 순서대로 실행할 것.

## 공통 원칙
- 브랜치는 두 저장소 모두 `redesign/night-1118`로만. main/master 직접 푸시·머지 금지.
- 라이브 배포 금지 (브랜치 푸시까지만, 머지·Pages 배포는 주인님 컨펌 후).
- 스냅샷 푸시는 UTF-8 텍스트 파일만 가능. 바이너리(webp·PNG)는 커넥터로 못 보냄.

## 1. 호호투어 (dongho0147-max/hoho-tour)
- 기준: main head `af07da5fd31630b1b1ce11024562e592bd4dc42c` (동기화 기록 `~/workspace/hoho-tour.muse-github-snapshot-sync.json`).
- 순서:
  1. `github call-tool --name list_branches --arguments-json '{"owner":"dongho0147-max","repo":"hoho-tour"}'` 로 `redesign/night-1118` 부재 확인.
  2. `github call-tool --name create_branch --arguments-json '{"owner":"dongho0147-max","repo":"hoho-tour","branch":"redesign/night-1118","from_branch":"main"}'`
  3. `list_commits`로 새 브랜치 head가 `af07da5...`인지 확인.
  4. 수정 경로의 sync-base 대조: 14개 동기화 경로 중 이번에 바뀌는 것은 layouts/index.html, layouts/_default/list.html, static/css/style.css, content/about.md. `get_file_contents`로 새 브랜치 head에서 각 파일 내용을 확인하고, 로컬 수정 전 내용과 같은지 대조 (divergence 있으면 중단·보고). 신규 경로는 부재 확인: layouts/_default/single.html, layouts/_default/baseof.html (로컬에만 있을 가능성 - 원격 부재면 추가, 존재하면 내용 대조), content/blog/새 글 4편, static/images/photos/CREDITS.md.
  5. 푸시 (매니페스트 `push-hohotour-paths.txt`, 11개 경로, 총 67,361바이트 UTF-8):
     `github push-files --owner dongho0147-max --repo hoho-tour --branch redesign/night-1118 --message "Homepage redesign night-1118: A-plan home, 4 new guides, 26 photos credits" --source-dir /home/hatch/workspace/hoho-tour --paths-file /home/hatch/workspace/homepage-redesign/night-1118/push-hohotour-paths.txt`
  6. 성공 시 커밋 SHA를 받아 `~/workspace/hoho-tour.muse-github-snapshot-sync.json`에 새 엔트리 추가 (기존 엔트리 유지, tmp 파일 경유 원자적 교체).
- **푸시 불가 (바이너리)**: 사진 26장(webp, 총 4.8MB) + `static/images/hoho-tour-symbol-final.png`. 이 파일들이 없으면 푸시된 브랜치의 홈 히어로·글 썸네일·로고가 404가 됨. 별도 경로 필요 (주인님 PC에서 git push, 또는 바이너리 업로드 수단). 텍스트만 푸시하고 끝내지 말 것 - 최종 보고에 명시.

## 2. 호호비전 (dongho0147-max/hohovision, PRIVATE)
- 기준: master head는 `list_commits`로 확인할 것 (로컬 기록 없음).
- 순서:
  1. `list_branches`로 `redesign/night-1118` 부재 확인.
  2. `create_branch` (`from_branch: master`).
  3. sync-base 대조: 미러의 `index-live-original.html`(md5 일치 확인됨)이 원격 master의 index.html 원본, 미러의 `css/style.css`가 원격 master의 style.css 원본. `get_file_contents`로 대조 후 진행.
  4. 푸시 (매니페스트 `push-hohovision-paths.txt`, 3개 경로, 소스 디렉토리 `~/workspace/homepage-redesign/night-1118/hohovision`):
     `github push-files --owner dongho0147-max --repo hohovision --branch redesign/night-1118 --message "Homepage redesign night-1118: A-plan home (trust/quality)" --source-dir /home/hatch/workspace/homepage-redesign/night-1118/hohovision --paths-file /home/hatch/workspace/homepage-redesign/night-1118/push-hohovision-paths.txt`
  5. 성공 시 커밋 SHA를 받아 새 동기화 기록 `~/workspace/homepage-redesign/night-1118/hohovision.muse-github-snapshot-sync.json`에 저장 (source_dir은 미러 폴더 절대경로).
- **푸시 불가 (바이너리)**: `assets/symbol_navy_transparent.png` (로고, 36KB). 미러의 index.html이 이 경로를 참조함. 원격 repo에 로고 자산이 없으면 푸시된 페이지의 로고가 404가 됨. 푸시 전 `get_file_contents`로 repo에 로고 파일이 있는지 (img/·assets/ 목록) 확인하고, 없으면 주인님 PC git 경로로 넣거나 index.html의 로고 참조를 원격 기존 자산으로 바꿀 것.
- **푸시 제외 (작업용 파일)**: index-live-original.html, tokens.json, verify.py, verify-report.json, ITERATIONS.md, captures/ - repo 파일이 아님.
- **절대 건드리지 말 것**: js/config.js (열람도 안 함), order.html, proxy/ 등 결제·주문·관리 파일.

## 참고 - 구현 완료 상태 (푸시와 무관하게 검증 완료)
- 호호투어: hugo --minify 성공 (10 pages), 게이트 5종 PASS (captures-hohotour-9/).
- 호호비전 미러: 게이트 PASS (captures-verify2/).
- Travelpayouts emrld 스크립트는 저장소 전체에 존재하지 않음 (보존할 태그 없음).
- 제휴 CTA 링크는 Klook·Agoda 일반 홈페이지 URL + "(affiliate link)" 라벨 상태. 실제 제휴 추적 URL 교체는 발행 전 주인님 확인 필요.
- 호호비전 라이브 푸터 표기 "대표 김동호 · 사업자등록번호 758-12-02672 · 충북 청주시 흥덕구 청주역로 159 9층 908호"는 verbatim 유지. 세모 MEMORY의 호호비전 사업자번호(876-12-03125)와 다름 - 주인님 확인 필요.
