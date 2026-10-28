"""Extract the two images from the Apar content DOCX and write
WebP + JPEG versions at 960 and 1600px wide into public/img/apar/.

Run: python -E -P tools/prepare-images.py "D:/CDownloads/Apar Content - Headline Options.docx"
"""
import io
import sys
import zipfile
from pathlib import Path

from PIL import Image

OUT = Path(__file__).resolve().parent.parent / "public" / "img" / "apar"
NAMES = {"word/media/image1.png": "cameras", "word/media/image2.png": "lens"}
WIDTHS = (960, 1600)


def main(docx_path):
    OUT.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(docx_path) as z:
        for member, name in NAMES.items():
            src = Image.open(io.BytesIO(z.read(member))).convert("RGB")
            for w in WIDTHS:
                h = round(src.height * w / src.width)
                img = src.resize((w, h), Image.LANCZOS)
                img.save(OUT / f"{name}-{w}.webp", "WEBP", quality=80, method=6)
                img.save(OUT / f"{name}-{w}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
            print(name, src.size)


if __name__ == "__main__":
    main(sys.argv[1])
