# Phase 04 - Imagery

**Goal:** a consistent, legally clean photo set, and a build pipeline that makes it fast.

> **SCOPE:** photograph the **~150-200 curated models**, not all 1,000. At two photos each
> that is ~300-400 shots, achievable in a small number of controlled sessions. Shooting 2,000
> photos across weeks in a working shop would break the one thing that matters most here -
> consistency. See `docs/research/CATALOGUE-SCALE.md`.

**This phase decides whether the site looks like a real gallery or a scraped supplier feed.**
Photographic inconsistency across a grid is the single fastest way a shop loses credibility,
and no amount of good typography recovers it.

---

## 1. The legal position - settled, not debatable

**The shop may not republish manufacturer product photos.** Research checked this properly
and there is no argument to build on:

- **First-sale does not apply.** 17 U.S.C. §109 lets the owner of a lawfully made copy sell
  that copy and display *that physical copy* to people present where it is. It does not
  touch the reproduction right. Owning the watch gives zero rights to the brand's JPEG.
  Nobody on this project gets to argue "we sell it, so we can show their photo."
- **Nominative fair use is trademark law, not copyright.** It covers *writing* "SEIKO" and
  "we sell Citizen". It gives no cover for copying their photographs. Two separate
  questions - keep them separate.
- **Copyright fair use fails on every factor here.** Whole professional work, commercial
  use, direct substitution for the licensing market. Treat "is it fair use?" as answered no.
- Product photographs are copyrightable and the **default owner is the photographer**, not
  whoever paid. If a photographer is hired, get a signed assignment.

**What is permitted:** using the brand *names* and *word marks* to say truthfully what the
shop sells, provided nothing implies an official partnership beyond what is true. Since
Hooman genuinely is an official Seiko/Citizen/Casio dealer, that claim is available - but
only in the exact wording confirmed in Phase 00.

**Therefore: the shop photographs its own inventory.** This is the only clean path, and it
is also the better one - real photos of the real case are a stronger authenticity signal
than press renders every competitor also uses.

**If** Phase 00 confirms formal dealer status, ask whether the distributor provides a
licensed asset pack. That is the one legitimate route to official imagery. Do not assume it.

## 2. Shooting protocol

Give this to the shop as a one-page Persian instruction sheet.

**The rule that matters most: shoot every watch identically.** Same background, same angle,
same light, same distance, same crop. Consistency beats any single prettier photo. NN/g
lists consistent background, orientation, lighting and scale as a requirement, not a nicety.

- **Background:** one near-white sweep. A sheet of white card curved at the back. Never a
  desk, never a hand-held backdrop that shifts between shots.
- **Light:** one soft source in a fixed position, ideally a cheap light tent. Never flash,
  never mixed daylight and shop fluorescents.
- **Angle:** flat-on, dial square to the camera. **Crown to the right**, per convention.
- **Time on the dial:** set every watch to the same time. 10:10 is the industry convention
  and it frames the logo. Mismatched times across a grid look careless.
- **Crop:** **1:1 square, identical framing.** This matters more than the codec.
- Phone camera is fine. A locked-down phone on a tripod with fixed exposure beats an
  expensive camera used inconsistently.

### Two images per watch, minimum

1. **The clean shot** on the white sweep - for scanning and comparison.
2. **A wrist shot** - for scale.

The wrist shot is not optional. Baymard found cut-outs have the highest signal-to-noise
ratio but are insufficient for worn items, because users cannot judge size. On a
call-driven site the wrist shot pre-empts "how big is 41mm actually", which otherwise
becomes a wasted phone call or, worse, no call at all.

## 3. Dark room, lit case

Per Phase 02: the site shell is dark, product images sit on a **light plate**.

**Set the plate to a near-white that differs slightly from the photo background** so
cut-outs do not float invisibly. If the sweep photographs at roughly `#FFFFFF`, the plate at
`#F7F7F5` gives a just-perceptible edge that reads as a lit surface rather than a hole.

