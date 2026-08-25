# Catalogue Scale - 1,000 models changes the architecture

> **DECIDED (owner, 2026-08-24): curated catalogue of ~150-200 models.** The analysis below
> is retained as the reasoning. Phase 03 and Phase 04 are scoped to this decision.

The owner reports **roughly 1,000 distinct models in stock**. The plan assumed 50-300. That
gap is large enough to invalidate several decisions, so this file works the numbers and
makes a recommendation.

---

## What 1,000 models actually costs

### Photography - this is the real blocker

Every other number here is solvable with patience. This one is not.

| | |
|---|---|
| Models | 1,000 |
| Photos per model (clean + wrist) | 2 |
| **Total photographs** | **2,000** |
| Time per shot at a genuinely fast pace | ~90 seconds |
| **Total shooting time** | **~50 hours** |

Ninety seconds assumes: place the watch, align the crown right, set the hands to 10:10,
shoot, verify focus, move on. That is optimistic for a shop that is open seven days a week
and serving customers.

And **consistency is the binding constraint**, not volume. NN/g's finding is that
background, orientation, lighting and scale must match across *all* products on a listing
page. Fifty hours of shooting spread over weeks, in a working shop, will not hold one
lighting setup. The grid will look ragged, and a ragged grid reads as a scraped supplier
feed - the exact opposite of the authenticity positioning.

### Search index blows the JavaScript budget on its own

1,000 products × ~150 bytes of normalised searchable text ≈ **150KB**.

The entire JS budget is 150KB. The index alone would consume all of it, before a single line
of filter logic. Workarounds exist (per-brand index files, lazy loading on first keystroke,
a trimmed blob), but they are complexity that a 200-model catalogue simply does not need.

### Build time is unknown and must be measured, not guessed

1,000 models × 2 images × ~4 widths × ~3 formats ≈ **24,000 encodes** per cold build.

I attempted a local benchmark and **it was not trustworthy** - the measured 2.3s was almost
entirely process startup (0.04s of actual CPU), and a synthetic test image compressed to
469 bytes, nothing like a real watch photograph.

**Do not plan against a guessed number.** In Phase 01, run a probe: 20 real photos through
the real pipeline, measure, multiply. If a cold build runs into hours, the owner will
conclude the site is broken the first time he rebuilds it.

### Other costs

- 1,000 product pages plus 14 brand pages. Astro handles this, but it compounds build time.
- A `products.json` with 1,000 hand-maintained entries is not a file a non-technical owner
  will ever edit confidently.

---

## The strategic argument, which points the same way

**Nobody browses 1,000 watches.** A visitor who lands on a 1,000-item grid does not feel
well-served, they feel lost, and they leave without phoning.

More importantly, this is a **call-driven site with no prices**. Its job is
*desire, shortlist, address* - not exhaustive inventory. Rolex.com does not list every
dealer's stock; it makes you want a watch and then sends you to a shop. That is the model
this project already chose.

So the 1,000 number is an argument **against** a full catalogue, not for one. The site
cannot answer "is this exact model in the case today" anyway, which is precisely why the
conversion is a phone call.

---

## Recommendation: a curated catalogue, honestly labelled

**Photograph and publish ~150-200 models**, chosen as the ones the shop most wants to sell.
The owner already named the priority: **Seiko, Citizen, Casio, Timex**.

Structure it as:

1. **Priority brands get real depth** - Seiko, Citizen, Casio, G-Shock, Timex. Perhaps
   25-40 models each, properly photographed.
2. **Secondary brands get a brand page** with a representative handful - Obaku, Q&Q, Guess,
   Esprit, Tommy Hilfiger, CAT, Daniel Klein, Extri, Julius.
3. **Every brand page says plainly, in Persian**, something like:
   *"بیش از ۱۰۰۰ مدل در مغازه موجود است. برای دیدن همه‌ی مدل‌ها تماس بگیرید یا حضوری تشریف بیاورید."*
   (Over 1,000 models in the shop. Call or visit to see the full range.)

**That last line is not a limitation, it is the strongest sales line on the site.** It turns
the catalogue from "here is everything" into "here is a taste, the real collection is in the
shop" - which is exactly the visit we want, and it is true.

### Why this is the right call and not a compromise

- The photography becomes achievable in one or two controlled sessions, so consistency
  holds.
- The index stays small and the JS budget survives.
- Build times stay sane and the owner is never scared by a rebuild.
- The `products.json` stays a file a human can actually maintain.
- **It merchandises rather than inventories**, which is what a gallery does.

### If the owner insists on all 1,000

It is buildable, but the plan must change in these specific ways, and the cost should be
stated plainly before committing:

- One image per product, not two. Drop the wrist shot except on featured models.
- Per-brand search indexes, lazy-loaded. Never one global index.
- A measured build-time budget from a probe batch, and incremental builds.
- A realistic photography schedule with a fixed, permanent shooting station in the shop so
  the setup never changes between sessions.
- Accept that the first launch slips by months, because the photography gates it.

---

## Impact on the phases

| Phase | Change |
|---|---|
| **03 Content model** | Scope to ~150-200 curated products. Add a `priority` flag. Brand pages carry the "1,000+ in store" line. |
| **04 Imagery** | Shooting scope drops from 2,000 photos to ~300-400. Achievable in controlled sessions. **Add a 20-photo probe to measure the real pipeline cost.** |
| **05 Build** | Single global index is fine again at 200 products. Catalogue page needs a clear "this is a selection" frame. |
| **01 Foundation** | Add the image-pipeline probe as a task, so build time is a measured number before 1,000 files exist. |

## The question to put to the owner

Not "do you want all 1,000 on the site" - he will say yes, because more sounds better.

Ask instead: **"Which 150 watches do you most want to sell? We will photograph those
properly, and every brand page will say the full 1,000 are in the shop."**

That reframes it as merchandising rather than omission, and it is the question that gets a
useful answer.

### Suggested allocation across fourteen brands

Roughly 175 models, weighted to the owner's stated priorities:

| Tier | Brands | Models each | Subtotal |
|---|---|---|---|
| Priority | SEIKO, CITIZEN, CASIO, TIMEX | ~25 | 100 |
| Certified / distinct | G-SHOCK | ~20 | 20 |
| Mid | Q&Q, OBAKU, DANIEL KLEIN | ~10 | 30 |
| Long tail | GUESS, ESPRIT, TOMMY HILFIGER, CAT, EXTRI, JULIUS | ~4 | 24 |
| | | **Total** | **~174** |

Within each brand, cover the spread the shop actually sells rather than only the expensive
pieces: a few entry, most mid, a couple of halo models. A catalogue that only shows the top
of the range makes people assume they cannot afford the shop and they do not call.

Also reserve slots for the two cross-cutting categories the owner confirmed: **couple sets
(ست)** and **kids' watches**. These are browse entries in their own right, so each needs
enough models to justify the page - roughly 10 sets and 10 kids' pieces, drawn from whichever
brands supply them.
