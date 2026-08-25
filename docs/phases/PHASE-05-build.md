# Phase 05 - Build

**Goal:** the actual site. Pages, catalogue, filtering, and every contact surface.

**The mental model:** this is not a degraded e-commerce site. Rolex sells nothing online -
the terminal action on rolex.com is a store locator that hands you to an authorised
retailer. **The site's job is desire, shortlist, and address. The shop's job is the
transaction.** Build it as the category-defining pattern, not as a shop with the cart
removed.

---

## Page inventory

| Route | Purpose |
|---|---|
| `/` | Landing |
| `/watches/` | Full catalogue with filters |
| `/brand/<key>/` | One per brand (12) |
| `/watch/<slug>/` | Product detail, one per product |
| `/about/` | The shop, the dealer status, the 15 years |
| `/visit/` | Address, map, landmark directions, hours |
| `/repairs/` | **Confirmed - they do repairs and battery changes.** `تعمیر ساعت اکباتان` is high-intent and low-competition; this may convert better than the catalogue |
| `/404` | |

## Landing page section order

Assembled from verified premium-retail references. **Every section either builds desire or
removes a reason not to phone. Nothing else earns a slot.**

1. **Header** - logo, nav, **phone number as text, not an icon**. Validated at the premium
   end: A Collected Man, a high-end independent dealer, puts its number in the top header
   of every page. This is not a cheap-local-business tell.
2. **Hero** - one full-bleed photograph of a real watch from the real case. Model name as
   overline, one short line, the call button. No stock video, no autoplaying reel.
   Headline is a **countable fact, not a slogan**.
3. **How buying works** - states plainly `فروش فقط حضوری`, no online checkout, plus hours.
   This stops people hunting for a cart and bouncing.
4. **The dealer claim** - نمایندگی رسمی سیکو، سیتیزن، کاسیو, with the certificate photo if
   Phase 00 produced one.
5. **Catalogue preview** - featured watches, brand filters.
6. **Trust block** - years trading, warranty and servicing policy, **photographs of the
   actual shop and the actual person**.
7. **Visit us** - address, map, **landmark directions**, parking, hours.
8. **Footer** - full name/address/phone repeated, Instagram link, JSON-LD.

**Hero discipline:** headline ≤ 2 lines, subtext ≤ 20 words, CTA visible without scrolling,
max `pt-24` top padding. Max 4 text elements. No trust micro-strip inside the hero - it goes
in section 4.

## Product card

Three lines, per Phase 02. Brand (uppercase, tracked) / model (sentence case) / **reference
in Plex Mono**. No adjectives. No border, no radius, no shadow.

## Product detail page

- Clean shot and wrist shot, switchable.
- Spec table in **Plex Mono**: reference, case size, movement, water resistance, crystal,
  strap, case material.
- **`اصل` / authenticity marker next to the product.** Torob carries an `is_authentic`
  flag and an اصل badge, and price dispersion for the same Casio SKU across Iranian shops
  ran 344,000 to 11,100,000 toman - that spread is genuine versus replica. Authenticity has
  to be legible on the product, not just the About page.
- Stock state: `موجود` or `تماس بگیرید`, plus the catalogue freshness stamp.
- **The CTA carries the reference.**

## Contact surfaces

Per `CLAUDE.md` §3.7. Four channels, one primary.

### Sticky call bar

- 56-64px tall, opaque, high contrast, bottom of viewport (thumb zone).
- **One primary action** (تماس) plus at most one secondary (واتساپ).
- **Not a floating circular FAB** - a FAB hides its label and will cover product imagery.
- Tap targets ≥ 48px. WCAG 2.2 SC 2.5.8 sets the AA floor at 24×24 CSS px, but that is a
  compliance floor, not a design target for a thumb-driven call button.

### The pre-filled message - copy Torob's validated flow

Torob's CTA for a physical shop is literally `اطلاعات تماس` (contact info), not "buy", and
it pre-fills a Persian WhatsApp message. Mirror it, adapted for call-for-price:

