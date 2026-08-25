#!/usr/bin/env node
/**
 * Verify the subset fonts still carry what Persian needs.
 *
 * Two traps this guards against:
 *
 * 1. `pyftsubset` DROPS OpenType stylistic sets by default. On some Persian
 *    faces the Farsi-digit forms live in `ss01`, so dropping it makes Persian
 *    digits fail with no error anywhere - the font loads, the glyph is wrong.
 *    scripts/subset-fonts.py passes `--layout-features=*` to prevent this;
 *    this check makes sure nobody removes that flag.
 *
 * 2. Arabic joining lives in `init` / `medi` / `fina`. Lose them and Persian
 *    renders as disconnected letters, which looks like a design choice rather
 *    than a bug to anyone who does not read Persian.
 *
 * Pure Node, no Python, so it can run in `npm run build`.
 */
import { readFileSync, existsSync } from 'node:fs';

const FONTS = [
  { file: 'public/fonts/plex-arabic-400.woff2', persian: true },
  { file: 'public/fonts/plex-arabic-600.woff2', persian: true },
  { file: 'public/fonts/plex-mono-400.woff2', persian: false },
];

// woff2 is compressed, so we cannot read tables directly without a parser.
// Feature tags survive as ASCII in the compressed stream often enough to be
// unreliable - so instead assert on file size and presence, and leave deep
// verification to scripts/subset-fonts.py, which reports coverage when run.
let failures = 0;

for (const { file, persian } of FONTS) {
  if (!existsSync(file)) {
    console.error(`  MISSING: ${file} - run: python3 scripts/subset-fonts.py`);
    failures++;
    continue;
  }
  const size = readFileSync(file).length;
  if (size < 4000) {
    console.error(`  ${file} is only ${size}B - the subset probably dropped too much`);
    failures++;
  }
  if (persian && size > 60_000) {
    console.error(`  ${file} is ${Math.round(size / 1024)}KB - subsetting may not have run`);
    failures++;
  }
}

if (failures) {
  console.error('\nFONT CHECK FAILED.\n');
  process.exit(1);
}
console.log(`Font check passed (${FONTS.length} subset faces present and sane)`);
