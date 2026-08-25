# Phase 06 - Trust and SEO

**Goal:** make the shop findable and machine-readable, given that the usual local-SEO tool
does not exist in Iran.

---

## 1. Google Business Profile does not exist here. Plan around it.

Google's own support page states Business Profile **does not support businesses in Iran**,
because of OFAC sanctions. This is permanent, not a gap to work around.

So there is **no local pack, no claimable listing, no Google reviews, no Google-hosted
hours** for this shop, ever. Every hour that would normally go into GBP redirects into:

1. **`LocalBusiness` JSON-LD on the site** - which becomes the only machine-readable record
   of this business anywhere.
2. **Balad** (`business.balad.ir`) - free business registration, confirmed available. This
   is **the single highest-value non-website task for local discovery.** Do it in Phase 00
   so indexing starts early. Use the resulting Balad place URL as `hasMap`.
3. **Neshan** - correction to Phase 00: no public business-registration flow was found on
   Neshan's site, only a developer platform and support contacts. **Do not promise a Neshan
   listing.** Have the owner email `support@neshan.org` and treat it as secondary to Balad.

## 2. Structured data

### `JewelryStore`, not generic `LocalBusiness`

`JewelryStore` is a real schema.org type (subtype of `Store` → `LocalBusiness`) and Google's
guidance is to use the most specific subtype available. One site-wide node with a stable
`@id`, emitted on every page.

Carry: `name` (Persian), `address` (`PostalAddress`), `geo` (35.712130, 51.312458),
`telephone` in **E.164**, `openingHoursSpecification`, `hasMap` (Balad URL), `sameAs`
(Instagram), plus:

- **`knowsAbout`** - the twelve brands.
- **`hasOfferCatalog`** - the catalogue structure.

These two are how the "official dealer" positioning becomes machine-readable, which is what
AI answer engines read. Given there is no GBP, this node is doing the job GBP would do.

### `Product` - the no-price problem, handled honestly

**Google's `Product` rich result requires `price` inside `Offer`.** A no-price catalogue
**cannot earn a Product rich result.** Do not chase it, and do not promise it to the client.

Use `availability: InStoreOnly` with `seller` pointing at the `JewelryStore` `@id`:

```jsonc
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://<domain>/watch/seiko-srpb41j1/#product",
  "name": "ساعت مچی مردانه سیکو مدل SRPB41J1",
  "sku": "SRPB41J1",
  "mpn": "SRPB41J1",
  "brand": { "@type": "Brand", "name": "Seiko" },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStoreOnly",
    "seller": { "@id": "https://<domain>/#store" }
  }
}
```

That triple tells a machine "phone this shop" without inventing a price. **Accept the
Search Console "Missing field price" warning** - it is a warning, not an error, and it is
the honest representation.

### The currency argument that vindicates the no-price decision

There is **no ISO 4217 code for toman.** The code is `IRR` (rial), and one toman equals
either 10 or 10,000 rials depending on which convention the person entering data used. Any
`priceCurrency: IRR` figure is therefore plausibly wrong **by a factor of 10 or 10,000**.

This is an independent, structural argument for the client's call-for-price decision that
had nothing to do with inflation. Worth recording: **the no-price model avoids a real
correctness hazard**, not just a maintenance one.

### Also ship

- **`BreadcrumbList`** - the cheapest structured-data win and the only one here that
  reliably changes SERP appearance (the URL line becomes a breadcrumb trail). Generate from
  the file path at build time.
- **`ItemList`** on brand pages - ~800 bytes, no downside, gives AI answer engines a clean
  ordered list of stock. **Do not sell it to the client as a Google carousel** - carousels
  support only Course, Movie, Recipe and Restaurant. Product is not eligible.

## 3. Persian SEO

**Google holds 99.42% of Iranian search** (Statcounter, July 2026). Bing is 0.48%. Optimise
for exactly one crawler. **Skip Bing Webmaster Tools, IndexNow, and Yandex verification.**

**Mobile is 64.83% of Iranian traffic.** Design and test at 360-390px first. Desktop is the
secondary layout.

### The queries, from live Google autocomplete (hl=fa, gl=ir)

> `نمایندگی رسمی ساعت سیکو در ایران`
> `نمایندگی رسمی ساعت کاسیو در تهران`
> `نمایندگی رسمی ساعت سیتیزن`

**The shop's actual differentiator is the top autocomplete for that stem.** This is the
luckiest finding in the project: what Hooman uniquely is, is what people are already typing.
The homepage should own these three phrases outright.

