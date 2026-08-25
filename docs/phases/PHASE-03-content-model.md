# Phase 03 - Content Model

**Goal:** the product schema, the brand data, and the Persian copy deck. No visual work.

> **SCOPE CHANGE:** the shop holds **~1,000 models**, not 50-300. Do not attempt to catalogue
> all of them - read `docs/research/CATALOGUE-SCALE.md` first. The plan is **~150-200 curated
> models** across fourteen brands, with every brand page stating that 1,000+ are in the shop.
> That line is the strongest sales copy on the site and it is true.

**Why the data format matters more than the framework:** if the data lives in plain JSON
with photos beside it, the whole catalogue ports to any future stack in an afternoon. If it
gets trapped in framework-specific content collections, it does not. **Keep the data
portable.**

---

## 1. Product schema

One `src/data/products.json`. Flat array. No nesting beyond what is shown.

```jsonc
{
  "slug": "seiko-srpb41j1",            // URL-safe, brand-model-ref
  "brand": "seiko",                    // key into brands.json
  "model": "Presage Cocktail Time",    // Latin, sentence case
  "modelFa": "پرسیج کوکتل تایم",        // optional Persian rendering
  "reference": "SRPB41J1",             // MANUFACTURER REFERENCE - required
  "gender": "men",                     // men | women | unisex | set | girls | boys | kids
  "caseShape": "round",                // round | square | rectangle | oval
  "caseSize": 40.5,                    // mm, number
  "caseMaterial": "stainless-steel",
  "movement": "automatic",             // quartz | automatic | solar | eco-drive | kinetic
  "waterResistance": 50,               // metres, number
  "crystal": "hardlex",                // mineral | hardlex | sapphire
  "strap": "leather",                  // leather | steel | resin | mesh | fabric
  "dialColour": "blue",
  "images": ["seiko-srpb41j1-1.jpg", "seiko-srpb41j1-wrist.jpg"],
  "inStock": true,
  "featured": false,
  "priority": false,               // one of the ~150 curated, properly photographed models
  "notes": ""                          // free Persian text, optional
}
```

**Required, non-negotiable:** `slug`, `brand`, `model`, `reference`, `gender`, `images`.

**`reference` is required because it is the authenticity signal.** A product without one
cannot be published - that is the rule, not a preference.

**Deliberately absent: `price`.** Per `CLAUDE.md` §3.6. Do not add the field "just in case";
an unused price field is an invitation to start filling it in.

### Fields that exist because Iranians shop this way

- **`caseShape`** - Torob exposes case shape as a first-class filter. Iranians filter by
  shape where Westerners filter by diameter. Confirmed live on Torob:
  `دایره` round · `مربع` square · `مستطیل` rectangle · `بیضی` oval.
- **`gender: "set"`** - matching couple sets. IranTimer gives `ست` equal billing with
  `مردانه` and `زنانه`. Major gifting category; it needs a browse entry, not a tag.
- **Kids split by gender** - `دخترانه` girls and `پسرانه` boys are distinct from `بچگانه`.

### Also build

`src/data/brands.json` - per brand: `key`, Latin name, **Persian name**, logo file,
one-paragraph Persian description, `isOfficialDealer` boolean.

**The Persian brand name is a hard requirement, not a nicety.** Iranians search in Persian
script. A site that only ever writes "SEIKO" is invisible to `قیمت ساعت سیکو`.

Confirmed from Torob: سیکو Seiko · سیتی زن / سیتیزن Citizen (**both spacings - carry both
as keywords**) · کاسیو Casio · دنیل کلین Daniel Klein.

**Still needed:** confirmed Persian spellings for Timex, Guess, Tommy Hilfiger, Esprit,
Extri, Julius, CAT, Obaku, G-Shock. Research these before writing catalogue copy.

## 2. The build-time search index

Emit `search-index.json` at build: `slug` plus a `blob` of every searchable field passed
through `norm()` from Phase 01.

**Both the index and the runtime query use the same `norm()`.** Two copies will drift, and
the failure is silent - Persian search that "randomly" returns nothing.

At the curated scale (~150-200), `Array.filter` over this index is the whole search feature.
**No search library.**

**This only holds because of the curation decision.** At 1,000 products the index would be
~150KB, consuming the entire JavaScript budget before a line of filter logic. If the scope
ever expands, switch to per-brand index files loaded on demand - never one global index.

## 3. Persian copy deck

Write `docs/copy-fa.md`, every user-facing string in one reviewable place, for the owner to
approve before it reaches a component.

### The rules

**Trust copy names a mechanism and an actor. Never an adjective.**

Chrono24's authenticity vocabulary is process-based: *"Authenticity certified by
watchmakers"*, *"original box and papers"*, *"serviced before sale"*. Unbacked superlatives
like *"۱۰۰٪ اورجینال!"* are what counterfeit sellers write, so they now signal the opposite
of what they claim.

| Write | Not |
|---|---|
| نمایندگی رسمی سیکو، سیتیزن، کاسیو | ۱۰۰٪ اصل و اورجینال |
| ۱۵ سال در همین آدرس | فروشگاه معتبر |
| حضوری ببینید و امتحان کنید | بهترین قیمت |

**Headlines are countable facts, not slogans.** Chrono24's homepage headings are literally
statistics. Lead with numbers the shop can prove: years trading, brands carried, the street
it is on. Numbers are checkable; adjectives are not, which is exactly why numbers read as
authentic.

**Say plainly that there is no online checkout.** Rolex does not sell online either - the
terminal action on rolex.com is a store locator. This is the category-defining pattern, not
a degraded e-commerce site. State `فروش فقط حضوری` so nobody hunts for a cart and bounces.

**Zero em-dashes.** Hyphens only.

**Preserve ZWNJ** (`U+200C`, نیم‌فاصله) in Persian copy. Do not let build tooling strip it.

### Strings to write

Navigation · hero · the how-buying-works strip · brand descriptions ×12 · category labels ·
filter labels · spec field labels · CTA labels · the trust block · visit-us block including
**landmark directions verbatim from the owner** · hours · footer · 404 · empty search state.

## 4. The stock problem, handled honestly

A static site cannot know what is in the case right now, and "is it actually in stock" is
the visitor's blocking question before phoning.

Design around it rather than pretending:

- A visible **`آخرین بروزرسانی: <date>`** stamp near the grid.
- Honest per-item labels: `موجود` in stock, or `تماس بگیرید` call to ask.
- Per-item CTA carries the reference, so the call starts with a specific watch rather than
  a general enquiry.

This converts an unanswerable question into the phone call we wanted anyway.

---

## Definition of done

- [ ] `products.json` schema fixed and documented; 3-5 real products entered as a probe.
- [ ] `brands.json` complete with **Persian names for all twelve brands**.
- [ ] Every product carries a `reference`.
- [ ] `search-index.json` emitted at build, sharing `norm()` with the runtime.
- [ ] `docs/copy-fa.md` complete and **approved by the owner**.
- [ ] No `price` field anywhere.
- [ ] Zero em-dashes: `grep -c "-" docs/copy-fa.md` returns 0.
- [ ] A round-trip test: JSON edited by hand, rebuild, change appears. This is the owner's
      real authoring path and it must be proven to work.

## Do not

- Do not add a git-based CMS. Decap and Sveltia both need a GitHub OAuth backend and CI, and
  both are restricted from Iran. The authoring surface is a JSON file and a photos folder,
  editable in any text editor and portable to any future stack.
