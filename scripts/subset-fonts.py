#!/usr/bin/env python3
"""
Subset IBM Plex to just what a Persian watch catalogue needs, and write the
result to public/fonts/.

Run once, commit the output. This is deliberately NOT part of `npm run build`:
the build must work on a laptop with no Python, and the fonts change roughly
never. Re-run by hand if the character set ever needs to grow.

    python3 scripts/subset-fonts.py

Why subset at all: the complete Plex Sans Arabic covers Arabic, Urdu and
extended ranges this site will never render. Fonts are the largest non-image
item in the byte budget, and the audience is on a throttled connection.

Why only three faces: Plex Sans Arabic covers the full ASCII range and Latin
extras, so a separate Latin family would be dead weight. Plex Mono is kept
only for reference numbers, which are always ASCII.

Requires: pip install fonttools brotli
"""

import os
import sys

try:
    from fontTools.subset import main as subset_main
except ImportError:
    sys.exit("fontTools not installed. Run: pip install fonttools brotli")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "fonts")

# --- the character set -------------------------------------------------------

# Persian alphabet, in its own right
PERSIAN = "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی"
# Forms that appear in real Persian text
PERSIAN_EXTRA = "آأإؤئةءًٌٍَُِّْٰـ"
# Arabic lookalikes. Content is normalised, but user-supplied or pasted text
# may still contain these and must not render as tofu.
ARABIC_LOOKALIKE = "كيى"
# Persian and Arabic-Indic digits. Both appear in the wild; the shop's own
# Instagram bio mixes them.
DIGITS = "".join(chr(0x06F0 + i) for i in range(10))
DIGITS += "".join(chr(0x0660 + i) for i in range(10))
# Persian punctuation. NOTE: these live ONLY in the Arabic face, not in
# Plex Sans or Plex Mono, which is why the Arabic face is the base family.
PUNCT = "،؛؟«»٫٬٪ـ"
# Zero-width non-joiner (نیم‌فاصله). Fonts carry no glyph for it, the shaper
# handles joining, but include it so the subsetter does not drop related
# joining behaviour.
ZWNJ = "‌‍‎‏"
# Latin: full printable ASCII, for brand names and reference numbers
ASCII = "".join(chr(c) for c in range(0x20, 0x7F))
# Typographic extras actually used on the page. No em-dash or en-dash: the
# project bans them in user-facing strings, so they are not worth the bytes.
LATIN_EXTRA = " «»…°×÷©®™€£‌•‹›‘’“”"

CHARS = set(
    PERSIAN + PERSIAN_EXTRA + ARABIC_LOOKALIKE + DIGITS + PUNCT + ZWNJ + ASCII + LATIN_EXTRA
)
# Mono only ever sets reference numbers, which are ASCII by rule.
MONO_CHARS = set(ASCII + " ")

FACES = [
    (
        "node_modules/@ibm/plex-sans-arabic/fonts/complete/woff2/IBMPlexSansArabic-Regular.woff2",
        "plex-arabic-400.woff2",
        CHARS,
    ),
    (
        "node_modules/@ibm/plex-sans-arabic/fonts/complete/woff2/IBMPlexSansArabic-SemiBold.woff2",
        "plex-arabic-600.woff2",
        CHARS,
    ),
    (
        "node_modules/@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-Regular.woff2",
        "plex-mono-400.woff2",
        MONO_CHARS,
    ),
]


def main():
    os.makedirs(OUT, exist_ok=True)
    total_before = total_after = 0

    for src_rel, out_name, chars in FACES:
        src = os.path.join(ROOT, src_rel)
        if not os.path.exists(src):
            sys.exit(f"missing source font: {src_rel}\nRun `npm install` first.")

        dst = os.path.join(OUT, out_name)
        before = os.path.getsize(src)

        unicodes = ",".join(f"U+{ord(c):04X}" for c in sorted(chars))
        argv = [
            src,
            f"--unicodes={unicodes}",
            "--flavor=woff2",
            f"--output-file={dst}",
            "--layout-features=*",   # keep Arabic joining and kerning
            "--no-hinting",
            "--desubroutinize",
            "--drop-tables+=DSIG",
            "--name-IDs=*",
        ]
        subset_main(argv)

        after = os.path.getsize(dst)
        total_before += before
        total_after += after
        pct = (1 - after / before) * 100
        print(f"  {out_name:22s} {before/1024:6.1f} KB -> {after/1024:6.1f} KB  ({pct:4.1f}% smaller)")

    print(
        f"\n  {'TOTAL':22s} {total_before/1024:6.1f} KB -> {total_after/1024:6.1f} KB"
        f"  ({(1 - total_after/total_before)*100:4.1f}% smaller)"
    )
    print(f"\n  written to public/fonts/")


if __name__ == "__main__":
    main()