```
سلام، از سایت گالری ساعت هومن تماس می‌گیرم.
درباره‌ی [model] با کد [reference] سوال داشتم.
موجوده؟ قیمتش چنده؟
[product URL]
```

That one sentence carries both questions an Iranian buyer actually has, and it opens the
conversation on a specific watch.

### Link formats - get these exactly right

```
tel:      tel:+982144697309                     ASCII digits only, E.164
WhatsApp  https://wa.me/989123470889?text=...   98 prefix, NO leading 0
Bale      https://ble.ir/09123470889            leading 0, NO +98
Instagram https://www.instagram.com/hooman_watchgallery/
```

**Three formats, three different conventions. Do not derive one from another.**

Build-time asserts (per `CLAUDE.md` §3.7):
- every `wa.me` href matches `/^https:\/\/wa\.me\/98\d{9}/`
- every `tel:` href matches `/^tel:\+98\d{9,10}$/`
- no `wa.me` link is generated from a landline

### The bidi trap

Every phone number and every model reference gets `direction: ltr; unicode-bidi: isolate`.
Without it, `021 4390 0000` renders as `0000 4390 021` inside Persian text. One `.ltr-num`
class, applied everywhere.

### `نگه‌داشتن برای من` - hold this for me

36-38% of retail callers want to put an item on hold. It converts a browse into a shop
visit, needs no backend, and almost nobody offers it. Add it as a secondary CTA on the
product page with a pre-filled message.

## Filtering

Client-side, over the Phase 03 index, using `Array.filter` and shared `norm()`.

Facets, in the order Iranians expect (from Torob's live filter set):
**brand · gender (`مردانه` `زنانه` `ست` `بچگانه`) · case shape · movement · strap**

**Case shape is a genuine Iranian expectation** and would be easy to omit by Western habit.

- Filters must work with **JavaScript disabled or failed** at least to the extent that all
  products remain reachable via brand pages. Assume some visitors are on a degraded network.
- Filter state in the URL so a filtered view can be sent over WhatsApp.
- Real empty state: what to do when nothing matches, with the phone number in it.

## States

Loading skeletons using the tick motif. Empty search state. 404 that offers the catalogue
and the phone number. No spinners.

---

## Definition of done

- [ ] All routes build and render.
- [ ] Phone number in the header **as text** on every page, above the fold.
- [ ] Sticky call bar on mobile, 56-64px, not a FAB.
- [ ] Every product CTA carries its reference in the pre-filled message.
- [ ] All link-format asserts pass.
- [ ] `.ltr-num` on every phone number and reference; verified visually in Persian context.
- [ ] Filters work; state is in the URL; catalogue reachable without JS.
- [ ] Persian search verified with both Arabic and Persian yeh/kaf spellings.
- [ ] `فروش فقط حضوری` stated plainly.
- [ ] Zero em-dashes in rendered output.
- [ ] No physical-direction CSS utilities - lint passes.
- [ ] Zero third-party requests - guard passes.

## Verification

```bash
browser-harness <<'PY'
new_tab("http://localhost:4321/watch/seiko-srpb41j1/"); wait_for_load()
print(js("""JSON.stringify({
  tel:  [...document.querySelectorAll('a[href^="tel:"]')].map(a=>a.href),
  wa:   [...document.querySelectorAll('a[href*="wa.me"]')].map(a=>a.href.slice(0,40)),
  bale: [...document.querySelectorAll('a[href*="ble.ir"]')].map(a=>a.href),
  emdash: (document.body.innerText.match(/-/g)||[]).length,
  external: performance.getEntriesByType('resource').map(r=>r.name).filter(n=>!n.startsWith(location.origin))
})"""))
PY
```

`tel` must be `+98…` ASCII. `wa` must start `https://wa.me/98`. `emdash` must be `0`.
`external` must be `[]`.
