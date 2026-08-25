# Phase 01 - Foundation

> ## STATUS: COMPLETE (2026-08-24)
>
> Built on **Astro 7.2.6** (the plan assumed 6; 7 was current, and starting on the newest
> major buys the longest runway before it goes stale). Node 24.14.1, minimum 22.12.
>
> **Delivered:** exact-pinned deps, `package-lock.json` + `.nvmrc` committed, three subset
> self-hosted fonts (55KB, down from 193KB), RTL harness, Persian normaliser with 28 passing
> tests, four build guards, and a verification page confirmed in a real browser at desktop
> and 390px.
>
> **Measured:** 70.6KB total, 4 requests, **0 scripts**, **0 third-party origins**,
> `dir=rtl`, `lang=fa`, line-height 1.8, letter-spacing normal, no horizontal overflow.
>
> **Two decisions that changed during execution:**
> - **Dropped IBM Plex Sans entirely.** Plex Sans Arabic was verified to cover full ASCII
>   and Latin extras as well as all Persian glyphs, so a separate Latin family was dead
>   weight. Three faces instead of five.
> - **Plex Sans and Plex Mono carry NO Persian at all**, not even Persian punctuation
>   (، ؛ ؟). This was not in the plan and it forces the Arabic face to be the base family,
>   with Mono reserved strictly for ASCII references.
>
> **Two bugs the browser caught that the DOM checks could not:** JSX collapsed the
> whitespace before two inline components, rendering `سال۱۳۸۹` and `کدSRPB41J1` jammed
> together. Fixed with explicit `{' '}`. A DOM snapshot showed nothing wrong.

**Goal:** a repo that builds, renders Persian RTL correctly, ships zero third-party
requests, and will still build in a year with nobody maintaining it.

**Why:** every constraint in `CLAUDE.md` §3 is either enforced here or silently violated
for the life of the project. Fonts, RTL, and version pinning are almost impossible to
retrofit once fifty components exist.

---

## Tasks

### 1. Scaffold

```bash
npm create astro@latest -- --template minimal --no-install --no-git
npm i
npx astro add tailwind
```

No other integrations. No React, no Vue, no adapter. The catalogue needs filtering and
`tel:` links; neither requires a framework island.

### 2. Freeze the versions - this is the phase's most important task

Astro ships breaking majors roughly annually. Astro 6.0 (Mar 2026) required Node 22+,
dropped Node 18 and 20, moved to Vite 7, removed CommonJS config, and replaced
`<ViewTransitions />` with `<ClientRouter />`. An unpinned repo will not build in 2027.

- [ ] **Exact-pin `astro` in `package.json`. No caret, no tilde.**
- [ ] Exact-pin `tailwindcss` and `@tailwindcss/vite`.
- [ ] **Add `sharp` as an explicit direct dependency at an exact version.** Do not rely on
      Astro's transitive resolution. `sharp` is a native module and is the single most
      fragile link in the pipeline - `Could not load the "sharp" module` recurs from
      optional-dependency pruning and package-manager gaps.
- [ ] Commit `package-lock.json`.
- [ ] `.nvmrc` containing `22`.
- [ ] **Use `npm`, not pnpm or Bun.** The symlink and optional-dependency handling in pnpm
      is a known source of `sharp` failures.
- [ ] Add to `README.md`: **never run `npm update`.**

### 3. README for a future maintainer who may be in Iran

Must contain, near the top:

```bash
# If npm install hangs, you are likely on an Iranian connection.
npm config set registry https://mirror-npm.runflare.com
# Alternatives: mirror.kargadan.ir, ArvanCloud package mirror
```

Without this, a future maintainer hits an install hang and concludes the project is dead.

Also document `passthroughImageService()` as the one-line degradation if `sharp` ever
breaks - it keeps `<Image>`/`<Picture>` working with no processing, so a broken-sharp repo
still builds.

### 4. Fonts - self-hosted, no exceptions

**IBM Plex family**, chosen because `IBM Plex Sans Arabic` is the only first-party Persian
companion in a same-design programme, and it was verified to carry all six Persian-specific
letters (پ چ ژ گ ک ی) and all ten Persian digits (۰-۹).

