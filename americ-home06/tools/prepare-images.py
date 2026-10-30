"""Write WebP + JPEG versions of the Apar photos at 960 and 1600px wide
into public/img/apar/. Sources live in tools/source-images/ so the
full-size PNGs are not shipped with the site.

Run: python -E -P tools/prepare-images.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "source-images"
OUT = ROOT.parent / "public" / "img" / "apar"
# source file -> published name (homepage hero; IoT hero + homepage banner)
NAMES = {"Apar_dark.png": "cameras", "Apar_iot_dark.png": "lens"}
WIDTHS = (960, 1600)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for file, name in NAMES.items():
        src = Image.open(SRC / file).convert("RGB")
        for w in WIDTHS:
            h = round(src.height * w / src.width)
            img = src.resize((w, h), Image.LANCZOS)
            img.save(OUT / f"{name}-{w}.webp", "WEBP", quality=80, method=6)
            img.save(OUT / f"{name}-{w}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
        print(name, src.size)


if __name__ == "__main__":
    main()
