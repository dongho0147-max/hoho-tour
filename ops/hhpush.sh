#!/bin/bash
# Usage: hhpush.sh REPO_DIR "commit message" [URLPATH ...]
# Needs the GitHub token file written by (tools box): tools vault write-file --key password --name "GitHub hoho-tour token" --return-channel whatsapp --json
# Commits all changes in REPO_DIR, rebases onto origin/main, builds (must be 0 errors), pushes to main, deletes token file,
# waits for deploy, then GETs each URLPATH on https://hoho-tour.com and prints status + <title>.
set -u
REPO=$1; MSG=$2; shift 2
F=/home/sandbox/.vault/github-hoho-tour-token-0d81c5/password
[ -r "$F" ] || { echo "no token file: run vault write-file in the tools box first"; exit 1; }
B=$(printf 'x-access-token:%s' "$(cat $F)" | base64 -w0)
trap 'rm -f $F' EXIT
cd "$REPO" || exit 1
git add -A
git diff --cached --quiet || git -c user.name="HOHO Instinct" -c user.email=hohotour2026@gmail.com commit -q -m "$MSG"
git -c http.extraheader="Authorization: Basic $B" pull -q --rebase origin main || { echo "REBASE FAILED"; exit 1; }
OUT=$(/tmp/hg/hugo --minify -d /tmp/pub-push 2>&1)
echo "$OUT" | grep -E "Pages" 
if echo "$OUT" | grep -q "^ERROR"; then echo "$OUT" | grep "^ERROR"; echo "BUILD ERRORS: not pushed"; exit 1; fi
git -c http.extraheader="Authorization: Basic $B" push origin HEAD:main 2>&1 | tail -1
rm -f $F
SHA=$(git rev-parse --short HEAD); echo "pushed $SHA"
sleep 30
for p in "$@"; do
  curl -s -o /tmp/pv.html -w "%{http_code} $p " "https://hoho-tour.com$p"; grep -o '<title>[^<]*' /tmp/pv.html | head -1
done