**Dark, art-directed photography is allowed in two or three hero slots only** - shots we
control and light properly. Never in the grid.

## 4. Build pipeline

- **Images live in `src/assets/watches/`. Never `public/`.** Files in `public/` are copied
  verbatim with **no optimisation** and will silently ship as multi-MB JPEGs that look
  identical in the DOM. This is the most common way a site like this ends up slow.
- `<Picture formats={['avif','webp']}>` with a JPEG fallback. **AVIF first, never AVIF
  alone** - the ~5% unsupported tail is concentrated on older iOS and legacy Android
  WebView, which over-indexes on exactly the older devices common in this market.
- Grid thumbs at `[240, 360, 480, 720]`,
  `sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"`.
- Detail hero at `[480, 720, 960, 1440]`, `sizes="(max-width: 768px) 92vw, 640px"`.
- `loading="lazy" decoding="async"` on everything below the fold.
- `loading="eager" fetchpriority="high"` on **exactly one** LCP image.
- Enforce the crop with `aspect-ratio: 1` + `object-fit: cover` so an uneven set still grids
  perfectly. **Ragged card heights are an instant credibility loss.**
- Set AVIF `effort: 4`. At 300 watches × ~8 variants that is ~2400 encodes; a cold build is
  minutes, not seconds, and it is mostly AVIF. Cache `node_modules/.astro` between builds so
  the owner never watches a six-minute build and concludes the site is broken.

## 4b. Measure the pipeline before committing to it

**Run a probe batch of 20 real photos through the real pipeline and time it.** Multiply out.

Build time was deliberately left unmeasured during planning: a local benchmark attempt
produced an untrustworthy number (2.3s wall against 0.04s of actual CPU, on a synthetic image
that compressed to 469 bytes - nothing like a watch photograph).

If a cold build runs into hours, the owner will rebuild once, conclude the site is broken,
and never touch it again. Know the number before there are hundreds of files.

If the probe shows the build is too slow: lower AVIF `effort`, cut a width from the srcset,
or drop the wrist shot to featured models only.

## 5. Batch processing for a non-technical owner

The owner will hand over a folder of phone photos. Provide a single script:

```bash
npm run photos    # crop to 1:1, resize, rename to <slug>-1.jpg, drop into src/assets/watches/
```

One command, no arguments, no choices. Anything requiring a decision per photo will not get
used.

## 6. AI-generated imagery

**Never for a real SKU.** A generated watch is a watch that does not exist, sold under a
reference number that does - on a site whose entire positioning is authenticity. It is the
one thing that would destroy the project's credibility outright.

Acceptable only for: abstract backgrounds, textures, and non-product mood imagery, and only
where nothing could be mistaken for a product photograph.

---

## Definition of done

- [ ] Persian one-page shooting sheet delivered to the owner.
- [ ] Every product has at least a clean shot and a wrist shot.
- [ ] All images 1:1, consistent background, consistent light, crown right, same dial time.
- [ ] Zero manufacturer-sourced images in the repo, unless a licensed pack is confirmed and
      the licence is recorded in `docs/`.
- [ ] All images in `src/assets/`, none in `public/` - grep to confirm.
- [ ] `npm run photos` works end to end on a folder of raw phone photos.
- [ ] Grid renders with zero ragged heights at 360px, 768px and 1440px.
- [ ] Largest grid image under 60KB in AVIF.

## Verification

```bash
browser-harness <<'PY'
new_tab("http://localhost:4321/"); wait_for_load()
print(js("""JSON.stringify({
  ragged: new Set([...document.querySelectorAll('[data-card] img')].map(i=>Math.round(i.getBoundingClientRect().height))).size,
  eager: [...document.images].filter(i=>i.loading==='eager').length,
  formats: [...new Set([...document.querySelectorAll('source')].map(s=>s.type))]
})"""))
PY
```

`ragged` must be `1`. `eager` must be `1`. `formats` must include `image/avif`.
