# Brand Reference

Persian spellings, search intent, and collision traps for all fourteen brands.

Every entry below was researched and then **independently verified by a second agent using a
different source**. The verifier agreed with the original canonical spelling in all thirteen
cases, and added several corrections that are marked below.

> **Recovery note.** The workflow that produced this failed at its final synthesis step
> (the writing agent stalled). The per-brand data survived in the run journal and was
> extracted directly. Nothing here is reconstructed from memory.

---

## Why this file matters

Iranians search in **Persian script**. A brand page that only ever writes `SEIKO` is
invisible to `قیمت ساعت سیکو`, which is what people actually type.

**Rules for every brand page:**
1. Persian name in the `<h1>` and `<title>`.
2. Latin name alongside it, wrapped in `<bdi>`.
3. Both the canonical spelling **and** its variants go into the search index.
4. Every Persian string uses **Persian yeh `ی U+06CC`** and **Persian keheh `ک U+06A9`**,
   never the Arabic forms. `norm()` handles user input; the stored data must already be clean.

---

## Quick table

| Latin | Persian (canonical) | Certified dealer | Notes |
|---|---|---|---|
| SEIKO | `سیکو` | **yes** | no spacing variant exists |
| CITIZEN | `سیتیزن` | **yes** | `سیتی زن` spaced is equally live |
| CASIO | `کاسیو` | **yes** | **never target bare `کاسیو`** - see trap 1 |
| G-SHOCK | `جی شاک` | **yes** | spaced form dominant; `جیشاک` is first-class |
| TIMEX | `تایمکس` | | priority brand |
| Q&Q | `کیو اند کیو` | | Citizen sub-brand, value tier |
| OBAKU | `اباکو` | | Danish |
| DANIEL KLEIN | `دنیل کلین` | | buyers paste `DK.1.xxxxx-x` codes |
| GUESS | `گس` | | sub-brand `جی سی` (Gc) |
| ESPRIT | `اسپریت` | | |
| TOMMY HILFIGER | `تامی هیلفیگر` | | many live misspellings |
| CAT | `کاترپیلار` | | **`کاتر` prefix is poisoned** - see trap 2 |
| EXTRI | `اکستری` | | |
| JULIUS | `جولیوس` | | |

---

## The traps

These are the findings that change what gets built. Each one was verified against live
Iranian marketplace data.

### Trap 1: bare `کاسیو` is not watch-specific

The same spelling sells **calculators** (`ماشین حساب کاسیو`), **keyboards**
(`ارگ کاسیو` / `کیبورد`), and **cameras** (`دوربین کاسیو`) in Iran.

> **A Casio watch page must target `ساعت کاسیو`, never bare `کاسیو`.**

Two further Casio traps:
- **`کازیو` is a misspelling trap, not a variant.** On Basalam it returns 47 results that
  are almost all `کازیه` - wooden office letter trays. Zero sellers write it. Do not build
  a page on it.
- **`کاسیو جنرال` collides catastrophically** with `جنرال`, a major Iranian appliance brand
  (`کولر جنرال`, `اسپیلت جنرال`). Use `کاسیو مدل MTP` / `کاسیو کلاسیک` instead.

### Trap 2: the `کاتر` prefix is poisoned

CAT's canonical is `کاترپیلار` (132 of 330 Torob slugs, 98 of 172 Digikala slugs,
fa.wikipedia article title).

But **55 of 330 Torob slugs beginning `کاتر` are a different product entirely**:
`کاتر پلاتر` (cutting plotter), `کاتریج` (cartridge), `کاتریس` (Catrice cosmetics).
**Any prefix, substring, or fuzzy match on `کاتر` poisons the brand page.** Match on the
full canonical only.

And **bare `کت` must never be a standalone tag** - in Persian it means *jacket/coat*, which
is a catastrophic collision in a fashion-adjacent catalogue. In the wild it appears only as
an appended token after the full name (`کاترپیلار-کت-8419`).

### Trap 3: the highest-risk spelling on the whole site

**`کاترپيلار` with Arabic yeh `U+064A`** is visually identical to the canonical but is
different bytes. It appears in **76 of 172 archived Digikala slugs**.

