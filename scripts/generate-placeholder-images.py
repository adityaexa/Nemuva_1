#!/usr/bin/env python3
"""
Nemuva — original placeholder image generator
------------------------------------------------------------------------
Generates warm, brand-toned ABSTRACT artwork (gradients, soft organic
shapes, pond-ripple motifs, scattered "seed" forms) for every image the
site references under /public/images. Nothing here is a photograph, a
stock image, or derived from any third-party or reference website —
every pixel is procedurally drawn so the result is safe to ship and easy
to swap for real Nemuva photography later.

Usage:
    python3 scripts/generate-placeholder-images.py

Requires: Pillow (pip install Pillow)

Replace any file this script writes with real, licensed photography by
saving a new file over the same path in /public/images — no code changes
are needed, since every component reads image paths from data files.
"""
import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter, ImageFont

random.seed(7)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "images")
os.makedirs(OUT_DIR, exist_ok=True)

# ---- Brand palette -------------------------------------------------------
CREAM = (251, 246, 238)
CREAM_DARK = (243, 233, 215)
BEIGE = (232, 217, 190)
BEIGE_DARK = (216, 194, 156)
BROWN_50 = (246, 238, 228)
BROWN_100 = (231, 211, 184)
BROWN_300 = (185, 138, 84)
BROWN_500 = (138, 90, 46)
BROWN_700 = (92, 58, 30)
BROWN_900 = (58, 36, 20)
GREEN_50 = (238, 242, 232)
GREEN_300 = (124, 154, 107)
GREEN_500 = (75, 107, 62)
GREEN_700 = (51, 73, 42)
GREEN_900 = (32, 46, 26)
GOLD_300 = (233, 197, 107)
GOLD_500 = (199, 154, 62)
GOLD_700 = (150, 115, 31)
INK = (43, 33, 24)

FONT_CANDIDATES = [
    "/mnt/skills/examples/canvas-design/canvas-fonts/YoungSerif-Regular.ttf",
    "/mnt/skills/examples/canvas-design/canvas-fonts/InstrumentSans-Regular.ttf",
]


def load_font(size):
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def vertical_gradient(size, top, bottom):
    w, h = size
    base = Image.new("RGB", (1, h))
    for y in range(h):
        base.putpixel((0, y), lerp(top, bottom, y / max(h - 1, 1)))
    return base.resize((w, h))


def radial_gradient(size, inner, outer, center=None, radius_scale=0.75):
    w, h = size
    cx, cy = center or (w / 2, h / 2)
    max_r = math.hypot(max(cx, w - cx), max(cy, h - cy)) * radius_scale
    img = Image.new("RGB", size, outer)
    px = img.load()
    step = 2  # sample every 2px then upscale-ish for speed
    for y in range(0, h, step):
        for x in range(0, w, step):
            d = math.hypot(x - cx, y - cy) / max_r
            d = min(d, 1)
            color = lerp(inner, outer, d)
            for yy in range(y, min(y + step, h)):
                for xx in range(x, min(x + step, w)):
                    px[xx, yy] = color
    return img


def add_grain(img, amount=6):
    w, h = img.size
    noise = Image.effect_noise((w, h), amount).convert("L")
    noise_rgb = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(img, noise_rgb, 0.03)