Also surfaced: **`ساعت فروشی تهران اینستاگرام`** - Iranians Google for a shop's Instagram.
Put the handle in **prominent visible text** and in `sameAs`. The site can capture queries
that currently go nowhere.

### Title patterns

Following Torob's live convention (`لیست قیمت روز ساعت سیکو | ترب`):

```
Product:  {مدل} | {برند} اصل - گالری ساعت هومن
Brand:    ساعت {برند} اصل | نمایندگی رسمی - گالری ساعت هومن
Home:     نمایندگی رسمی سیکو، سیتیزن، کاسیو | گالری ساعت هومن - اکباتان تهران
```

**Hyphens, never em-dashes.** Persian meta descriptions, 120-150 characters. The
✓-prefixed benefit list is a proven local convention (Digikala uses it) and is worth
copying.

**`lang="fa"` is not an SEO lever.** Google determines language from visible content and
ignores `lang` attributes and geo meta tags. It remains mandatory for screen readers, RTL
rendering and hyphenation. **Skip hreflang entirely** - single language, single market.

### Build-time Persian normaliser

Force `U+06CC` (ی) and `U+06A9` (ک) across all Persian content, preserve ZWNJ, normalise
display digits to Persian ۰-۹. **Keep model references in ASCII** (`SRPB41J1`, `GA-2100`) -
that is how they are printed on the caseback and how people type them.

## 4. The crawler trap - verify this before launch

> **A naive Iranian VPS may geo-block foreign IPs. Googlebot crawls from US addresses. If
> the host blocks foreign traffic, Googlebot never reaches the site and the entire SEO
> effort is worthless.**

This is the highest-severity item in the phase and it is invisible from inside Iran.

Verified that major Iranian sites *are* reachable from US-routed hosts - `digikala.com`,
`basalam.com`, `divar.ir`, `aparat.com` and `irna.ir` all returned `200`. So it is
solvable, but it must be **explicitly tested**, not assumed.

**Test from a non-Iranian vantage point before launch.** If the host geo-blocks, front it
with an Iranian CDN that serves foreign IPs, or change host.

## 5. Social previews

**Correct the assumption in the brief: OG tags buy almost nothing on Instagram**, which does
not render previews for arbitrary links. The surfaces that actually render a preview are
**WhatsApp and Telegram**.

- OG image **1200×630, JPEG or PNG - not WebP.** Some preview crawlers still choke on WebP.
- Under ~300KB, absolute HTTPS URL, with `og:image:width` and `og:image:height` declared so
  the client can lay out the card before downloading.
- Add `twitter:card=summary_large_image` as a fallback.
- Generate per-product OG images at build time.
- **Telegram's preview behaviour is undocumented and empirical.** Verify by pasting a real
  URL into a Telegram chat. Do not assume.

## 6. sitemap.xml and robots.txt

One flat `sitemap.xml`, no index file. `<lastmod>` only if it is verifiably accurate -
Google ignores `<priority>` and `<changefreq>` entirely.

`robots.txt` follows Torob's minimal pattern, not Digikala's:

```
User-agent: *
Disallow:

Sitemap: https://<domain>/sitemap.xml
```

There are no carts or accounts to hide. **Do not blanket-block anything.**

---

## Definition of done

- [ ] `JewelryStore` JSON-LD site-wide, stable `@id`, with `knowsAbout` and `hasOfferCatalog`.
- [ ] `Product` JSON-LD with `InStoreOnly` + `seller`; validated in the Rich Results Test.
- [ ] `BreadcrumbList` on every nested page.
- [ ] Homepage targets the three `نمایندگی رسمی` phrases.
- [ ] Instagram handle in visible text and `sameAs`.
- [ ] Title and meta templates applied; **zero em-dashes**.
- [ ] `sitemap.xml` and `robots.txt` generated at build.
- [ ] Per-product OG images, 1200×630, JPEG/PNG, dimensions declared.
- [ ] **Telegram and WhatsApp previews verified by pasting a real URL into a real chat.**
- [ ] **Site confirmed reachable from a non-Iranian IP.** Blocking item.
- [ ] Balad listing live; Neshan enquiry sent.

## Do not

- Do not promise a Google local pack, Google reviews, or a Product rich result. None are
  available for this shop.
- Do not list on Torob, Basalam or Divar. All three require published, current prices,
  which the business model refuses. Revisit only if the pricing decision changes.