> Never store it. But you **must** normalise it on search input, or Arabic-keyboard typists
> and anyone pasting legacy text silently miss the catalogue.

This is exactly what `src/lib/normalize.js` handles, and it is why that function is tested.

### Trap 4: transliterations that pull a competitor's brand

| Do not target | Because it returns |
|---|---|
| `دانیل کلاین` / `دنیل کلاین` | **Calvin Klein** and **Anne Klein**, not Daniel Klein |
| `سایکو` (for Seiko) | *psycho* - books, zero watches |
| `ژولیوس` (for Julius) | a **cosmetics** brand and a saxophone brand on Divar |
| `بیبی جی` alone (for Baby-G) | **JBL audio gear** (`جی بی ال`). Must be qualified as `ساعت کاسیو بیبی جی` |
| `تیمکس` (for Timex) | minority misspelling, ambiguous |
| `کترپیلر` (for CAT) | zero CAT products across three platforms |

### Trap 5: King Seiko has an Iranian street name

Iranian vintage sellers call King Seiko **`سیکو سلطنتی`** and **`سیکو امپراطوری`**
(*royal* / *imperial* Seiko), seen in live titles like
`سیکو سلطنتی امپراطوری کالیبر ۶۱۱۹`.

**Far more live in the secondhand market than `کینگ سیکو`.** Worth knowing if the shop ever
carries vintage.

Conversely, **Grand Seiko, Prospex and Presage are genuinely thin** in Iranian commerce -
zero hits across the sources checked. Keep them as index synonyms, not merchandising labels.

---

## Per brand

### SEIKO · `سیکو` · certified dealer

Canonical confirmed by 58 of 58 unique Seiko-bearing Sheypoor listing titles. Codepoints
`U+0633 U+06CC U+06A9 U+0648` - Persian yeh and Persian keheh throughout.

**No spacing variant exists.** Unlike Citizen, nobody splits it.

Mixed-script titles are the norm, not the exception:
`ساعت مچی مردانه سیکو SEIKO SSB347P1`. Carry both scripts in the index.

Sub-lines actually used in Iran: `سیکو ۵` / `سیکو 5` (both digit forms live),
`سیکو فایو`, `سیکو اسپریت` (Spirit), `سیکو سلکشن` (Selection), `سیکو پرمیر` (Premier),
`سیکو آکتوس` (Actus), and the vintage `سیکو سلطنتی` / `سیکو امپراطوری`.

### CITIZEN · `سیتیزن` · certified dealer

**Both spacings are live and must both be indexed:** `سیتیزن` and `سیتی زن`, plus the ZWNJ
form `سیتی‌زن` and the transposition `سیتزین`.

Eco-Drive appears as both `اکو درایو` and `اکودرایو`.

### CASIO · `کاسیو` · certified dealer

See trap 1 - **always qualify as `ساعت کاسیو`**.

Sub-lines, in order of real Iranian volume:
- `جی شاک` (G-Shock) - biggest by far, own brand page
- `ادیفایس` (Edifice) - second highest, strongly confirmed
- `اولدمانی` (joined) / `اولد مانی` (spaced) - the **Iranian nickname** for the A158 / A159 /
  A168 vintage steel look. Joined form wins on classifieds. This is a genuinely local term
  with no English equivalent.
- `بیبی جی` (Baby-G) - must be qualified, see trap 4
- `شین` (Sheen) - weak, collides with `شیک` (chic)
- `پرو ترک` (Pro Trek) - correct but negligible demand, do not build a page

`نوستالژی` / `رترو` / `کلاسیک` are used interchangeably for the vintage family.

### G-SHOCK · `جی شاک` · certified dealer

**The spaced form is dominant.** But `جیشاک` (no space) is a **first-class variant, not a
typo** - it appears in seller-written titles like `ساعت مچی جیشاک کاسیو`.

`جی‌شاک` with ZWNJ appears in site navigation and taxonomy rather than seller titles.

Also live: `جی شوک`, `جی-شاک`, `کاسیو جی شاک`.