def add_caption(img, text):
    draw = ImageDraw.Draw(img, "RGBA")
    font = load_font(max(14, img.width // 55))
    padding = 10
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = img.width - tw - padding * 2 - 14
    y = img.height - th - padding * 2 - 14
    draw.rounded_rectangle(
        [x, y, x + tw + padding * 2, y + th + padding * 2],
        radius=8,
        fill=(20, 15, 10, 110),
    )
    draw.text((x + padding, y + padding - bbox[1]), text, font=font, fill=(255, 250, 240, 230))
    return img


def seed_ellipse(draw, cx, cy, w, h, angle, fill, shade):
    """Draws one Makhana-like puffed seed as a soft, shaded ellipse."""
    seed = Image.new("RGBA", (int(w * 1.6), int(h * 1.6)), (0, 0, 0, 0))
    sd = ImageDraw.Draw(seed)
    bbox = [seed.width * 0.3, seed.height * 0.3, seed.width * 0.3 + w, seed.height * 0.3 + h]
    sd.ellipse(bbox, fill=fill)
    # highlight
    hl_w, hl_h = w * 0.45, h * 0.35
    hl_x = bbox[0] + w * 0.15
    hl_y = bbox[1] + h * 0.12
    sd.ellipse([hl_x, hl_y, hl_x + hl_w, hl_y + hl_h], fill=(255, 255, 255, 70))
    # shade
    sh_w, sh_h = w * 0.5, h * 0.35
    sh_x = bbox[0] + w * 0.35
    sh_y = bbox[1] + h * 0.55
    sd.ellipse([sh_x, sh_y, sh_x + sh_w, sh_y + sh_h], fill=shade)
    seed = seed.filter(ImageFilter.GaussianBlur(1))
    seed = seed.rotate(angle, expand=True)
    draw._image.alpha_composite(seed, (int(cx - seed.width / 2), int(cy - seed.height / 2)))


class AlphaCanvas:
    """Small helper so seed_ellipse can alpha_composite onto a base image."""

    def __init__(self, base):
        self._image = base.convert("RGBA")

    def get(self):
        return self._image


def scattered_seeds(size, bg_top, bg_bottom, seed_fill, seed_shade, count=90, min_r=18, max_r=46, caption=None):
    w, h = size
    base = vertical_gradient(size, bg_top, bg_bottom).convert("RGBA")
    canvas = AlphaCanvas(base)
    fake_draw = type("D", (), {"_image": canvas.get()})()
    for _ in range(count):
        r = random.uniform(min_r, max_r)
        cx = random.uniform(-r, w + r)
        cy = random.uniform(-r, h + r)
        angle = random.uniform(0, 360)
        seed_ellipse(fake_draw, cx, cy, r * 1.5, r, angle, seed_fill, seed_shade)
    img = canvas.get().convert("RGB")
    img = img.filter(ImageFilter.GaussianBlur(0.4))
    img = add_grain(img)
    if caption:
        img = add_caption(img.convert("RGB"), caption)
    return img.convert("RGB")


def bowl_scene(size, bg_top, bg_bottom, bowl_color, seed_fill, seed_shade, caption=None):
    w, h = size
    img = vertical_gradient(size, bg_top, bg_bottom).convert("RGBA")
    draw = ImageDraw.Draw(img)
    # table shadow
    table_y = int(h * 0.62)
    draw.ellipse([w * 0.08, table_y, w * 0.92, h * 1.05], fill=bowl_color + (255,))
    draw.ellipse([w * 0.14, table_y - h * 0.05, w * 0.86, table_y + h * 0.22], fill=tuple(min(255, c + 18) for c in bowl_color) + (255,))
    canvas = AlphaCanvas(img)
    fake_draw = type("D", (), {"_image": canvas.get()})()
    cx0, cy0 = w * 0.5, table_y + h * 0.02
    for _ in range(140):
        r = random.uniform(16, 34)
        angle_pos = random.uniform(0, 2 * math.pi)
        radius_pos = random.uniform(0, w * 0.32)
        cx = cx0 + math.cos(angle_pos) * radius_pos
        cy = cy0 + math.sin(angle_pos) * radius_pos * 0.4
        seed_ellipse(fake_draw, cx, cy, r * 1.5, r, random.uniform(0, 360), seed_fill, seed_shade)
    out = canvas.get().convert("RGB")
    out = add_grain(out)
    if caption:
        out = add_caption(out, caption)
    return out


def pond_scene(size, sky_top, sky_bottom, water_top, water_color, leaf_color, caption=None):
    w, h = size
    horizon = int(h * 0.38)
    img = Image.new("RGB", size, sky_top)
    sky = vertical_gradient((w, horizon), sky_top, sky_bottom)
    img.paste(sky, (0, 0))
    water = vertical_gradient((w, h - horizon), water_top, water_color)
    img.paste(water, (0, horizon))
    draw = ImageDraw.Draw(img, "RGBA")
    # ripple lines
    for i in range(14):
        y = horizon + int((h - horizon) * (i / 14) ** 1.3)
        alpha = max(10, 70 - i * 4)
        amp = 6 + i * 0.6
        points = []
        for x in range(0, w + 20, 20):
            points.append((x, y + math.sin((x / 60) + i) * amp))
        draw.line(points, fill=(255, 255, 255, alpha), width=2)
    # lily-pad style leaves
    for _ in range(22):
        lx = random.uniform(0, w)
        ly = random.uniform(horizon + 20, h - 20)
        lr = random.uniform(18, 46)
        draw.ellipse([lx - lr, ly - lr * 0.5, lx + lr, ly + lr * 0.5], fill=leaf_color + (200,))
    img = img.filter(ImageFilter.GaussianBlur(0.3))
    img = add_grain(img)
    if caption:
        img = add_caption(img, caption)
    return img


def field_scene(size, sky_top, sky_bottom, field_near, field_far, caption=None):
    w, h = size
    horizon = int(h * 0.42)
    img = Image.new("RGB", size, sky_top)
    sky = vertical_gradient((w, horizon), sky_top, sky_bottom)
    img.paste(sky, (0, 0))
    field = vertical_gradient((w, h - horizon), field_far, field_near)
    img.paste(field, (0, horizon))
    draw = ImageDraw.Draw(img, "RGBA")
    for i in range(9):
        band_y = horizon + int((h - horizon) * (i / 9))
        shade = lerp(field_far, field_near, i / 9)
        draw.line([(0, band_y), (w, band_y - 10)], fill=shade + (60,), width=6)
    # soft sun glow
    glow = radial_gradient((w, horizon + 40), (255, 245, 220), sky_top, center=(w * 0.78, horizon * 0.3), radius_scale=0.6)
    glow = glow.convert("RGBA")
    glow.putalpha(90)
    img.paste(glow, (0, 0), glow)
    img = img.filter(ImageFilter.GaussianBlur(0.4))
    img = add_grain(img)
    if caption:
        img = add_caption(img, caption)
    return img


def packaging_mock(size, bg_top, bg_bottom, pack_color, accent, label, caption=None):
    w, h = size
    img = vertical_gradient(size, bg_top, bg_bottom).convert("RGBA")
    draw = ImageDraw.Draw(img)
    pack_w, pack_h = w * 0.42, h * 0.62
    px, py = (w - pack_w) / 2, (h - pack_h) / 2
    shadow = Image.new("RGBA", size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle([px + 14, py + 24, px + pack_w + 14, py + pack_h + 24], radius=36, fill=(0, 0, 0, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    img.alpha_composite(shadow)
    draw.rounded_rectangle([px, py, px + pack_w, py + pack_h], radius=36, fill=pack_color + (255,))
    draw.rounded_rectangle([px, py, px + pack_w, py + pack_h * 0.22], radius=36, fill=accent + (255,))
    draw.rectangle([px, py + pack_h * 0.12, px + pack_w, py + pack_h * 0.22], fill=accent + (255,))
    # simple wordmark
    font = load_font(int(pack_w * 0.13))
    text = "NEMUVA"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text((px + (pack_w - tw) / 2, py + pack_h * 0.32), text, font=font, fill=BROWN_900)
    small_font = load_font(int(pack_w * 0.07))
    bbox2 = draw.textbbox((0, 0), label, font=small_font)
    tw2 = bbox2[2] - bbox2[0]
    draw.text((px + (pack_w - tw2) / 2, py + pack_h * 0.46), label, font=small_font, fill=BROWN_700)
    # a few seed dots for texture
    canvas = AlphaCanvas(img)
    fake_draw = type("D", (), {"_image": canvas.get()})()
    for _ in range(10):
        r = random.uniform(10, 18)
        cx = px + random.uniform(pack_w * 0.2, pack_w * 0.8)
        cy = py + pack_h * random.uniform(0.62, 0.85)
        seed_ellipse(fake_draw, cx, cy, r * 1.5, r, random.uniform(0, 360), CREAM, BEIGE_DARK)
    out = canvas.get().convert("RGB")
    out = add_grain(out)
    if caption:
        out = add_caption(out, caption)
    return out


def texture_closeup(size, bg_top, bg_bottom, seed_fill, seed_shade, caption=None):
    return scattered_seeds(size, bg_top, bg_bottom, seed_fill, seed_shade, count=46, min_r=60, max_r=140, caption=caption)


def grade_card(size, seed_fill, seed_shade, scale, caption=None):
    w, h = size
    img = vertical_gradient(size, CREAM, BEIGE).convert("RGBA")
    canvas = AlphaCanvas(img)
    fake_draw = type("D", (), {"_image": canvas.get()})()
    rows, cols = 3, 4
    for row in range(rows):
        for col in range(cols):
            cx = w * (col + 0.5) / cols + random.uniform(-8, 8)
            cy = h * (row + 0.5) / rows + random.uniform(-8, 8)
            r = 22 * scale
            seed_ellipse(fake_draw, cx, cy, r * 1.6, r, random.uniform(0, 360), seed_fill, seed_shade)
    out = canvas.get().convert("RGB")
    out = add_grain(out)
    if caption:
        out = add_caption(out, caption)
    return out


def save(img, name, quality=82):
    path = os.path.join(OUT_DIR, name)
    img.convert("RGB").save(path, "JPEG", quality=quality, optimize=True)
    print(f"wrote {name}  ({img.width}x{img.height})")


# ============================================================================
# GENERATE — each entry maps a required /public/images path to a scene
# ============================================================================

SQ = (1400, 1400)
PORTRAIT = (1400, 1750)
WIDE = (1600, 1000)
CARD = (1000, 750)

jobs = []

jobs.append((bowl_scene(PORTRAIT, CREAM, CREAM_DARK, BEIGE_DARK, CREAM, BEIGE_DARK, "Nemuva — placeholder artwork"), "hero-makhana.jpg"))

# Category tiles (portrait 4:5)
CAT = (900, 1125)
jobs.append((scattered_seeds(CAT, CREAM, BEIGE, CREAM, BEIGE_DARK, count=70, caption="Raw Makhana"), "category-raw-makhana.jpg"))
jobs.append((scattered_seeds(CAT, BROWN_50, BEIGE, CREAM, BROWN_300, count=70, caption="Premium Makhana"), "category-premium-makhana.jpg"))
jobs.append((scattered_seeds(CAT, BROWN_100, BROWN_300, BROWN_300, BROWN_700, count=70, caption="Roasted Makhana"), "category-roasted-makhana.jpg"))
jobs.append((scattered_seeds(CAT, GOLD_300, BROWN_300, GOLD_300, BROWN_700, count=70, caption="Flavoured Makhana"), "category-flavoured-makhana.jpg"))
jobs.append((packaging_mock(CAT, GREEN_50, BEIGE, GREEN_700, GOLD_500, "FAMILY PACK", "Family Pack"), "category-family-pack.jpg"))
jobs.append((packaging_mock(CAT, BROWN_50, BEIGE_DARK, BROWN_700, GREEN_700, "BULK PACK", "Bulk Pack"), "category-bulk-pack.jpg"))

# Product images (square)
jobs.append((scattered_seeds(SQ, CREAM, BEIGE, CREAM, BEIGE_DARK, count=110), "product-raw-makhana-1.jpg"))
jobs.append((bowl_scene(SQ, CREAM, CREAM_DARK, BEIGE, CREAM, BEIGE_DARK), "product-raw-makhana-2.jpg"))

jobs.append((scattered_seeds(SQ, BROWN_50, BEIGE, CREAM, BROWN_300, count=100, min_r=24, max_r=52), "product-premium-makhana-1.jpg"))
jobs.append((bowl_scene(SQ, BROWN_50, BEIGE, BROWN_300, CREAM, BROWN_500), "product-premium-makhana-2.jpg"))

jobs.append((bowl_scene(SQ, BROWN_100, BROWN_300, BROWN_500, BROWN_100, BROWN_900), "product-roasted-salt-1.jpg"))
jobs.append((scattered_seeds(SQ, BROWN_100, BROWN_300, BROWN_100, BROWN_700, count=100), "product-roasted-salt-2.jpg"))

jobs.append((bowl_scene(SQ, GOLD_300, BROWN_300, BROWN_500, GOLD_300, BROWN_900), "product-peri-peri-1.jpg"))
jobs.append((scattered_seeds(SQ, GOLD_300, BROWN_300, GOLD_300, BROWN_700, count=100), "product-peri-peri-2.jpg"))

jobs.append((bowl_scene(SQ, BEIGE, BROWN_300, BROWN_500, BEIGE, BROWN_700), "product-tangy-masala-1.jpg"))
jobs.append((scattered_seeds(SQ, BEIGE, BROWN_300, BEIGE, BROWN_700, count=100), "product-tangy-masala-2.jpg"))

jobs.append((packaging_mock(SQ, GREEN_50, BEIGE, GREEN_700, GOLD_500, "FAMILY JAR"), "product-family-jar-1.jpg"))
jobs.append((bowl_scene(SQ, GREEN_50, BEIGE, GREEN_300, CREAM, BROWN_500), "product-family-jar-2.jpg"))

jobs.append((scattered_seeds(SQ, CREAM, BEIGE, CREAM, BEIGE_DARK, count=90, min_r=16, max_r=34), "product-raw-4suta-1.jpg"))
jobs.append((bowl_scene(SQ, CREAM, BEIGE, BEIGE_DARK, CREAM, BEIGE_DARK), "product-raw-4suta-2.jpg"))

jobs.append((packaging_mock(SQ, BROWN_50, BEIGE_DARK, BROWN_700, GREEN_700, "BULK 5KG"), "product-bulk-5kg-1.jpg"))
jobs.append((scattered_seeds(SQ, BROWN_50, BEIGE_DARK, CREAM, BROWN_500, count=130), "product-bulk-5kg-2.jpg"))

# Blog / journal (wide 16:10-ish -> use CARD-like 16:10)
BLOG = (1280, 800)
jobs.append((bowl_scene(BLOG, CREAM, BEIGE, BEIGE_DARK, CREAM, BEIGE_DARK, "Nemuva Journal"), "blog-what-is-makhana.jpg"))
jobs.append((field_scene(BLOG, (214, 232, 214), GREEN_50, GREEN_300, GREEN_700, "Nemuva Journal"), "blog-makhana-farming.jpg"))
jobs.append((grade_card(BLOG, CREAM, BEIGE_DARK, 1.3, "Nemuva Journal"), "blog-suta-grading.jpg"))
jobs.append((packaging_mock(BLOG, CREAM, BEIGE, BROWN_700, GOLD_500, "STORAGE TIPS", "Nemuva Journal"), "blog-storage-tips.jpg"))
jobs.append((scattered_seeds(BLOG, BEIGE, BROWN_300, CREAM, BROWN_700, count=90, caption="Nemuva Journal"), "blog-roasted-vs-raw.jpg"))
jobs.append((bowl_scene(BLOG, GOLD_300, BROWN_300, BROWN_500, GOLD_300, BROWN_900, "Nemuva Journal"), "blog-recipes.jpg"))
jobs.append((pond_scene(BLOG, (198, 222, 227), (233, 244, 231), GREEN_300, GREEN_900, GREEN_500, "Nemuva Journal"), "blog-farm-to-kitchen.jpg"))
jobs.append((scattered_seeds(BLOG, CREAM, BEIGE, CREAM, BEIGE_DARK, count=90, caption="Nemuva Journal"), "blog-choosing-quality.jpg"))

# Story / landscape imagery
jobs.append((field_scene(WIDE, (200, 222, 224), (223, 236, 214), GREEN_300, GREEN_900, "Bihar, India"), "bihar-landscape.jpg"))
jobs.append((pond_scene(SQ, (198, 222, 227), (233, 244, 231), GREEN_300, GREEN_900, GREEN_500), "makhana-pond.jpg"))
jobs.append((field_scene(SQ, (214, 227, 205), GREEN_50, GREEN_500, GREEN_900, "Harvest Season"), "farmer-harvest.jpg"))
jobs.append((packaging_mock(CARD, CREAM, BEIGE, CREAM_DARK, GREEN_700, "PRIVATE LABEL"), "private-label-packaging.jpg"))
jobs.append((packaging_mock(CARD, BROWN_50, BEIGE_DARK, BROWN_700, GOLD_500, "EXPORT READY"), "export-packaging.jpg"))
jobs.append((bowl_scene(CARD, GREEN_50, BEIGE, BEIGE_DARK, CREAM, BEIGE_DARK, "Everyday Snacking"), "family-snacking.jpg"))

# Grade comparison cards
jobs.append((grade_card(CARD, CREAM, BEIGE_DARK, 0.85, "4 Suta"), "grade-4-suta.jpg"))
jobs.append((grade_card(CARD, CREAM, BROWN_300, 1.05, "5 Suta"), "grade-5-suta.jpg"))
jobs.append((grade_card(CARD, CREAM, BROWN_500, 1.3, "6 Suta"), "grade-6-suta.jpg"))

jobs.append((packaging_mock(CARD, BROWN_50, BEIGE_DARK, BROWN_700, GREEN_700, "BULK SUPPLY"), "bulk-makhana-crates.jpg"))
jobs.append((texture_closeup(CARD, CREAM, BEIGE, CREAM, BEIGE_DARK), "raw-makhana-closeup.jpg"))
jobs.append((scattered_seeds(CARD, BEIGE, BROWN_300, CREAM, BROWN_700, count=90, caption="Processing"), "makhana-processing.jpg"))
jobs.append((grade_card(CARD, CREAM, BROWN_300, 1.1, "Grading"), "makhana-grading.jpg"))

for img, name in jobs:
    save(img, name)

# ---- Simple original wordmark logo (used only as a schema.org reference) --
logo = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
ld = ImageDraw.Draw(logo)
ld.ellipse([10, 10, 502, 502], outline=GREEN_700, width=10)
ld.line([(150, 350), (150, 170), (256, 300), (362, 170), (362, 350)], fill=GREEN_700, width=18, joint="curve")
ld.ellipse([236, 120, 276, 160], fill=GOLD_500)
logo.save(os.path.join(OUT_DIR, "nemuva-logo.png"))
print("wrote nemuva-logo.png")

print(f"\nDone — {len(jobs) + 1} images written to {OUT_DIR}")
