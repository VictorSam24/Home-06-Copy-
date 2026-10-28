"""Cut the Apar Innosys logo off its white background.

Usage: python -E -P tools/prepare-logo.py tools/apar-logo.png

Writes public/img/apar/logo-color.png (orange mark, blue letters) for light
backgrounds and logo-reverse.png (orange mark, white letters) for dark ones.
"""
import sys
from pathlib import Path

from PIL import Image

ORANGE = (254, 89, 0)
BLUE = (1, 57, 166)
WHITE = (255, 255, 255)
MARK_RIGHT_EDGE = 0.37  # the mark sits in the left 37% of the artwork
HEIGHT = 128  # 2x the largest display height

src = Image.open(sys.argv[1]).convert('RGB')
w, h = src.size
split = int(w * MARK_RIGHT_EDGE)
out_dir = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'apar'


def cut(letter_colour):
    out = Image.new('RGBA', src.size)
    s, o = src.load(), out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = s[x, y]
            if x < split:
                # Orange has no blue, so blue's distance from white is the coverage.
                alpha = (255 - b) / 255
                colour = ORANGE
            else:
                alpha = (255 - r) / (255 - BLUE[0])
                colour = letter_colour
            o[x, y] = (*colour, round(max(0.0, min(1.0, alpha)) * 255))
    out = out.crop(out.getbbox())
    return out.resize((round(out.width * HEIGHT / out.height), HEIGHT), Image.LANCZOS)


for name, letters in (('color', BLUE), ('reverse', WHITE)):
    img = cut(letters)
    img.save(out_dir / f'logo-{name}.png', optimize=True)
    img.save(out_dir / f'logo-{name}.webp', lossless=True)
    print(name, img.size)