> **Build note:** `src/pages/index.astro` currently uses the ZWNJ form `جی‌شاک`. Switch the
> canonical to the spaced `جی شاک` in Phase 03, and index all four forms.

### TIMEX · `تایمکس`

Dual-script titles dominant: `تایمکس TIMEX`. Lowercase `timex` is common in Divar listings
and URL slugs. `تیمکس` is a minority misspelling - index it, do not target it.

### Q&Q · `کیو اند کیو`

Citizen's value sub-brand, and **the affordable door into the shop** - roughly
۸۰۰٬۰۰۰ to ۳٬۰۰۰٬۰۰۰ toman against Seiko's ۲۵ to ۱۰۷ million. See
`PERSIAN-MARKET-INTEL.md` section 7 for why that range matters to the merchandising.

Iranian sellers market it openly as `زیر مجموعه برند سیتیزن`, which reinforces rather than
competes with the Citizen dealer claim. Superior line: `لاین سوپریور`.

### OBAKU · `اباکو`

Danish. Variants: `آباکو`, `اوباکو`, `ابا کو`, and with origin qualifier
`اباکو دنمارک` / `اوباکو دانمارک`.

### DANIEL KLEIN · `دنیل کلین`

**Buyers paste the model code directly** - `DK.1.13851-1` format. Make sure the reference
field is searchable, since that is how this brand gets found.

Never target `دانیل کلاین` or `دنیل کلاین` - see trap 4. Observed real misspelling:
`دنل کلین` (dropped yeh).

### GUESS · `گس`

Sub-brand **`جی سی`** (Gc / Guess Collection) is the premium line. Also `گس واچ`,
`گس کالکشن`, `گِس` (with kasra). `گوس` is rare and user-generated only.

### ESPRIT · `اسپریت`

Note: the original project brief spelled this **"ESPIRIT"**, and that misspelling is
genuinely live in Iranian listings alongside `Esprit`, `Espirit` and `اسپیریت`.
Index all of them.

### TOMMY HILFIGER · `تامی هیلفیگر`

The most misspelling-prone brand in the roster. All of these are live and should be indexed:
`تامی هلفیگر`, `تامی هایلفیگر`, `تامی هالفینگر`, `تامی هلفینگر`, `تامی‌هیلفیگر`,
`تومی هیلفیگر`, plus the bare surname `هیلفیگر` / `هلفیگر` and bare `تامی` / `تومی`.

### CAT (Caterpillar) · `کاترپیلار`

See traps 2 and 3 - the two most dangerous entries in this file.

**Three Latin tokens are all live** and must all be carried: Basalam and Divar sellers write
`Cat`, Digikala's URL slugs write `Caterpillar`, and Torob's brand entity is
`cat-کاترپیلار`.

Watches are made under licence by Time Network Ltd. for Caterpillar Inc.
`کاترپیلار آمریکایی` is a marketing epithet Divar sellers use, fine in body copy, never as a
canonical tag. Low-volume alias worth a redirect: `کترپیلار` (no alef).

### EXTRI · `اکستری`

Variants: `ایکستری`, `ایکس تری`, `ایکس‌تری`, `اکس تری`.

### JULIUS · `جولیوس`

Korean. **No spacing variant exists** - Persian never splits it. Bilingual title pattern
`جولیوس JULIUS` is dominant on Divar. Origin qualifier `جولیوس کره` is common.
Avoid `ژولیوس` (cosmetics) and `جولیس` (one live listing, drifts to Casio/Rolex).

---

## Gaps

1. **Logo SVG sources were not reliably resolved.** Phase 02 should check
   `simpleicons.org` and Wikimedia Commons per brand, and generate a simple monogram for any
   brand with no clean mark. Never hand-draw an approximation of a real trademark.
2. **Price bands per brand are not captured here.** Only Seiko and Q&Q were measured, and
   they differ by ~30x. If the price-band compensation from the dossier is ever adopted,
   fourteen dated "starts from" numbers are needed.
3. **Q&Q was researched separately** from the other thirteen because the owner added it
   after the workflow launched. Its data is in `PERSIAN-MARKET-INTEL.md` section 7.
