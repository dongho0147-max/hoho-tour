#!/usr/bin/env python3
"""Rebuild Semo sticker set from the authentic character sheet (2026-11-06).
Sources: 4 original PNGs from the character-sheet folder + 3 newly generated
PNGs (same sheet style). Output: 320x320 white-background still PNG +
4-frame animated WebP (cat fixed, sparkles blink only), each <= 200KB.
No text is composited into the images (kind is alt text / shortcode only)."""
import math, os
from PIL import Image, ImageDraw

ORIG = "/home/hatch/workspace/goals/goal-8/files/세모_캐릭터시트/스티커"
NEW = "/home/hatch/workspace/hoho-tour-revamp/work/static/images/stickers/src-new"
OUT = "/home/hatch/workspace/hoho-tour-revamp/work/static/images/stickers"

KINDS = [
    ("lets-go",    os.path.join(ORIG, "semo_sticker_03_travel.png")),
    ("yum",        os.path.join(NEW, "media-generation-semo-yum-new-0-b9c23f40-1b29-4c80-bda6-a784a193ae5a.png")),
    ("pro-tip",    os.path.join(ORIG, "semo_sticker_02_checklist.png")),
    ("must-visit", os.path.join(ORIG, "semo_sticker_04_curious.png")),
    ("tired-rest", os.path.join(NEW, "media-generation-semo-tired-rest-new-0-d10269d0-f140-4d50-835e-e8265296dd43.png")),
    ("photo-spot", os.path.join(NEW, "media-generation-semo-photo-spot-new-0-fe16af30-1705-4a23-b467-6f03438719e6.png")),
]

SIZE = 320
FIT = 296
PAD = 16
FRAMES = 4
DURATION_MS = 300
ANCHORS = [(0.10, 0.10), (0.90, 0.12), (0.06, 0.55), (0.93, 0.55),
           (0.12, 0.90), (0.88, 0.88), (0.50, 0.05)]

def trim_white(img):
    gray = img.convert("L")
    px = gray.load()
    w, h = gray.size
    xs, ys = [], []
    step = max(1, min(w, h) // 200)
    for y in range(0, h, step):
        for x in range(0, w, step):
            if px[x, y] < 248:
                xs.append(x); ys.append(y)
    if not xs:
        return img
    box = (max(0, min(xs) - PAD), max(0, min(ys) - PAD),
           min(w, max(xs) + PAD), min(h, max(ys) + PAD))
    return img.crop(box)

def star_points(cx, cy, r_outer, r_inner):
    pts = []
    for i in range(8):
        ang = math.pi / 2 + i * math.pi / 4
        r = r_outer if i % 2 == 0 else r_inner
        pts.append((cx + r * math.cos(ang), cy - r * math.sin(ang)))
    return pts

def is_white_patch(img, cx, cy, half=8):
    x0, y0 = max(0, cx - half), max(0, cy - half)
    x1, y1 = min(img.width, cx + half), min(img.height, cy + half)
    patch = img.crop((x0, y0, x1, y1)).convert("L")
    vals = list(patch.getdata())
    return sum(vals) / len(vals) > 245

def build(slug, src):
    img = Image.open(src).convert("RGB")
    img = trim_white(img)
    img.thumbnail((FIT, FIT), Image.LANCZOS)
    base = Image.new("RGB", (SIZE, SIZE), (255, 255, 255))
    base.paste(img, ((SIZE - img.width) // 2, (SIZE - img.height) // 2))
    w, h = SIZE, SIZE
    anchors = []
    for i, (fx, fy) in enumerate(ANCHORS):
        cx, cy = int(w * fx), int(h * fy)
        if is_white_patch(base, cx, cy):
            anchors.append((cx, cy, i))
        if len(anchors) >= 5:
            break
    frames = []
    for f in range(FRAMES):
        overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        d = ImageDraw.Draw(overlay)
        for j, (cx, cy, idx) in enumerate(anchors):
            ph = (f / FRAMES + idx * 0.37) % 1.0
            tw = 0.5 + 0.5 * math.sin(2 * math.pi * ph)
            alpha = int(70 + 185 * tw)
            r_out = 7 + 6 * tw
            color = (244, 168, 188, alpha) if j == 0 else (150, 150, 150, alpha)
            d.polygon(star_points(cx, cy, r_out, r_out * 0.22), fill=color)
        frames.append(Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB"))
    png_path = os.path.join(OUT, f"semo-{slug}.png")
    webp_path = os.path.join(OUT, f"semo-{slug}.webp")
    frames[0].save(png_path, optimize=True)
    q = 85
    while True:
        frames[0].save(webp_path, save_all=True, append_images=frames[1:],
                       duration=DURATION_MS, loop=0, quality=q, method=6)
        if os.path.getsize(webp_path) <= 200 * 1024 or q <= 40:
            break
        q -= 10
    return png_path, webp_path, q

for slug, src in KINDS:
    pp, wp, q = build(slug, src)
    print(f"{slug}: png={os.path.getsize(pp)}B webp={os.path.getsize(wp)}B q={q}")
print("done")
