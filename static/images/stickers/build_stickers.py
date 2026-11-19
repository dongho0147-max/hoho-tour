#!/usr/bin/env python3
"""Build Semo sticker set: chroma-key green base -> transparent sticker
with white outline + English label, 10-frame gentle bounce animated WebP
+ still PNG (frame 0). Canvas 320x320. Target: each WebP <= 200KB."""
import math, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SRC = os.path.expanduser("~/workspace/hoho-tour-revamp/work/static/images/stickers/src")
OUT = os.path.expanduser("~/workspace/hoho-tour-revamp/work/static/images/stickers")
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
SIZE = 320
FRAMES = 10
DUR = 100  # ms per frame

STICKERS = [
    ("lets-go",     "media-generation-semo-lets-go-base-0-ac05dfc9-8b17-4487-b1a0-ce8d656f3e8c.png", "Let's go!"),
    ("yum",         "media-generation-semo-yum-base-0-1615adaa-7540-44b8-82e3-832143501402.png",     "Yum!"),
    ("pro-tip",     "media-generation-semo-pro-tip-base-0-e599ed2e-02db-4cd8-9095-b843c15efbff.png", "Pro Tip!"),
    ("must-visit",  "media-generation-semo-must-visit-base-0-2a6e0b36-f886-44d9-bc78-469be0792a4f.png", "Must Visit!"),
    ("tired-rest",  "media-generation-semo-tired-rest-base-0-e6e041b4-0080-4d88-99e4-9228472b0317.png", "Tired\u00b7Rest"),
    ("photo-spot",  "media-generation-semo-photo-spot-base-0-dfd4859a-6a7d-491a-9e99-9b94c0a55991.png", "Photo Spot!"),
]

def chroma_key(im):
    """Remove pure-green background -> RGBA with feathered alpha + despill."""
    rgb = np.asarray(im.convert("RGB")).astype(np.float32)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    dist = np.sqrt(r**2 + (g - 255.0)**2 + b**2)
    alpha = np.clip((dist - 45.0) / (95.0 - 45.0), 0.0, 1.0)
    # despill: pull green channel down toward max(R,B) where semi-transparent
    cap = np.maximum(r, b) + 25.0
    g2 = np.where(g > cap, cap + (g - cap) * 0.25, g)
    out = np.dstack([r, g2, b, alpha * 255.0]).astype(np.uint8)
    rgba = Image.fromarray(out, "RGBA")
    # slight blur on alpha for smooth fur edge
    a = rgba.split()[3].filter(ImageFilter.GaussianBlur(0.6))
    rgba.putalpha(a)
    return rgba

def white_outline(rgba, px=7):
    """Return RGBA with a white sticker outline around the alpha mask."""
    a = rgba.split()[3]
    dil = a.filter(ImageFilter.MaxFilter(px * 2 + 1))
    outline = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    outline.putalpha(dil)
    canvas = Image.new("RGBA", rgba.size, (0, 0, 0, 0))
    canvas.alpha_composite(outline)
    canvas.alpha_composite(rgba)
    return canvas

def build_one(slug, src_file, label, gentle=False):
    base = Image.open(os.path.join(SRC, src_file))
    cut = chroma_key(base)
    bbox = cut.getbbox()
    cut = cut.crop(bbox)
    # white outline on the cropped cutout
    cut = white_outline(cut, px=6)
    # fit into 296x238 box (label zone below)
    cut.thumbnail((296, 238), Image.LANCZOS)
    # compose static sticker layer (cat + label), 320x320
    layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    cx = (SIZE - cut.width) // 2
    cy = (238 - cut.height) // 2 + 4
    layer.alpha_composite(cut, (cx, cy))
    d = ImageDraw.Draw(layer)
    font = ImageFont.truetype(FONT, 30)
    # shrink font if label too wide
    while d.textlength(label, font=font) > 300 and font.size > 18:
        font = ImageFont.truetype(FONT, font.size - 2)
    tw = d.textlength(label, font=font)
    d.text(((SIZE - tw) / 2, 256), label, font=font, fill=(58, 42, 30, 255),
           stroke_width=5, stroke_fill=(255, 255, 255, 255))
    # frames: gentle bounce (tired-rest breathes slower / subtler)
    frames = []
    amp_y = 2.0 if gentle else 4.0
    amp_r = 1.0 if gentle else 1.8
    amp_s = 0.012 if gentle else 0.02
    for i in range(FRAMES):
        ph = 2 * math.pi * i / FRAMES
        dy = -amp_y * math.sin(ph)
        rot = amp_r * math.sin(ph + 0.6)   # phase-shifted so no two frames coincide
        sc = 1.0 + amp_s * math.sin(ph + 1.1)
        w = int(SIZE * sc)
        f = layer.resize((w, w), Image.LANCZOS)
        f = f.rotate(rot, resample=Image.BICUBIC, center=(w / 2, w / 2))
        canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
        ox = (SIZE - f.width) // 2
        oy = (SIZE - f.height) // 2 + int(round(dy))
        canvas.alpha_composite(f, (ox, oy))
        frames.append(canvas)
    # still PNG = frame 0 (neutral pose, sin(0)=0)
    frames[0].save(os.path.join(OUT, f"semo-{slug}.png"), optimize=True)
    # animated WebP, shrink quality until <= 200KB
    outp = os.path.join(OUT, f"semo-{slug}.webp")
    q = 85
    while True:
        frames[0].save(outp, save_all=True, append_images=frames[1:],
                       duration=DUR, loop=0, quality=q, method=6)
        if os.path.getsize(outp) <= 200 * 1024 or q <= 40:
            break
        q -= 10
    return outp, q

for slug, src_file, label in STICKERS:
    p, q = build_one(slug, src_file, label, gentle=(slug == "tired-rest"))
    print(slug, os.path.getsize(p), "bytes quality", q)

print("done")
