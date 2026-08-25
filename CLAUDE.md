# CLAUDE.md - Hooman Watch Gallery

Operating instructions for any Claude session working in this repo. Read this before
touching anything. Research that justifies these decisions lives in `docs/research/`;
this file is the decisions themselves.

---

## 1. What this is

A **static, no-backend, Persian-language website** for گالری ساعت هومن (Hooman Watch
Gallery), a real watch shop in Ekbatan, west Tehran, trading for 15+ years.

**The only conversion is a phone call.** No cart, no checkout, no accounts, no forms that
submit anywhere. A visitor browses watches, finds one they want, and phones the shop.

The owner is **not technical**. The site must survive a year of zero maintenance and still
build, still deploy, still be reachable.

## 2. The client, in facts

All confirmed by the owner via the Phase 00 questionnaire unless marked otherwise.

| | |
|---|---|
| Persian name | گالری ساعت هومن |
| Instagram | [@hooman_watchgallery](https://www.instagram.com/hooman_watchgallery/) - 1,365 followers, 1,277 posts |
| Address | تهران، شهرک اکباتان، فاز یک، بازارچه شماره ۱۰، پلاک ۳ |
| Coordinates | 35.712130, 51.312458 · parking nearby |
| **Trading since** | **2010** (16 years) |
| **Contact person** | **Hemmati** (آقای همتی) |
| **Landline (primary)** | ۰۲۱-۴۴۶۹۷۳۰۹ -> `tel:+982144697309` |
| **Mobile 1 (WhatsApp)** | ۰۹۱۲-۳۴۷-۰۸۸۹ -> `tel:+989123470889` |
| Mobile 2 | ۰۹۳۹-۹۱۴-۱۴۹۷ -> `tel:+989399141497` |
| Domain | not registered yet; owner wants **`.ir`** |

**Hours: open all seven days, split shift.** ۱۱:۰۰-۱۴:۰۰ and ۱۷:۰۰-۲۲:۰۰, closed
14:00-17:00. This needs **two `openingHoursSpecification` entries per day**, not one - a
single 11:00-22:00 range would send customers to a closed shop. Hours are the most common
reason people phone a retail shop, so they belong above the fold.

### The positioning, with the owner's correction

Their Instagram bio says **نمایندگی رسمی سیکو، سیتیزن، کاسیو**, covering Seiko, Citizen,
Casio **and G-Shock**.

**The owner clarified they are a certified reseller, not a distributor.** This constrains
the English copy:

| Write | Never write |
|---|---|
| Certified reseller · Authorised retailer | Official distributor · Sole agent · Exclusive importer |

Keep the **Persian** as the shop already uses it - نمایندگی رسمی is their own established
claim and they own it. The **English must be accurate**, because overclaiming a trademark
relationship is a real legal risk on a site whose entire purpose is trust.

**Warranty comes from the brand, not the shop.** Say so precisely. Never imply the shop
underwrites it.

**Certification documents exist but the owner does not want them featured.** Do not build a
certificate-photo section.

Iran's watch market has a serious counterfeit problem. Anyone can post a nice photo; almost
nobody can say *certified reseller, sixteen years, walk in and meet Hemmati*. That is the
whole site. Every page either supports it or is cut.

### Brands - fourteen

**Priority** (lead the homepage, get catalogue depth): SEIKO · CITIZEN · CASIO · TIMEX
**Also certified:** G-SHOCK
**Rest:** Q&Q · OBAKU · EXTRI · JULIUS · GUESS · ESPRIT · TOMMY HILFIGER · CAT · DANIEL KLEIN

G-SHOCK is merchandised **as its own brand, not under Casio**. That is how Iranians shop.
Follow the shop's merchandising, not the corporate hierarchy.

**Q&Q stands alone as its own brand** (owner's decision), the same way G-Shock does. It is
Citizen's value sub-brand, but the shop merchandises it separately and the site follows the
shop. It gets its own brand page, its own Persian name, and its own slot in navigation.

**Also stocked:** couple sets (ست) and kids' watches (دخترانه / پسرانه). Both need browse
entries, not tags.

### Services

**Repairs and battery replacement: yes.** `/repairs` is a confirmed deliverable, not
optional. `تعمیر ساعت اکباتان` is high-intent and low-competition, and this page may convert
better than the catalogue.

### Catalogue scale - read before Phase 03

The shop holds **~1,000 distinct models**, not the 50-300 originally assumed. That is enough
to break the photography plan, the search index, and the build time.

**DECIDED: a curated catalogue of ~150-200 properly photographed models**, with every brand
page stating that 1,000+ are in the shop. That line is the strongest sales copy on the site
and it is true. Full reasoning in `docs/research/CATALOGUE-SCALE.md`.

The catalogue is a **merchandised selection, not an inventory**. Never frame it as complete.

### Still open

Directions from a landmark (left blank) · whether Bale or Telegram are used · what
photography exists and at what resolution.

## 3. Hard constraints - violating these breaks the site for its own customers

These come from verified research (`docs/research/`). They are not preferences.

### 3.1 Hosting

Corrected by adversarial verification. See `docs/research/RESEARCH-DOSSIER.md` section 10.

**Host inside Iran. The decisive reason is legal, not technical.**

**31 CFR §560.540(b)(3) does not authorize "web-hosting services for websites of commercial
entities located in Iran."** This is the exclusion that actually binds. It means no US
provider is authorized for this shop regardless of General License D-2, regardless of how
reachable the provider is, and regardless of anyone's terms of service. Everything below is
secondary to this.

Resilience is the second reason. Iran ran **two** shutdowns in 2026, not one: roughly
8-28 January (~20 days) and 28 February to 26 May (~88 days, the longest nationwide
disruption recorded in any country). During them only domestic services stayed reachable.

- **Primary host: Liara.** Note for Phase 08: Liara is headquartered in **Qom**, not Tehran,
  and **its free tier is currently suspended**. Budget for a paid plan.
- **Fallback: ParsPack** (founded 2009) or IranServer.
- **GitHub Pages is DISQUALIFIED**, and not for the reason first assumed. GitHub's OFAC
  licence for Iran is real. But a separate, country-neutral clause in GitHub's *Terms for
  Additional Products* bans Pages for "an online business, e-commerce site, or any other
  website that is primarily directed at either facilitating commercial transactions."
  **Absence of a sanctions bar is not presence of permission.**
- **Vercel, Netlify, Render, Firebase: avoid**, but know the real reasons, because the
  original ones were wrong. Vercel is degraded rather than blocked (WAF false positives from
  shared national-gateway IPs). Netlify did not suspend Iranian users; it removed one open
  HTTP proxy and fraudulent accounts. Firebase *Hosting* is not the thing that blocks Iran,
  and Firebase is now blocked from the **Iranian side** anyway. All are excluded by
  §560.540(b)(3) regardless, and none can be signed up for or paid from Iran.
- **Never ship on a free platform subdomain.** Iran DNS-poisons `pages.dev` to the block-page
  IP; `workers.dev` is poisoned episodically. A custom domain is not optional.
- **ArvanCloud is OFAC-designated (SDN) and the listing is current.** Important nuance: **the
  constraint binds the developer, not the Tehran shop.** It has no enforcement surface inside
  Iran. But any US person, US entity, USD banking, or diaspora developer touching this
  project makes it prohibited. Use Liara or ParsPack.
- **TLS: Let's Encrypt, auto-renewing.** Verified: `basalam.com` uses it. Three of four
  competitor domains ship broken HTTPS. Beating them costs nothing, but only if renewal is
  automatic.

### 3.2 No third-party requests

**The rule stands. The old justification for it was false and must not be repeated.**

**Google Fonts is NOT blocked in Iran.** Live tests on 2026-08-24 returned HTTP 200 from 7 of
8 Iranian probe nodes for both the CSS API and a gstatic `woff2`. OONI has zero measurements
for `fonts.googleapis.com` in Iran - it is not even on censorship test lists. Anyone told
"Google Fonts is blocked" will check, find it false, and discount the rest of the advice.

**Self-host anyway, for the reasons that are actually true:**
- International latency is roughly **25-30x** domestic (~70-97ms from Iranian datacenters,
  worse on consumer mobile, against ~2.5ms domestic).
- Iranian developers report intermittent hangs producing **13,012ms FCP versus 348ms**
  self-hosted. A font request that hangs blocks the first paint.
- During a shutdown, any foreign origin is unreachable. Self-hosted assets survive.

**Also corrected:** `raw.githubusercontent.com` is **no longer blocked** (417 of 427 OONI
measurements OK from Iran, zero confirmed blocks). The 2017 DPI hardening is history, not
present tense.

**Still avoid, for real reasons:** Google Analytics and Tag Manager (privacy, weight, and a
foreign origin on the critical path) · Google Maps embeds (use **Neshan** or **Balad**, which
are domestic and Persian) · reCAPTCHA (there are no forms) · YouTube embeds.

**Rule: the site ships zero third-party network requests.** Everything self-hosted, everything
same-origin. `scripts/check-external.mjs` enforces it on every build. If a change introduces
an external origin, the build fails.

### 3.3 Performance is a conversion metric, not a vanity metric

Iran throttles hard. After the 2026 restoration, traffic ran at ~40% of prior peak and
users still could not reliably move video. International latency is 90-120ms before
throttling.

- **Budget: under 150KB above the fold; under 500KB for first meaningful render.**
- **The phone number must never be behind a font load, an image load, or JavaScript.**
  It renders in the first paint, in system-font fallback if necessary.
- One HTML file with critical CSS inlined. Pay the round-trip once, not thirty times.

### 3.4 Persian / RTL

- `<html lang="fa" dir="rtl">`.
- **Tailwind v4 logical properties only.** `ms-*` `me-*` `ps-*` `pe-*` `inset-inline-*`.
  **Banned: `ml-` `mr-` `pl-` `pr-` `left-` `right-` `text-left` `text-right`.**
  One physical-direction utility is what breaks an RTL layout. Treat it as a lint failure.
- **Never apply `letter-spacing` to Persian text.** It breaks Arabic-script joining. Zero
  or negative only, and only on Latin.
- Persian needs **more line-height** than Latin. Start at `1.8` for body.
- Latin brand names inside Persian sentences go in `<bdi>`. Without it, bidi reordering
  mangles the line.
- **Persian digits ۰-۹ everywhere** - prices, phone numbers, counts. The shop's own bio
  mixes Arabic-Indic and Persian numerals; normalise to Persian.
- ZWNJ (نیم‌فاصله, `U+200C`) matters in Persian copy. Preserve it; do not strip it in build
  tooling.

### 3.5 Persian search normalisation - the thing that silently breaks catalogue search

Arabic yeh `ي U+064A` and kaf `ك U+0643` look identical to Persian yeh `ی U+06CC` and kaf
`ک U+06A9` but encode differently. Users type both.

Every search index and every query passes through one `norm()`:

```js
const norm = (s) => s
  .replace(/[يى]/g, 'ی')   // Arabic yeh  -> Persian yeh
  .replace(/ك/g, 'ک')           // Arabic kaf  -> Persian kaf
  .replace(/‌/g, ' ')                // ZWNJ        -> space
  .replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x06F0 + 48))
  .replace(/[٠-٩]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48))
  .toLowerCase()
  .replace(/\s+/g, ' ')
  .trim();
```

Apply at **build time to the index** and **at runtime to the query**. Skipping this is why
Persian catalogue search "randomly" returns nothing. No search library fixes it for you.

### 3.6 Prices - decided against the evidence, deliberately

**Do not publish prices.** Show `تماس بگیرید`. This is the client's decision, made after
being shown the evidence below. Build to it fully.

**The evidence pointed the other way and the tradeoff is real.** A sample of 30 Iranian
physical watch shops via Torob's in-store contact API found **every listing carried a
numeric toman price and none said `تماس بگیرید`**. The inflation argument for hiding prices
is weaker than it looks: only 4 of those 30 shops had updated a price within 24 hours, and
**18 had left it untouched for months**, up to five. Iranians shortlist on Torob and Emalls,
and a shop with no number drops out of that comparison before a call can happen.

**Therefore the build must actively compensate for the lost shortlist visibility:**

1. **Do not chase price queries.** `قیمت ساعت سیکو` is Torob's and cannot be won. Target
   dealer-authority and neighbourhood queries instead - see §5 of
   `docs/research/PERSIAN-MARKET-INTEL.md`.
2. **Every product CTA carries its reference**, so a call opens on a specific watch rather
   than a general enquiry. This is the validated Iranian pattern; Torob pre-fills exactly
   this message for physical shops.
3. **Answer the three things retail callers actually want** before they have to ask:
   opening hours (56-63% of retail calls), stock state (50-54%), and directions (34-45%).
4. **Offer `نگه‌داشتن برای من`** (hold this for me). 36-38% of retail callers want to put an
   item on hold. It converts a browse into a shop visit and needs no backend.

In `Product` JSON-LD, express this as an `Offer` with `availability` and **no `price`**.

### 3.7 Contact channels

**WhatsApp, Telegram and Instagram are all blocked in Iran** as of mid-2026, reachable only
via circumvention. Only `tel:` is guaranteed to work for every visitor.

| Channel | Role | Link format |
|---|---|---|
| **Phone** | Primary, always | `tel:+98...` - sticky bar, above fold, every page |
| **Bale** | Domestic fallback, no VPN needed | `https://ble.ir/09XXXXXXXXX` - **leading 0, no +98** |
| **WhatsApp** | Secondary, VPN users | `https://wa.me/989XXXXXXXX?text=...` - **98, no leading 0** |
| **Instagram** | Footer link only | `https://www.instagram.com/hooman_watchgallery/` |

**Bale is the resilient channel.** It runs on the national network during filtering, needs
no username, and takes the same `09…` number the shop already publishes. 32% of sampled
Iranian shops publish it.

**Never embed an Instagram feed.** It hard-fails behind the filternet and blanks a section.
Link the profile; that is all.

#### Three link bugs that must be prevented in the build

1. **`wa.me` fails silently with a national number.** `wa.me/09121234567` does *not* error -
   it renders "Chat with 09121234567" and never resolves. Add a build-time assert that
   every `wa.me` href matches `/^https:\/\/wa\.me\/98\d{9}/`.
2. **`tel:` hrefs must be ASCII digits.** RFC 3966 permits only ASCII. Persian-Indic digits
   inside an href **will not dial**. Persian digits are for the visible label only.
3. **Bidi reordering mangles phone numbers.** A Latin-digit number inside Persian RTL text
   renders `021 4390 0000` as `0000 4390 021`. Wrap every number and every model reference
   in `direction: ltr; unicode-bidi: isolate`. One `.ltr-num` class fixes it site-wide.

**Data model:** `phone`, `whatsapp`, `bale`, `telegram` are **separate fields**. 37% of
sampled shops publish a different WhatsApp number from their main phone, and a landline
cannot have WhatsApp at all. Never derive one from another.

**Display convention:** Persian digits, national format, no `+98` in the visible label -
`۰۲۱ ۴۴۶۹ ۷۳۰۹`. A `+98` label reads as a foreign export site to a domestic customer.

## 4. Stack

**Astro, static output. Tailwind v4. No framework islands. Single locale `fa-IR`.**

Chosen because it is the only option that gets all of: per-product pre-rendered HTML
(required - Telegram and WhatsApp crawlers do not run JS, and link-sharing is the main
distribution channel in Iran), build-time AVIF/WebP without a server, zero shipped JS by
default, and native RTL.

Rejected: **Next.js static export** (`output: 'export'` forces `images: {unoptimized: true}`,
killing all image optimisation) · **any SPA** (social crawlers read the HTML shell and stop,
so every watch gets an identical generic preview) · **git-based CMS** (needs GitHub OAuth
and CI, both restricted from Iran).

### Version discipline - this is what keeps it building in 2027

- **Exact-pin `astro`. No caret.** Astro ships breaking majors roughly annually.
- Commit `package-lock.json`. Add `.nvmrc` with `22`.
- **Never run `npm update`.**
- Declare `sharp` as a **direct dependency at an exact version**. It is a native module and
  the most fragile link in the pipeline.
- Document `passthroughImageService()` as the one-line degradation if `sharp` ever breaks.

### No CI

The build runs on a developer laptop. The deploy is a folder upload. GitHub Actions is
restricted from Iran, and a CI dependency is the most common way a site like this becomes
un-updatable. **Do not add a pipeline.**

`README.md` must carry the Iranian npm mirror config, or a future maintainer will hit an
install hang and conclude the project is dead:

```
npm config set registry https://mirror-npm.runflare.com
```

### Images

- Product photos live in **`src/assets/watches/`**, never `public/`. Files in `public/` are
  copied verbatim with **no optimisation** and will silently ship as multi-MB JPEGs that
  look identical in the DOM.
- Every product cropped to **1:1**. Mixed aspect ratios in a grid is what makes a catalogue
  look amateur - this matters more than the codec.
- `<Picture formats={['avif','webp']}>` with JPEG fallback. AVIF first, never AVIF alone -
  the ~5% unsupported tail is concentrated on older devices common in this market.
- Grid thumbs `[240, 360, 480, 720]`; detail hero `[480, 720, 960, 1440]`.
- `loading="eager" fetchpriority="high"` on exactly the LCP image; lazy everything else.
- Set AVIF `effort: 4`. At 300 watches a cold build is minutes, not seconds.

### Search

At 50-300 products, **no search library**. A prebuilt `products.json` plus `Array.filter`
over a normalised blob covers it. Add Fuse.js only if real users demonstrably mistype. Do
not pre-emptively add a dependency to filter a 300-row array.

## 5. Design direction

**Design read:** local watch dealer catalogue for Iranian buyers, dark-vitrine premium
language, trust-first, leaning on the client's own logo geometry as the design system.

**Dials:** `DESIGN_VARIANCE: 6` · `MOTION_INTENSITY: 4` · `VISUAL_DENSITY: 4`

Motion is deliberately low. This audience is on a throttled network and the brief is
trust-first. Motion that costs bytes or delays the phone number is cut.

### The design system comes from the logo

The supplied mark is a **squircle watch dial**: 12 radial indices, quarter markers ~2.45×
the width of the batons, with an **hourglass counterform that doubles as the H of Hooman**.
Full measurements in `docs/research/LOGO-GEOMETRY.md`.

**The index tick is the atomic graphic element of this brand.** It is already load-bearing
in the logo, so reusing it costs nothing and buys coherence no competitor can copy. Use it
for section dividers, list bullets, active-state indicators, and the loading motif.

### Non-negotiables

- **Dark theme, locked.** No section flips to light mid-page.
- **One accent colour**, used identically on every section. The logo is monochrome, so the
  accent is a free choice - but the mark stays black-and-white so it always reads as the
  most authoritative element on the page.
- **Banned:** the AI beige/brass/oxblood "premium consumer" palette · black-and-gold casino
  · purple gradients · Inter as a Latin display face · Fraunces · Instrument Serif.
- **Zero em-dashes** in any user-facing string. Hyphens only.
- Real photography only. No div-based fake product previews, no hand-rolled decorative SVG.

## 6. Working rules for Claude in this repo

1. **Never publish prices.**
2. **Never add a third-party network request.** Zero external origins.
3. **Never use a physical-direction CSS utility.** Logical properties only.
4. **Never add a dependency** without justifying it against the "still builds in a year"
   bar. The default answer is no.
5. **Never `npm update`.** Never unpin a version.
6. **Verify in a browser before claiming done.** Use `browser-harness`, per the global
   rule. A green build is necessary and not sufficient.
7. **Research through `browser-harness`, sequentially.** Bot protection blocks `WebFetch`
   (107 × `403` on the first research pass) and parallel agents collide over the one shared
   Chrome. Drive it from the main thread, one page at a time.
8. **Uptime checks from outside Iran are meaningless.** Iran blocks by DNS poisoning and
   SNI-based DPI while routes stay globally visible. The site can look "up" from London and
   be unreachable in Tehran.
9. **Ask the owner rather than inventing.** Open questions are tracked in
   `docs/research/CLIENT-PROFILE.md`. Do not fabricate hours, stock, or warranty terms.
10. **Persian copy is a deliverable, not a placeholder.** Do not ship lorem ipsum or
    machine-translated Persian into a customer-facing string.

## 7. Repo layout

```
docs/
  research/          research dossier, client profile, verified findings, logo geometry
  phases/            PHASE-00 .. PHASE-08, executed in order
src/
  assets/watches/    product photography, 1:1, optimised at build time
  data/              products.json, brands.json
  components/
  pages/
  styles/
public/              favicon and files that must NOT be optimised
assets/brand/        source logo artwork
```

## 8. Phases

Work through `docs/phases/` in order. Each phase has its own file with a definition of
done. Do not start a phase before the one before it is closed.

| Phase | |
|---|---|
| 00 | Owner intake - the questions that block everything else |
| 01 | Foundation - repo, Astro, pinned deps, fonts, RTL harness |
| 02 | Brand system - logo SVG rebuild, palette, type scale, tokens |
| 03 | Content model - product schema, brand data, Persian copy deck |
| 04 | Imagery - photography direction, pipeline, batch processing |
| 05 | Build - pages, catalogue, filtering, contact surfaces |
| 06 | Trust and SEO - JSON-LD, Persian metadata, Neshan, OG cards |
| 07 | Performance and QA - budgets, RTL audit, accessibility, browser verification |
| 08 | Launch and handover - host, TLS, domain, owner documentation |