- [ ] Download and **self-host as `woff2`**. Never link `fonts.googleapis.com` - Google
      Cloud blocks Iran at platform level and the request will hang for real customers.
- [ ] Subset aggressively. Persian + Latin + digits only.
- [ ] `font-display: swap`, with a real system fallback stack.
- [ ] Files: Plex Sans Arabic 400 + 700, Plex Sans 400 + 600, Plex Mono 400.
      **Five font files total.** More than that is a performance and taste problem.

**Verify before committing:** render `پ چ ژ گ ک ی ۰۱۲۳۴۵۶۷۸۹` in the browser and confirm no
glyph falls back. Readex Pro - frequently recommended as a modern Persian face - is missing
`ک` and `ی`, the two most common letters in Persian, and fails silently.

### 5. RTL harness

- [ ] `<html lang="fa" dir="rtl">` in the base layout.
- [ ] Base line-height **1.8** for Persian body. Persian needs more than Latin.
- [ ] **`letter-spacing: 0` on all Persian text.** Tracking breaks Arabic-script joining.
      Apply tracking only to Latin, and only on uppercase labels.
- [ ] A `<BrandName>` component that wraps Latin brand names in `<bdi>`. Without it, bidi
      reordering mangles any line mixing Persian and Latin.
- [ ] A `<PersianNumber>` helper converting Latin digits to ۰-۹ for display.

### 6. Lint the RTL rule so it cannot rot

Tailwind v4 supports logical properties natively, so RTL is nearly free - but **one
physical-direction utility is what breaks an RTL layout**, and it will be added by accident.

- [ ] Add a check (ESLint rule, or a grep in a `predeploy` script) that fails on
      `ml-` `mr-` `pl-` `pr-` `left-` `right-` `text-left` `text-right` in `src/`.
- [ ] Document the logical replacements: `ms-` `me-` `ps-` `pe-` `inset-inline-start/end`
      `text-start` `text-end`.

### 7. The Persian normaliser

Create `src/lib/normalize.js` with the `norm()` function from `CLAUDE.md` §3.5, plus a unit
test. This is needed in Phase 05 but belongs here because both the build-time index and the
runtime query must import the **same** function - two copies will drift.

```js
// src/lib/normalize.test.js - the check that matters
assert(norm('ساعت مچي') === norm('ساعت مچی'));   // Arabic yeh vs Persian yeh
assert(norm('كاسيو')    === norm('کاسیو'));       // Arabic kaf vs Persian kaf
assert(norm('۱۲۳')      === '123');                // Persian digits
assert(norm('نیم‌فاصله') === 'نیم فاصله');          // ZWNJ
```

### 8. Zero-third-party guard

- [ ] Add a `predeploy` check that greps the built `dist/` for `http://` and `https://` in
      `src`, `href`, and `url()` and fails on any external origin.

This is the cheapest possible enforcement of `CLAUDE.md` §3.2, and it will catch the
accidental Google Fonts link that someone adds in 2027.

---

## Definition of done

- [ ] `npm run build` produces a `dist/` that opens correctly from `file://`.
- [ ] Page renders RTL with correct Persian shaping and no fallback glyphs.
- [ ] All five Plex files self-hosted; **zero external network requests** in the Network tab.
- [ ] Version pins in place; `package-lock.json` and `.nvmrc` committed.
- [ ] RTL lint rule fails on a deliberately added `ml-4`.
- [ ] `norm()` tests pass.
- [ ] Third-party guard fails on a deliberately added external URL.
- [ ] **Verified in a real browser via `browser-harness`**, not just a green build.

## Verification

```bash
browser-harness <<'PY'
new_tab("http://localhost:4321/"); wait_for_load()
print(js("JSON.stringify({dir:document.documentElement.dir, lang:document.documentElement.lang, font:getComputedStyle(document.body).fontFamily, lh:getComputedStyle(document.body).lineHeight, ls:getComputedStyle(document.body).letterSpacing})"))
print(js("JSON.stringify(performance.getEntriesByType('resource').map(r=>r.name).filter(n=>!n.startsWith(location.origin)))"))
PY
```

The second line must print `[]`. Anything else is a bug.
