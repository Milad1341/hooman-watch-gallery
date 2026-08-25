# گالری ساعت هومن - Hooman Watch Gallery

Static Persian/RTL catalogue site for a watch shop in Ekbatan, Tehran.
No backend, no database, no CI. The conversion is a phone call.

**Read [`CLAUDE.md`](CLAUDE.md) before changing anything.** It carries the decisions and the
constraints, several of which are not obvious and break the site silently if violated.

---

## Quick start

```bash
nvm use            # Node 24 (minimum 22.12)
npm install
npm run dev        # http://localhost:4321
```

### If `npm install` hangs

You are probably on an Iranian connection. npm's registry is reachable but slow or filtered.
Point npm at a domestic mirror:

```bash
npm config set registry https://mirror-npm.runflare.com
# alternatives: https://mirror.kargadan.ir  |  ArvanCloud's package mirror
```

**Without this, a future maintainer hits a hang and concludes the project is dead.** It
isn't. It's the registry.

---

## Commands

| | |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | guards, then build, then the external-request guard |
| `npm run build:only` | build without the guards (debugging only) |
| `npm run preview` | serve the built `dist/` |
| `npm test` | unit tests |
| `npm run verify` | tests + full guarded build. **Run before deploying.** |

### The guards, and why they exist

Each one catches a failure that is invisible in review and silent in production.

- **`scripts/check-rtl.mjs`** - fails on physical-direction CSS (`ml-`, `pr-`, `text-left`)
  and on `letter-spacing` outside a Latin label. One physical utility breaks the RTL layout;
  tracking breaks Persian script joining and turns connected words into loose letters.
- **`scripts/check-links.mjs`** - validates `tel:`, `wa.me` and `ble.ir` formats. Three
  channels, three different conventions, two of which **fail silently**.
- **`scripts/check-external.mjs`** - fails if `dist/` references any third-party origin.
  Google Cloud blocks Iran, so a Google Fonts link doesn't degrade, it **hangs** for the
  actual audience.

---

## Rules that will bite you

1. **No prices.** Show `تماس بگیرید`. See `CLAUDE.md` §3.6.
2. **No third-party requests.** No Google Fonts, Analytics, Maps, or reCAPTCHA. Everything
   is self-hosted and same-origin.
3. **Logical CSS properties only.** `ms-` `me-` `ps-` `pe-`, never `ml-` `mr-` `pl-` `pr-`.
4. **`tel:` hrefs are ASCII.** Persian digits will not dial. Persian digits are for the
   visible label only.
5. **`wa.me` needs `98` with no leading zero.** `wa.me/0912...` renders fine and never
   resolves. Bale uses the opposite convention: leading zero, no `98`.
6. **Never `letter-spacing` Persian text.**
7. **Product images go in `src/assets/`, never `public/`.** Files in `public/` are copied
   verbatim with no optimisation and will silently ship as multi-MB JPEGs.
8. **Never run `npm update`.** See below.

---

## Why the versions are pinned exactly

This repo is expected to sit untouched for long stretches and still build. Astro ships
breaking majors roughly annually.

- Every dependency is pinned to an **exact** version. No `^`, no `~`.
- `package-lock.json` and `.nvmrc` are committed.
- **Do not run `npm update`.** If you need to upgrade, do it deliberately, one package at a
  time, and re-run `npm run verify`.

### If `sharp` breaks

`sharp` is a native module and is the most fragile link in the image pipeline. If you see
`Could not load the "sharp" module`, the one-line degradation is
`passthroughImageService()` in `astro.config.mjs` - images stop being optimised but the site
still builds:

```js
import { passthroughImageService } from 'astro/config';
export default defineConfig({ image: { service: passthroughImageService() } });
```

Use `npm`, not pnpm or Bun. Their symlink and optional-dependency handling is a known source
of `sharp` failures.

### The escape hatch

If Astro ever breaks and nobody will fix it, the data was deliberately kept portable: plain
JSON in `src/data/` plus a folder of photos. That ports to a ~150-line Node script using only
`sharp` in an afternoon. **This is why the data format is what it is** - do not move product
data into a framework-specific format.

---

## Fonts

Three subset faces, self-hosted in `public/fonts/`, totalling **55 KB** (down from 193 KB).

IBM Plex Sans Arabic was verified to carry all six Persian-specific letters (پ چ ژ گ ک ی),
all ten Persian digits, **and** full ASCII, so no separate Latin family is needed. Plex Sans
and Plex Mono carry no Persian at all, not even Persian punctuation, which is why the Arabic
face is the base family and Mono is reserved for ASCII reference numbers.

To regenerate after changing the character set:

```bash
pip install fonttools brotli
python3 scripts/subset-fonts.py
```

This is deliberately **not** part of `npm run build` - the build must work on a laptop with
no Python, and the character set changes roughly never.

---

## Layout

```
src/
  data/         shop.js (confirmed facts), products.json, brands.json
  lib/          normalize.js - Persian search normalisation, with tests
  components/   Phone, BrandName, PersianNumber
  layouts/      Base.astro
  pages/
  styles/       global.css - tokens and font-face
  assets/       product photography, optimised at build time
public/
  fonts/        subset woff2, committed
scripts/        guards and the font subsetter
docs/           phases, research, Persian copy
```

## Status

**Phase 01 complete.** Foundation, fonts, RTL harness, guards, tests.
Next: Phase 02 (brand system). See [`docs/README.md`](docs/README.md).
