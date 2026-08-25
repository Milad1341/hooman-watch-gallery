# Hooman Watch Gallery - Research Dossier

Compiled 2026-08-24 from 17 parallel research lanes plus adversarial verification.
Where verification overturned a claim, the correction wins and is recorded in section 10.

Owner-confirmed facts live in `docs/research/CLIENT-PROFILE.md` and always override research.
This dossier is the decision layer on top of them.

---

## 0. Executive summary - the 10 decisions this research forces

**1. Host inside Iran on a `.ir` domain. Zero foreign runtime dependencies.**
Iran ran two nationwide shutdowns in 2026: roughly 8-28 January (~20 days) and 28 February to 26 May (~88 days, the longest nationwide disruption recorded in any country). During the second, only services inside the National Information Network stayed reachable (https://en.wikipedia.org/wiki/2026_Internet_blackout_in_Iran). Traffic has since settled at roughly 59% of pre-shutdown levels (https://blog.cloudflare.com/iran-internet-partially-restored-may-2026/). Domestic hosting is also 3-10x faster and cheaper on the visitor's own mobile data, because Iran prices NIN traffic at roughly one third of international (https://en.ito.gov.ir/news/148/managing-preferential-tariffs-for-internet-domains-with-domestic-hosting-of-the-country-). **Primary: Liara (liara.ir). Fallback: ParsPack.** Not ArvanCloud, which is OFAC-designated (https://home.treasury.gov/news/press-releases/jy1518).

**2. GitHub Pages is disqualified, but not for the reason everyone assumes.**
GitHub holds a real OFAC licence for Iran (https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls). The blocker is GitHub's own product terms, which ban using Pages "as a free web hosting service to run your online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions." A shop catalogue is that. GitHub is fine for source control; it is not the production origin.

**3. No prices on product cards. Publish a per-brand price band instead.**
The owner has decided against prices. That decision survives contact with the counter-evidence, but only if compensated. Iranian retail prices swing wildly for the same reference - a Seiko SSK003K1 starts at ۲۵٬۵۰۰٬۰۰۰ toman while an SSA405J1 starts at ۹۵٬۰۰۰٬۰۰۰ (https://torob.com/), and the shop's own range spans Q&Q at ۸۰۰٬۰۰۰ to Seiko above ۱۰۰٬۰۰۰٬۰۰۰, a 30x spread. A price-free catalogue makes a first-time visitor assume they cannot afford the shop and they never phone. **Fix: one honest "از ... تومان" band per brand page, dated, plus "قیمت روز را تماس بگیرید" per model.** One number per brand, fourteen numbers total, is a file the owner can maintain.

**4. Curated catalogue of ~175 models, honestly framed. Not 1,000.**
Photography is the critical path: 1,000 models at 2 shots each is ~50 hours of shooting that cannot hold one lighting setup, and NN/g's binding requirement for a listing page is that background, orientation, lighting and scale match across all products (https://www.nngroup.com/articles/product-photos-listing-pages/). A ragged grid reads as a scraped supplier feed, which destroys the authenticity positioning. The line "بیش از ۱۰۰۰ مدل در مغازه موجود است" is not an apology for the gap, it is the strongest sales line on the site.

**5. Photograph the actual stock. No brand press images, no marketplace images, no AI renders.**
None of the fourteen brands offers a self-serve, licence-clear image library. Citizen's assets sit behind a permissioned Widen/Acquia portal (https://www.acquia.com/resources/customer-stories/citizen-watch), Tommy's newsroom is login-gated (https://newsroom.tommy.com/), casio.com returns Akamai 403 to everything. Owning the watch grants no rights to the photograph: 17 U.S.C. §109 covers the copy, not the reproduction right (https://www.law.cornell.edu/uscode/text/17/109). The enforcement risk is not a lawsuit, it is a DMCA takedown pulling the catalogue or the Instagram account without warning (https://www.copyright.gov/512/). Own photos are also strictly better here: a photo of the actual watch on the actual counter is the authenticity proof this market demands.

**6. Phone first, everywhere, on every page. Landline as the hero number.**
`tel:` is the only channel that works with no network conditions attached. WhatsApp, Instagram and Telegram are all filtered and reachable only via VPN (https://www.aljazeera.com/news/2026/5/31/iran-reinstates-some-internet-access-but-restrictions-remain-for-most). Across 85 real Iranian shops sampled from Torob's contact API, 80% publish WhatsApp and 32% publish Bale; zero publish Eitaa or Rubika. No competitor in the 13-shop teardown ships a sticky mobile call button, and one (dorrinwatch.com) does not even wrap its number in a `tel:` link. A persistent bottom-bar call button is twenty lines of code and the highest-ROI element in the build.

**7. Ship the two-shift opening hours correctly. This is the highest-value fact on the page.**
Checking business hours is the top reason people phone a retail store, at 56-63% (https://ssl.gstatic.com/think/docs/click-to-call_research-studies.pdf). The shop is open every day, ۱۱:۰۰-۱۴:۰۰ and ۱۷:۰۰-۲۲:۰۰. That needs two `openingHoursSpecification` entries per day. A single 11:00-22:00 range sends customers to a closed shop and turns the site's best asset into a complaint.

**8. Persian-only. No English site, no language switcher, no i18n library.**
The market norm is Persian body copy with Latin brand names on the dial (https://khanesaat.com/ has no `/en` at all). Every Latin token inside Persian prose gets wrapped in `<bdi>`, `letter-spacing` is banned on Persian text per CSS Text 3 §7.2.1 (https://www.w3.org/TR/css-text-3/#letter-spacing-property), and line-height goes to ~1.8 body / ~1.35 headings because Arabic-script ascenders and descenders extend further than Latin (https://w3c.github.io/alreq/).

**9. Filter by case shape, not case diameter.**
Torob's live filter set puts **فرم صفحه نمایش** (circle / square / rectangle / oval) fourth, above nearly everything a Western watch site would filter on. It also separates `دخترانه` and `پسرانه` from `بچگانه`, and offers **امکان خرید حضوری** as a filter - direct evidence that Iranian buyers actively search for a shop they can walk into. The schema needs `case_shape` as a first-class field, and "come in and try it on" belongs above the fold, not in the footer.

**10. Lead with the gallery, not with someone else's brand.**
Every single one of the 13 competitors opens on a rotating carousel of manufacturer logos. Not one leads with its own name, its own shop, its own people. Meanwhile vesta.watch's homepage HTML contains the word اصالت 465 times and گارانتی 295 times, and not one competitor shows a photograph of their actual shop, a warranty card, a serial number, or a named human being. One photo of Hemmati behind the counter out-persuades 465 badge repetitions. That space is completely unoccupied.

---

## 1. Hard constraints (Iran)

### 1.1 The verdict table

| Provider / service | Works from Iran? | Use or avoid | Why |
|---|---|---|---|
| **Liara** (liara.ir) | Yes, domestic | **USE - primary host** | Iranian datacenters (Qom, not Tehran), git/CLI deploy, static PaaS, rial billing, no sanctions exposure. Free tier currently suspended, so budget the paid plan. |
| **ParsPack** (parspack.com) | Yes, domestic | **USE - fallback host** | cPanel/DirectAdmin, free Let's Encrypt SSL, S3-compatible storage, Iran or Germany DCs. FTP upload of a `dist/` folder is a step the owner can be taught. |
| **IranServer** (iranserver.com) | Yes, domestic | Acceptable | DirectAdmin only, Iran + EU DCs. Free SSL on shared plans is third-party-reported, not vendor-stated. Verify before relying on it. |
| **ArvanCloud** | Yes, domestic, excellent | **AVOID** | OFAC-designated SDN since 2 June 2023 (https://home.treasury.gov/news/press-releases/jy1518). No US person may transact. General License P expired 6 July 2023. If any developer or card in this project has a US nexus, this is prohibited. |
| **Vercel** | Degraded, not blocked | **AVOID** | Reachable, but Iranian traffic arrives from shared national-gateway IPs and trips WAF false-positive 403s. The self-serve fix (System Bypass Rules with CIDR) is Pro-tier only. Iranians also cannot sign up or pay. |
| **Netlify** | Degraded | **AVOID** | The May 2026 suspensions were an abuse action against an open-proxy project, not a nationality ban (https://answers.netlify.com/t/urgent-appeal-account-suspension-humanitarian-internet-access-in-iran-project-ir-netlify/162626). But its Self-Serve Subscription Agreement §11 carries an export-control clause and Iranian signup/payment has never worked. |
| **GitHub Pages** | Legally licensed, technically variable | **AVOID as production origin** | GitHub holds a real Iran OFAC licence, but its own product terms ban Pages for online business or e-commerce. Fine for source control. |
| **GitHub (repo hosting)** | Yes, licensed | **USE for source only** | https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls |
| **raw.githubusercontent.com** | Historically poisoned, currently clean | Avoid as a runtime dependency | OONI shows 417/427 OK from Iran over the last 12 weeks with zero confirmed blocks, so the 2017 block no longer holds. Still: never serve catalogue JSON or images from it. |
| **Cloudflare Pages / workers.dev** | Poisoned | **AVOID** | `pages.dev` resolves to the block-page IP 10.10.34.36 from Iranian resolvers. Cloudflare IP ranges were blanket-blocked during June 2025. Custom domains proxied through Cloudflare inherit the blast radius. |
| **Firebase Hosting / GCP** | Backend APIs blocked | **AVOID** | Firebase Auth and Realtime Database return "Country Blocked" from Iran, and Filterwatch's June 2026 report lists Google Firebase as still blocked from the Iranian side. Owner cannot sign up either. |
| **Google Fonts** (fonts.googleapis.com / gstatic) | Reachable, 0.29-0.97s | **AVOID - self-host instead** | Not blocked. Measured 200 OK from 7/8 Iranian probe nodes. But every major Iranian commercial site self-hosts (Divar serves IRANSansWeb from s100.divarcdn.com; Digikala from `/_next/static/media/`), the request is render-blocking, and Iranian devs report intermittent hangs producing 13,012ms FCP versus 348ms self-hosted. Do not justify self-hosting with "Google Fonts is blocked" - that is false. |
| **jsDelivr / unpkg / cdnjs** | Reachable, 0.22-0.53s | Avoid | Technically fine. Still a foreign origin in the critical path that dies during international-link throttling. Vendor everything. |
| **Google Analytics / GTM** | Endpoints reachable, accounts terminated | **AVOID** | Google terminated GA access for Iranian accounts in Dec 2024 - Jan 2025 (https://www.khabaronline.ir/news/2010036/). GTM was also the slowest asset measured, at 2.70s on one node. |
| **Google Maps Platform** | Legally prohibited | **AVOID** | Iran is on the Prohibited Territories list (https://cloud.google.com/maps-platform/terms/maps-prohibited-territories). No API key, no billing account, ToS breach. |
| **OpenStreetMap embed iframe** | Yes, ~0.4s, keyless | Acceptable fallback | No key, no account, no `X-Frame-Options`. But Persian street and POI coverage in Iranian neighbourhoods is thinner than Neshan's. |
| **Neshan** (neshan.org) | Yes, fastest asset measured (0.02-0.10s) | **USE - static image only** | Best Persian map quality. Requires an API key exposed client-side plus a topped-up toman balance for the Leaflet SDK. Use a **static map image, self-hosted**, linked to the shop's Neshan place page. No JS, no key in HTML, no runtime dependency. |
| **Balad** (balad.ir) | Yes, 0.06-0.21s | **USE - register the business** | Free business registration at https://business.balad.ir/. No public embed API. Link out, do not embed. This is the highest-value zero-code task in the project. |
| **YouTube embed** | Blocked | **AVOID** | 0/8 Iranian nodes reached an embed URL. OONI: 34,250 confirmed blocks of 48,241 IR measurements. Renders as a dead grey box. |
| **Aparat** (aparat.com) | Yes, 0.04-0.14s | Use if video is ever wanted | Domestic video host. |
| **Instagram embed widget** | Blocked | **AVOID** | Will blank a whole section. |
| **Instagram profile link** | Blocked, but expected | **USE as a plain link** | Divar, Torob, Technolife, Okala, Alibaba and Basalam all still link Instagram profiles despite the block. Audiences reach it via VPN. Footer placement, never the primary CTA. |
| **wa.me** (WhatsApp) | Deep link resolves, app is VPN-dependent | **USE as secondary CTA** | `https://wa.me/989123470889?text=...`. Verified: 302 to api.whatsapp.com, works with or without the app installed. |
| **t.me** (Telegram) | Blocked | Only if owner confirms use | `t.me/+989...` resolves a raw phone number with no username needed. |
| **ble.ir** (Bale) | Yes, domestic, unblocked | **USE only if owner confirms** | The only domestic messenger with a working phone deep link: `https://ble.ir/09123470889` (leading zero, no +98). 32% of sampled Iranian shops publish it. A dead messenger link is worse than none. |
| **eitaa.com / rubika.ir** | Reachable | **AVOID** | Username-only, no phone deep link. Worse: a phone-shaped path silently resolves to a stranger's account. Zero of 85 sampled shops publish them. |
| **Let's Encrypt** | Issues to Iranian sites | **USE - hard requirement** | basalam.com runs on Let's Encrypt. Auto-renewing, free, and this site must survive a year of neglect. |
| **IRNIC .ir domain** | Yes | **USE** | ~۸۴٬۰۰۰ toman/year (https://parspack.com/domain). Requires the owner's کد ملی and a Shahkar-matched SIM, done in person by him. 1-3 business days for approval. Buy 5 years upfront. |
| **.com via Iranian reseller** | Yes, ~۲٬۲۱۷٬۰۰۰ toman/year | Skip | 26x the price with no benefit for a Tehran walk-in shop. `.ir` is the stronger geotargeting signal per Google's own docs and is eligible for the preferential-tariff registry. |
| **Simple Icons CDN** | Reachable | **AVOID - irrelevant** | Verified against all 3,453 icons in v16.28.0: zero watch brands. Not Casio, Seiko, Citizen, Rolex, Fossil, G-Shock, Edifice, Timex, Guess, Tommy. Delete any plan depending on it. |
| **E-namad** (اینماد) | N/A | **Not required** | Mandatory only for sites that sell, take orders, or accept payment (https://www.zoomit.ir/howto/178304-how-to-register-for-enamad/). A catalogue with no purchase flow does not need it. 12 of 13 competitors display it, so consider it later for optics - but do not let scope creep add a buy button, which would drag in a gateway, tax registration and a licence. |
| **Samandehi** (ساماندهی) | N/A | **Not required** | Targets content and media publishers. A product catalogue is not one. Renewal every six months would violate the low-maintenance goal anyway. |

### 1.2 The legal position, stated correctly

Cite **31 CFR §560.540**, not "GL D-2". OFAC folded GL D-2 into the regulations effective 17 May 2024 (https://www.federalregister.gov/documents/2024/05/17/2024-10721/iranian-transactions-and-sanctions-regulations). There is no GL D-3.

Two corrections that matter:

- §560.540(a)(1) authorizes **fee-based and free** services incident to internet communications, including cloud services. The "no cost" condition applies only to the Government of Iran under (a)(6), not to Iranian users generally.
- §560.540(b)(3) expressly does **not** authorize "web-hosting services for websites of commercial entities located in Iran." So even a lawful `.com` registration does not make US commercial hosting available to this shop. Hosting goes domestic regardless of what any signup form accepts.

Never plan around what sanctions technically allow. Plan around observed provider behaviour. Google refuses to rely on the general licence; GitHub obtained a specific one; Cloudflare relies on it; over-compliance is the norm and is applied retroactively without notice.

### 1.3 Network reality to design against

- Mobile is 64.83% of Iranian web traffic, desktop 34.84% (https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/iran, July 2026). Mobile-first, but a third of visitors are on wide screens and will judge the shop by it.
- Two speed pictures disagree and the gap is the story: Ookla's Iranian median is 57.64 Mbps mobile, mostly measured to in-country servers; SpeedOf.Me's real-browser open-internet tests put Iran at 8.1 Mbps down with 187 ms median latency, ranked 106th of 119 (https://speedof.me/internet-speed/iran). Domestic is fast, anything crossing the border is roughly 7x slower with a fresh ~200ms handshake per foreign origin.
- Mobile data is metered and was repriced upward ~34% in Dec 2025 and ~18% in Feb 2026. A 3MB hero image is not just slow, it is rude.
- Uptime monitoring from outside Iran will show the site "up" while Iranian customers cannot load it, because blocking is DNS poisoning and SNI-based DPI rather than BGP withdrawal. Any availability check must run from an Iranian vantage point or it is measuring nothing.

---

## 2. Brand intelligence

Fourteen brands confirmed. Priority merchandising order: **SEIKO, CITIZEN, CASIO, TIMEX**, with **G-SHOCK** merchandised separately from Casio and **Q&Q** standing alone.

Certified reseller status covers **Seiko, Citizen, Casio, G-Shock only**. Persian copy keeps the shop's own established claim نمایندگی رسمی. English copy must say "certified reseller" or "authorised retailer", never "official distributor", "sole agent" or "exclusive importer". Overclaiming a trademark relationship is a real legal risk on a site whose entire purpose is trust.

**Warranty is provided by the brand's Iranian representative, not by the shop.** Copy must say so precisely on every product page. Never imply the shop underwrites it.

### 2.1 SEIKO (سیکو)

**Positioning.** Founded 1881, made the world's first commercial quartz wristwatch (Astron, 1969), and runs a tiered brand house below King Seiko, Credor and Grand Seiko (https://en.wikipedia.org/wiki/Seiko). This is the heritage and mechanical brand of the roster, and the only one where a customer can buy a real automatic movement at shop-floor prices. That is the story: Japanese watchmaking history you can actually afford.

**Price band.** Iranian street, live from Torob: SSK003K1 from ۲۵٬۵۰۰٬۰۰۰ توман across 18 shops, SRPE45J1 from ۲۸٬۵۰۰٬۰۰۰, SSA405J1 from ۹۵٬۰۰۰٬۰۰۰, SRPB46J1 from ۱۰۶٬۹۹۳٬۰۰۰. Roughly a 4x spread across four models of one brand. US retail: Seiko 5 Sports tops out around $500, Presage $350 to $1,500+, Prospex $400 to $2,000+.

**Collections to merchandise (five).** Prospex, Presage, Seiko 5 Sports, Astron, Essentials. Confirmed live on https://www.seikowatches.com/global-en/news and https://seikousa.com/collections/all. King Seiko only if actually stocked.

**Microcopy asset.** The Seiko 5 definition is a quotable, concrete five-item spec: automatic movement, day+date on the dial, water resistance, recessed crown at 4 o'clock, durable case and bracelet (https://en.wikipedia.org/wiki/Seiko_5). Five bullets, no marketing fluff, immediately establishes the shop as knowledgeable rather than a dropshipper.

**Buyer.** Splits between young enthusiast (5 Sports, Prospex) and dress/gift (Presage, Essentials, and the women's quartz line Iranian sellers list heavily).

**Search vocabulary.** Nickname search beats reference numbers here. Put "Turtle", "Cocktail Time", "SKX" in the model title text, not only the SRPD reference, or the catalogue is invisible to the searches people actually type. SKX007 is discontinued but remains the reference diver.

**Logo asset.** https://upload.wikimedia.org/wikipedia/commons/2/2c/Seiko_logo.svg - Public domain (PD-textlogo) with a `trademarked` restriction tag. **The official SVG declares no `fill`, so it inherits `currentColor` and themes light/dark with zero editing.** Bundle locally; do not hotlink Seiko's CDN.

**Iran market note.** Multiple shops (Elite Online, Kazemi, Nik Gallery, Mehdipour) all claim to be the only official Seiko agent. The claim is contested and unverifiable from outside. Do not compete on it - differentiate on proof.

### 2.2 CITIZEN (سیتیزن / سیتی زن - carry both spacings)

**Positioning.** Fully vertically integrated Japanese manufacturer, in-house from component to assembly; its Miyota arm makes ~100 million movements a year and supplies competitors (https://en.wikipedia.org/wiki/Citizen_Watch). The one-line blurb writes itself: Japanese, made in-house, never needs a battery.

**Eco-Drive is a technology badge that spans collections, not a collection.** It is the single most sellable technical claim in the entire roster and belongs as a cross-cutting filter chip and card badge, not buried in copy.

**Price band.** US retail read live off citizenwatch.com: entry ~$220-280 (list $275-350), typical $380-625, upper $716-995 for Eco-Drive/atomic. Series8, Attesa, The Citizen and Campanola sit above at $1,000-5,000+ and are explicitly excluded from site-wide discounts. In an Iranian shop this lands above Casio and roughly level with mainstream Seiko: the gift and dress-with-tech brand, not the cheap brand.

**Collections to merchandise (four).** Promaster (sport/dive), Tsuyosa (fashion automatic), Citizen L / xC (women), plus a generic "Eco-Drive Classic" bucket. Citizen's full official set is PROMASTER, TSUYOSA, Series8, ATTESA, The CITIZEN, CITIZEN L, xC, Eco-Drive One, Campanola.

**TSUYOSA became the best-selling watch in Citizen's history by 2024** (https://en.wikipedia.org/wiki/Citizen_Watch). It deserves a hero slot and is already merchandised by Iranian sellers by name.

**Search vocabulary.** Promaster Diver (BN0150/BN0151 Eco-Drive, NY0040 "Fugu" mechanical), TSUYOSA NJ0150, Promaster Blue Angels. Persian: پرومستر، سویوسا، بلو آنجل.

**Logo asset.** https://upload.wikimedia.org/wikipedia/commons/5/51/Citizen_logo.svg - Public domain, `trademarked`. Inspected: 7 hardcoded `fill:#000000`. Render solid black or reversed white, never tinted. No official Citizen brand hex was recoverable, so do not invent one.

**Iran market note.** Zaman Avaran Pishro Co. (شرکت زمان آوران پیشرو, saati.watch) is presented as Citizen Japan's sole official agent in Iran, with a 5-year domestic warranty after registering the watch on the importer's site. If Hooman's Citizen stock carries this, the registration warranty is a concrete, verifiable differentiator no counterfeit seller can copy. Confirm the actual supply chain before publishing it.

### 2.3 CASIO (کاسیو)

**Positioning.** Mass-market value and durability, not luxury. Timepieces are Casio's dominant segment at ¥184.966 billion, roughly 67% of consolidated revenue FY2026 (https://en.wikipedia.org/wiki/Casio). This is the volume and footfall brand: what gets a 20-year-old through the door, while Seiko and Citizen convert the older gift-buyer. Structure the homepage so Casio is the wide top of the funnel.

**Price band.** Casio Vintage/Collection roughly $20-60; EDIFICE averages ~$100 with an $86-400 range. **Casio's spread is enormous** - a $25 F-91W and a $5,000 MR-G share a logo. Never present "Casio" as one price story; always show the sub-brand, because that is what sets the expectation.

**Sub-brands to merchandise (four, with G-Shock separate).** EDIFICE, BABY-G, PRO TREK, Casio Vintage/Classic. Oceanus and Sheen are rarely stocked in Iran - skip unless the owner says otherwise.

**Search vocabulary.** F-91W, A168, and for Edifice the current halo line is **Sospensione**, built around the Honda Racing Corporation partnership since 2018 (https://usa.watchpro.com/casio-edifice-celebrates-its-long-term-partnership-with-honda-racing/). Writing "AlphaTauri" in 2026 copy dates the site instantly.

**Brand colour - the only hard hex recovered across the whole roster.** `#003296` deep blue, taken directly from the single `fill` declaration in https://upload.wikimedia.org/wikipedia/commons/4/4d/Casio_logo.svg. Safe as the Casio accent token. Do not guess equivalents for Seiko or Citizen.

**Logo asset.** Commons SVG, Public domain, `trademarked`.

**Iran market note.** Positron (پوزیترون) is repeatedly cited as Casio's Iranian representative, supplying a 12-month warranty that other Iranian retailers resell under. "Casio with Positron warranty" is the standard trust formula in this market. If Hooman's stock carries it, name the warranty provider on every Casio card - it is a recognized token, unlike a generic "guaranteed original" badge.

**Counterfeit evidence worth citing once.** In December 2024 China's High People's Court of Guangdong awarded Casio 3 million yuan against GA-110 imitators, the first relief granted under China's Anti-Unfair Competition Law for expired design rights (https://world.casio.com/news/2024/1212-ga110/), and in 2023 Casio secured a three-dimensional trademark on the G-Shock shape (https://world.casio.com/news/2023/0809-g-shock-trademark/). Hard proof that the authenticity message answers a real fear rather than manufacturing one.

### 2.4 G-SHOCK (جی‌شاک)

Merchandised as its own brand per the owner's decision. Correct call: it has a distinct buyer, a distinct price story, and the only genuinely ownable colour in the roster.

**The three-word product story, usable verbatim as the collection blurb.** Created 1983 by Kikuo Ibe on the "Triple 10" spec: 10-year battery, 10 bar water resistance, survives a 10-metre fall (https://en.wikipedia.org/wiki/G-Shock).

**Price band.** Entry ~$60-120 (DW-5600E, GA-2100), typical $100-300, premium MR-G/MT-G $2,500-6,000+.

**Line structure.** Master of G (Frogman, Mudman, Rangeman, Gulfmaster, Gravitymaster), MR-G, MT-G, G-STEEL, the 5600 squares, and the GA-2100 "CasiOak".

**Search vocabulary.** DW-5600 (the "square") and GA-2100 ("CasiOak") are the two highest-intent strings in the whole Casio range.

**Brand colour.** Black plus "caution yellow", which the brand explicitly attributes to taxis, pavement markings and tactile subway paving (https://gshock.casio.com/intl/contents/mag/caution-yellow/). This is the only brand on the roster with a colour it genuinely owns, and it reads as authentic to anyone who knows the brand.

**Logo asset - the awkward one.** G-SHOCK has **no** Wikimedia Commons SVG and is not in Simple Icons. Only unlicensed logo-scraper sites carry it. **Set the sub-brand name as styled type in a bold condensed sans.** Same for EDIFICE. This sidesteps the licensing question entirely and costs nothing.

**Buyer.** Skews young male, teens to 30s, daily/street/sport/student. The classic first "real" watch and gift-for-a-young-man purchase. Baby-G is the explicit women's counterpart, launched 1994.

### 2.5 TIMEX (تایمکس)

**Positioning.** 1941-founded American mass-market watchmaker (Waterbury Clock lineage), owned by Baupost Group since 2020. **This is the roster's widest legitimate ladder**: one brand that spans a cheap gift watch to a serious automatic.

**Price band, computed from Timex's own catalogue.** 250 men's products from https://www.timex.co.uk/collections/mens-watches/products.json?limit=250: minimum £45, median £210, maximum £1,450 (Giorgio Galli / Atelier). USD at retail: Easy Reader ~$42-52, Weekender from $99, Ironman $139, Waterbury from $199, Q Timex $219-249, Marlin $219-319, Expedition North ~$247-274. Iranian street: ۱۳٬۰۰۰٬۰۰۰ to ۵۷٬۰۰۰٬۰۰۰ توman, bulk at 14-22M (https://torob.com/).

**Collections to merchandise (six) - the only brand where a collection filter is genuinely real.** Counted across the official catalogue: Expedition 45, Waterbury 40, Marlin 40, Deepwater 26, Q Timex 25, Weekender 12. Use exactly these six as the Timex filter chips. Do not invent collection names for the fashion brands.

**Search vocabulary.** Weekender, Ironman and Marlin (Automatic) are the three names shoppers type; Q Timex is a close fourth and the strongest recent halo. These four deserve real URL slugs.

**Buyer - two distinct paths.** "Gift under X toman" (Weekender, Easy Reader) and "automatic / mechanical" (Marlin, Q). Different buyers who ask different questions on the phone.

**Imagery - the one easy brand.** Timex publishes 1000x1200 PNGs on a public Shopify CDN, filenames keyed to the exact reference (`TW2Y07300.png`, plus `_B`, `_C` angles), 5-9 images per model, bulk-retrievable via `products.json`. **These are still Timex's copyright.** The reusable part is the reference-keying convention, not free licence to hotlink. Press contact: `Timex@Civic-US.com` at https://press.timex.com - one email potentially unlocks both Timex and GUESS.

**Logo asset.** https://upload.wikimedia.org/wikipedia/commons/e/e3/Timex_logo_2017.svg - Public domain, `trademarked`. Palette is essentially black on white; Timex has no strong brand colour.

**Iran market note - the strongest defensible badge on the roster.** Timex has a named official Iranian representative, **Aria Zaman (آریازمان)**, and Iranian retailers sell Timex with a 2-year international warranty attributed to that agent (https://nikgallery.com/brand-1139/g-6/timex.html).

**Source note.** timex.com is Akamai-blocked to automation; source Timex data from timex.co.uk or timex.eu.

### 2.6 Q&Q (کیو اند کیو)

Persian name verified character by character: uses Persian keheh `ک U+06A9` and Persian yeh `ی U+06CC` throughout, no Arabic variants. Safe to use as-is in the index and page titles.

**Positioning.** Citizen's value sub-brand (زیر مجموعه برند سیتیزن). Japanese brand, assembled in China and Thailand - Iranian listings state this plainly rather than hiding it. Because Hooman is a certified Citizen reseller, the Citizen relationship **reinforces** the Q&Q page rather than competing with it. That is a real, honest trust link no competitor gets for free.

**Price band.** ۸۰۰٬۰۰۰ to ۳٬۰۰۰٬۰۰۰ توman.

**The single most important merchandising fact in this dossier.** Q&Q at ۸۰۰٬۰۰۰ against Seiko at ۱۰۷٬۰۰۰٬۰۰۰ is roughly a **30x spread within one shop**. Q&Q is the affordable door. A visitor who assumes a "certified Seiko dealer" is out of their price range never phones. The catalogue must visibly span the full range, and since the site publishes no per-model prices, that range has to be communicated deliberately through the brand price bands, the variety visible in the grid, and the copy.

**Collection name worth carrying.** Superior (لاین سوپریور). References seen in the wild: `Q&Q S21A-00`, `VQ66J001Y` - standard alphanumeric, keep in ASCII.

**Logo asset.** Not researched. Set as type until verified.

### 2.7 OBAKU (اوباکو)

**Positioning - the strongest story of the secondary brands.** Danish, founded 2007 by Johannes Arvin and Catherine Chan, designed in-house by AROS Design House. The name comes from the Ōbaku branch of Zen; the brand mantra page is titled "Just Be" (https://www.obaku.com/pages/obaku-story). **Every watch carries an International Limited 3-year warranty.**

**Lead the Scandinavian section with Obaku and put ۳ سال گارانتی بین‌المللی on every Obaku card.** That warranty line is the strongest single trust asset in the secondary tier.

**Price band.** $134-245 at D2C. Iranian retail sits at essentially the same level, unlike Esprit: Prima Iran lists ۱۳۲٬۰۰۰٬۰۰۰ to ۲۶۹٬۰۰۰٬۰۰۰ ريال (13.2M to 26.9M toman), roughly $120-245. **Obaku holds its price in Iran.** That makes it the "considered gift / affordable Danish" tier against Esprit's "accessible fashion gift".

**Merchandising buckets (six).** زنانه / مردانه / مش (mesh) / بند چرم (leather) / فوق‌نازک (ultra-slim) / الماس (diamond). Obaku does not merchandise by collection family - Tern, Diamond and Oktant are marketing pages, not a filterable taxonomy. **Strap type is the highest-signal filter for this brand** and is derivable from the reference code.

**Naming convention.** Reference-first with the Danish name second: `OBAKU V260GXVBSB - FALKE / INK`. Iranian retailers title Obaku products by reference alone (`ساعت زنانه اوباکو | مدل V209LXCIMC`), but the Danish nouns are a real brand asset Esprit lacks. V-prefix: `V###L...` ladies, `V###G...` gents.

**Critical build constraint.** obaku.com **blocks Iranian IPs at the HTML layer** with an "Access denied" page. Never link "Official site" for Obaku. Its Shopify CDN is currently reachable, but it is the same host that already blocks HTML, so hotlinking is a latent single point of failure for the entire catalogue. Self-host everything.

**Note.** `obaku.com` was recorded as NXDOMAIN in one first-hand check on 2026-08-24 while other lanes reached it. Treat brand-site reachability as unstable and irrelevant - the site must not depend on it either way.

**Logo asset.** No Commons SVG, not in Simple Icons. Only a 348x96 PNG on Obaku's CDN, pure `#000000` on transparent. **Trace to a single-colour inline SVG with `currentColor`**, or set as clean letterspaced type with "DENMARK" beneath. Do not ship the 348px PNG scaled up.

**Iran market note.** primairan.com (Prima Group Iran) is an Obaku-only Persian/English site that honours the 3-year warranty and runs a warranty/repairs page. Obaku is also on Digikala. Supply and after-sales exist locally, so a customer who calls can actually be served.

### 2.8 DANIEL KLEIN (دنیل کلین)

Confirmed as a real Iranian-market brand via Torob's own brand taxonomy. **No dedicated research lane covered it.** Treat as a research gap: Persian spelling is confirmed, everything else (price band, collections, logo asset, importer) needs one verification pass before catalogue copy is written. Allocate ~10 models per the CATALOGUE-SCALE plan.

### 2.9 CAT / CATERPILLAR (کاترپیلار)

Confirmed on the roster and visible on iransaatt.com's brand carousel. **No dedicated research lane covered it.** Same gap treatment as Daniel Klein. Persian spelling needs confirming (کاترپیلار vs کت). Allocate ~4 models.

### 2.10 GUESS (گس)

**Positioning.** Guess watches are not made by Guess. The licence has been run since 1984 by **Sequel AG, a division of Timex Group**, which handles production, distribution and global marketing of GUESS and Gc watches (https://www.businesswire.com/news/home/20250410851790/en/). Useful shop-floor talking point and a warranty-credibility angle. Do not put "made by Timex" on the site - accurate, but it undercuts the fashion premium the customer is paying for.

**Price band.** Realistic USD: entry $95-130, typical $175-250, top $300-350 for crystal-set and gold-tone multifunction. Iranian: ~۶٬۰۰۰٬۰۰۰ to ۴۰٬۰۰۰٬۰۰۰ توman with the dominant cluster at 24-33M.

**GUESS has NO stable collections.** Its catalogue is a rotating set of one-season model names (Badge, Campus, Dex, Elliot, Monte, Empire, Letterman, Marshall, Majestic, Reputation, Traction, Varsity G, Walker for men; Bonnie, Chime, Contessa, Glitz Plaque, Jelly, Mermaid, Mini Luna, Starstruck, Taylor for women). **Do not build a collections filter for Guess - it will be stale within a season.** Filter by gender + finish (gold-tone / steel / two-tone / black) + stone-set yes/no.

**This is the single biggest catalogue-schema decision in the whole dossier:** one taxonomy for the Japanese and Timex brands (collection-driven), a different one for the fashion brands (attribute-driven). The schema must support both without forcing empty collection facets.

**Search vocabulary.** Reference numbers only: `GW0xxxGx` men, `GW0xxxLx` women. Iranian aggregators list `W0426L1`, `GW0456G1`, `GW0893G3`, plus descriptive Persian phrases like "ساعت گس زنانه نگین دار طلایی". **Make the reference a first-class, visible, copyable, searchable field.** Iranian shoppers arrive from an aggregator holding a reference number; if the site cannot be searched by it, the call never happens.

**Logo asset.** https://upload.wikimedia.org/wikipedia/commons/8/89/Guess_logo.svg - Public domain, `trademarked`, flat black wordmark. The inverted-triangle-with-question-mark device is the brand's real mark, and its official red hex could not be verified because guess.com is unreachable from this environment. **Do not commit a Guess red to CSS without sampling a physical product or the distributor's assets.**

**Buyer.** Skews female, late teens to mid-30s, going-out and gift. Crystal-set, gold-tone and two-tone dominate. **This is the one brand section where styled on-wrist photography will out-convert white-background cut-outs.**

### 2.11 TOMMY HILFIGER (تامی هیلفیگر)

**Positioning.** Designed, manufactured and distributed by **Movado Group** under licence since 2001 (https://www.movadogroup.com/brands/tommy-hilfiger). Movado, not PVH, is the entity behind service, parts and warranty - and it also supplies Calvin Klein, Coach, Hugo Boss and Lacoste, so those four could be sourced as one cluster if the shop ever expands.

**Price band.** $134.95-$349 at US multi-brand retail; commonly cited $150-400 full line. Iranian: ~۲۶٬۰۰۰٬۰۰۰ to ۴۰٬۰۰۰٬۰۰۰ توman. **Availability is thin** - one large Iranian store lists 221 Tommy models with essentially all marked موجود نیست.

**Spec formula is uniform:** Japanese quartz, steel or plated case, mineral crystal, 3-5 ATM. There is no mechanical halo product to anchor on. **Sell occasion, not specification** - graduation, gift, first "real" watch. Do not put a spec table front and centre.

**Exactly one real named family: TH85** (with TH85 GMT and TH85 Crystals). 11 of 40 sampled products were TH85. Everything else is given names (Bruce, Cody, Henry, Lars, Morrison, Shane, Trent for men; Iris, Ivy, Lori, Piper, Sophia for women). TH85 is the only Tommy name worth a filter chip or hero slot; everything else merchandises by gender + strap + dial colour.

**Search vocabulary.** Reference numbers: `1791064`, `1782616`-style.

**Logo asset - the only brand with a usable colour pair.** https://upload.wikimedia.org/wikipedia/commons/9/9d/Tommy_Hilfiger_logo.svg - Public domain, `trademarked`. Verified hexes in the SVG: navy `#001c4b`, red `#d2002f`. A secondary reference gives `#02154e` / `#d61233`. Both are third-party reconstructions, not a published brand book. Use navy `#001c4b` as the section accent, red sparingly.

**Imagery.** newsroom.tommy.com is login-gated (ePressPack). PVH's media library returns 404. Movado has no public press path. **No self-serve imagery. Shoot in-store.**

### 2.12 ESPRIT (اسپریت)

**Positioning - handle with care.** esprit.com is **dead**, serving only a "STAY TUNED / Esprit will be back soon" holding page, verified from two independent network paths so this is global rather than an Iran geo-block. Esprit Holdings filed insolvency for seven European subsidiaries in May 2024, put two US subsidiaries into Chapter 7, and pivoted to pure brand licensing with revenue down 73% to HK$1.59bn (https://www.euronews.com/business/2024/05/17/hundreds-of-jobs-at-risk-as-fashion-brand-esprit-files-for-bankruptcy-in-europe).

**Do not link "Official site" for Esprit anywhere.** Do not build a brand-story page that depends on Esprit's corporate health. Merchandise it as a value/gift line, positioned below Obaku in the grid.

**Current licensee.** TMS Group (Swiss/Italian, offices including Dubai/MENA). One Iranian retailer instead attributes Esprit watches to Morellato Group - likely stale. Do not print any "made by / under licence from" claim without confirming with the actual importer.

**Price band - and a trap.** Gulf e-tail USD $99-209 (median $159); European RRP EUR 99-179 but actual street price EUR 43-95, a 55-60% haircut off list; Iranian gray/discount listings around ۳٬۵۰۰٬۰۰۰-۴٬۶۰۰٬۰۰۰ توman which the retailer itself annotates as roughly $25-33. **Never anchor an Esprit card on RRP.** An Iranian shopper can find EUR 43 in one search and will read the RRP as a markup. Show one price, the shop's, and put the persuasion into warranty and in-person service.

**No persistent collections.** Reference scheme is `ES1G...` gents, `ES1L...` ladies. Recurring model names: Classic, Field, Strike, Maple, Menlo, Valentina, Layer, Flute, Cameo, Betty, Lorella, Anderson, Jordan. Filter by gender x case size x strap x dial colour. If merchandising buckets are needed, the honest four are Classic (dress), Field (larger men's), Strike (chrono-look men's), and the ladies bracelet/Valentina pieces.

**Naming convention - highest-leverage SEO decision for this brand.** Iranian retailers title Esprit products literally as "ساعت زنانه اسپریت مدل ES1L173M0095". Lead the card title with the reference: `ESPRIT ES1G159L0025 - Field - ۴۵ میلی‌متر`. Reference in the H1, the `<title>`, the alt text, and as the client-side search key.

**Logo asset - the cleanest source in the roster.** TMS Group publishes the current Esprit watch lockup as free, directly downloadable SVGs with no login: https://www.group-tms.com/wp-content/uploads/2025/09/ESPRIT-logo-bk.svg (black) and `ESPRIT-logo-wt.svg` (white), each 2,089 bytes, `viewBox 0 0 116 64`. Ships in both polarities. Use for nominative brand identification only.

**Brand colour: none.** Current mark is near-black `#191b1c` on white, sampled from the live holding-page logo (137,165 opaque pixels, single colour). The Wikimedia Commons alternative is filled `#ba0c2f` crimson, which does **not** match the current mark - shipping it red will read as 1990s Esprit and look wrong next to the other brand marks.

### 2.13 EXTRI (اکستری)

**Origin - a factual risk to manage.** HKTDC's supplier registry lists **Foshan Huide (Devar's) Watch Co., Ltd** (est. 2002, Nanhai District, Foshan, Guangdong) with "Own Brands: EXTRI and T5" (https://sourcing.hktdc.com/en/Supplier-Store/Profile/Foshan-Huide-Devar%60s-Watch-Co-Ltd/1S00OFIF9). Iranian retailers meanwhile call it "یکی از معروف‌ترین برندهای انگلیسی" (one of the most famous British brands).

**Decision: print no origin claim at all.** Repeating the British framing is a factual risk on a trust-driven site; omitting origin costs nothing, because nobody buys EXTRI for heritage. Lead instead on the specs everyone repeats and that are verifiable: Miyota quartz, 316 steel case, mineral glass, 2-year warranty.

**Price band.** ~۶٬۰۰۰٬۰۰۰ to ۱۱٬۵۰۰٬۰۰۰ توman. No credible USD band exists - every direct price fetch was blocked. Do not quote a USD figure for EXTRI.

**Facets, not collections.** `X6xxx` men's sport/chronograph, `X3xxx` "Extreme", `E1xxx` women's dress/crystal. The trailing letter (`-A`, `-D`, `-F`) is a colourway, so the data model needs model plus variant letter.

**Search vocabulary.** Model codes ARE the search vocabulary: X6058 (international flagship), X3011, X6035, then X6056 and X6108.

**Logo - free palette, no asset needed.** Heavy squared techno sans wordmark, EXTRI in black uppercase with the X as a sharp angular red slab (~`#E8322E`), over "WATCHES" in wide-tracked light grey. On the dial itself the branding is lowercase "extri" in a thin sans. **Set as type with a red-coloured X glyph.** No file, no trademark-asset question.

**Buyer.** Skews male; Iranian EXTRI listings are dominated by men's X6xxx chronographs with a thin women's tail. Pairs with Julius as complementary halves of the audience.

### 2.14 JULIUS (جولیوس)

**Positioning.** Seoul-founded 2001 Korean fashion-watch brand: Korean design, Japanese Miyota/Citizen quartz, assembly in China, 1,000+ models, Madrid-System trademark registration in 30+ countries explicitly including Iran, Best Design Award 2012 at the Hong Kong Watch Fair (https://juliusus.com/introduction-about-julius-watches-us/). "Korean design, Japanese movement" is the line every Iranian competitor already tells and is safe to use.

**Founding-year warning.** One Iranian retailer (vesta.watch) dates Julius to 1988, contradicting every other source including other Iranian shops. Write ۲۰۰۱، سئول or drop the year. Do not copy a competitor's number.

**Price band.** ~۴٬۶۰۰٬۰۰۰ to ۱۰٬۹۰۰٬۰۰۰ توman. International USD $25-50 entry, $50-100 typical, $100-150 top.

**Five clean buckets.** زنانه (`JA-`), مردانه/Homme (`JAH-`), Julius Star (women's premium/stone-set), **ست زوج (couple)**, and **ست هدیه (gift set)**. The last two are purchase occasions, not just categories, and deserve their own landing sections - they drive gift-season phone calls. This aligns directly with the owner's confirmation that the shop stocks couple sets.

**Search vocabulary.** JA-1418 (exists in both men's and women's variants, so **gender must be a field on the variant, not derived from the model number**), JAH-098D, JA-1538C.

**Logo.** Dial lockup is "JULIUS" in wide-tracked serif capitals with a small line of Hangul beneath. Dress-watch register, not sport. **No Commons SVG, not in Simple Icons.** Seeklogo's "Julius" vector is a graphic novel, not the watch brand. Set as type.

**Design consequence.** Julius and EXTRI need visually opposite treatments inside one shared layout: Julius as serif caps, generous letter-spacing, light ground, small cases; EXTRI as squared sans, black and red, dark ground, big chronographs. Julius is the women's/gift/couple door, EXTRI the men's sport door.

**No official site exists for either.** `extri-watches.com` and `extriwatch.com` fail DNS; `julius.co.kr`, `julius.kr` and `juliuswatch.com` are parked or redirect to a domain-sale listing. Omit "official site" links - a dead link on a trust page is worse than none.

---

## 3. Competitive landscape

Thirteen Iranian watch retailers were torn down first-hand on 2026-08-24 (iransaatt.com, irantimer.com, dorrinwatch.com, javaherian-gallery.com, vesta.watch, kanzwatch.com, mraghrabeh.com, minutewatchgallery.com, watchonline.shop, ashraafi.com, ehsanwatch.com, biwatch.ir, khanesaat.com), plus the three platforms that actually own demand: Digikala, Torob and Basalam.

### 3.1 Where the demand actually is

**Instagram is the top of the funnel, by an order of magnitude.** Named watch-selling pages and follower counts: @brand.galery2 450K, @gallery_soroush 274K, @smp_watch 164K, @arshiawatchgallery 159K, @hamidgallery 151K, @alizadewatchgallery 148K, @iransaatt 139K, @amatist.watch.gallery 139K. Ordering happens by دایرکت or تماس. Hooman sits at 1,365 followers against 1,277 posts - years of work, almost no reach. **The website's job is to be the high-trust landing page an Instagram bio link opens.**

**Torob owns comparison intent and cannot be beaten there.** Cards show "از ۳۰۰٫۰۰۰ تومان" and "در ۶۹ فروشگاه"; one Casio women's model is listed "در ۹۵ فروشگاه". For any watch stocked by 40-95 other shops, price is the only variable and Hooman loses. **Do not build the site around price-competitive SKUs, and do not list on Torob** - it enters a pure price race and drives price-shoppers rather than phone calls.

**Digikala is a pure marketplace for watches.** The sellers are small shops (رویال واچ سنتر, دومینو واچ, زمانه, آونگ نقره‌ای), not Digikala. Every listing carries one of exactly two warranty labels: «گارانتی اصالت و سلامت فیزیکی کالا» or «سرویس ویژه دیجی‌کالا: ۷ روز تضمین بازگشت کالا». **The first phrase is the trust language Iranian buyers have been trained on.** Echoing it honestly as a shop guarantee is cheaper than inventing new wording.

### 3.2 What they all do badly - eight unoccupied gaps

**1. Every first screen sells someone else's brand.** iransaatt opens on Tissot/Maserati/Citizen, irantimer on Daniel Gorman/Cat/US Polo, dorrin on Orient/Seiko/Citizen, vesta on rotating brand banners. Not one leads with its own name, shop, people, or a reason to trust it. The category has abdicated its own brand.

**2. They cosplay as Amazon while the money moves by phone and DM.** All 13 ship a cart. On product pages, "add-to-cart" appears 2-17 times against 1-5 `tel:` references (mraghrabeh PDP: 3 vs 1; iransaatt PDP: 17 vs 5). Meanwhile the Instagram pages they run have 130K-450K followers ordering by direct message.

**3. Catastrophic page weight.** Uncompressed homepage HTML alone, before any image, font or CSS: minutewatchgallery 1.21 MB, ehsanwatch 828 KB, javaherian 793 KB, vesta 635 KB, iransaatt 603 KB, biwatch 495 KB, dorrin 430 KB. Script tags: dorrin 98, minutewatch 87, javaherian 69. biwatch.ir references 248 font files.

**4. Trust claims are wallpaper, not evidence.** vesta.watch's homepage HTML contains اصالت 465 times and گارانتی 295 times. Not one of the 13 shows a photograph of the physical shop, a scan of a warranty card, a serial number, a named human being, or a dated testimonial.

**5. The photography is identical everywhere** because it is all supplier press imagery, catalogue PNGs on white. Torob makes the consequence explicit: the same model, same photo, same copy, in 95 shops. No wrist shot, no scale reference, no dial macro, no lume, no shot of the watch in the actual shop.

**6. Product cards are spec dumps, not desire.** dorrinwatch's cards list nationality, movement type, water resistance and warranty as bullets under a small thumbnail. watchonline.shop offers navigation by "digital / automatic / quartz / solar / chronograph / leather / steel" before showing a single image.

**7. Nobody has a mobile call affordance.** Across 13 homepages, zero dedicated sticky or floating click-to-call buttons. Six of 13 ship a chat bubble instead (Goftino or Crisp), a channel that goes unanswered outside shop hours. dorrinwatch.com does not even wrap its number in a `tel:` link.

**8. The catalogues lie about stock.** Prices shown next to «ناموجود» (ehsanwatch 4x, vesta 6x, mraghrabeh PDP 5x), and minutewatchgallery degrades 21 homepage items to «استعلام بگیرید». A physical shop running a live-inventory pretence guarantees the worst possible call: a customer asking for a watch that sold months ago.

**Two of the best-known competitor domains have broken TLS.** `watchstore.ir` presents a self-signed cert with `CN=localhost`; `iwatch.ir` presents `CN=moeini`. Both produce Chrome's full-page red "Your connection is not private" interstitial, verified twice. In a market whose central anxiety is being cheated, that is the worst possible first impression. Hooman beats them on trust for zero ongoing cost with an auto-renewing Let's Encrypt certificate.

### 3.3 What they get right - do not drop these

- **Price is always visible** on functioning shop sites. This is the one convention Hooman is deliberately breaking. Section 6 covers the compensation.
- **The اینماد badge plus ساماندهی appears on 12 of 13.** Its absence reads as fraud to some Iranian shoppers. Not legally required here (no transactions), but note the perception cost.
- **Authenticity and warranty are stated as a TWO-LAYER promise with a number attached**, never as vague "genuine". Layer 1: ضمانت اصالت کالا. Layer 2: a service warranty with an explicit month count («۲۴ ماهه وستا سرویس», «۶۰ ماه گارانتی», «۵ سال گارانتی موتور» + «۱۰ سال گارانتی باتری»). **Write the guarantee the same way and never merge the two into one fuzzy "اصل و گارانتی‌دار".**
- **Physical proof objects are named explicitly:** کارت گارانتی, جعبه اورجینال, فاکتور رسمی.
- **A stated return window is universal and always numeric:** ۷ روز or ۳۰ روز.
- **Landline plus WhatsApp is the standard pair, and a landline specifically signals "real shop".** The two mobile-only sites scanned (ehsanwatch, biwatch) read a visible tier lower.
- **Brand-first navigation with model codes as selectable text.** kanzwatch prints the product code on every card. Iranian shoppers arrive from Torob holding a code.
- **«خرید حضوری» is already sold as a positive feature**, not a fallback. iransaatt lists «امکان خرید حضوری» and «مشاوره تلفنی» among its service badges; mraghrabeh pushes «تماس با مشاورین» over checkout.

### 3.4 The wedge, stated in one paragraph

Every competitor is a worse Digikala. Hooman should be a better shop. The site leads with the gallery itself - a real photograph of the counter, the name, sixteen years, the address, the hours, the phone number - with the watches second. It publishes original photography of stock that is physically present, which no competitor can copy from a supplier CD. It ships at under 150KB against their 400KB-1.2MB, which is the cheapest luxury signal available. It puts a sticky call button in the thumb zone that no competitor has. And it frames the catalogue honestly as a selection from 1,000+ models in the shop, which removes all stock-sync maintenance and converts ambiguity into the reason to phone.

---

## 4. Persian / RTL engineering rules - the non-negotiables

### 4.1 The foundation

```html
<html lang="fa-IR" dir="rtl">
```

One line, on the root element. Every Iranian commerce site checked declares direction on `<html>`: khanesaat.com and vesta.watch use `dir="rtl" lang="fa-IR"`; zarinpal, divar, digikala, virgool, jabama, banimode, digistyle use `lang="fa" dir="rtl"`. **Counter-example to avoid: taaghche.com ships `lang="fa"` with no `dir` and sets direction only in CSS**, which breaks form controls, scrollbar placement and the browser's own bidi resolution for injected text.

**Persian-only. No `/en` route, no language switcher, no i18n library.** khanesaat.com/en returns 404. That is the market norm and the correct scope.

Note: Google does not use the `lang` attribute to determine page language (https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites). `lang`/`dir` are for screen readers, rendering, and bidi resolution, not SEO. The `.ir` ccTLD is the geotargeting lever.

### 4.2 Logical properties, and the v4 utilities that are already correct

Write `ps-*` / `pe-*` / `ms-*` / `me-*`. Never `pl-` / `pr-` / `ml-` / `mr-`. Tailwind v4 ships these natively; `tailwindcss-logical` is obsolete (https://tailwindcss.com/docs/padding).

Already logical in v4, no patching needed: `space-x-*` (generates `margin-inline-start/end`), `border-s-*` / `border-e-*`, `rounded-s-*` / `rounded-ss-*`, `text-start` / `text-end`, and all flex/grid axis utilities (`flex-row`, `justify-start/end`, `gap-*`).

For absolutely-positioned badges use `inset-s-*` / `inset-e-*` (v4.2+). **`start-*` / `end-*` are deprecated and will be removed** (https://tailwindcss.com/blog/tailwindcss-v4-3). Most LLM-generated Tailwind still emits them - grep for it.

**Ban `rtl:` prefixes in review.** Tailwind's own docs say the variants are only useful for sites supporting both directions. This site is Persian-only. Scattered `rtl:` overrides are the signature of an RTL codebase built by someone guessing.

Short audit list of what actually needs manual attention: `translate-x-*`, box-shadow x-offsets, `background-position`, and any inline SVG chevron or arrow.

### 4.3 Bidi isolation - the highest-frequency defect on a watch catalogue

Every Latin token inside Persian prose must be wrapped:

```html
ساعت <bdi>Seiko Presage SRPB41J1</bdi> اصل
```

`<bdi>` applies `unicode-bidi: isolate` with an implicit `dir="auto"`, so the embedded run neither influences nor is influenced by surrounding directionality (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdi). Without it, neutral characters (punctuation, parentheses, hyphens, digits, `+`) adjacent to the Latin run jump to the wrong side.

**Live competitor failure to beat:** khanesaat.com renders prices as `تومان2,810,000` - the currency word on the wrong side of the number, because the number is a neutral-adjacent run with no isolation.

Apply `<bdi>` to: every product title, every reference number, every spec row, every case size, every phone number.

### 4.4 Phone numbers - two rules, both mandatory

**Rule 1: the `href` must be ASCII.** RFC 3966 requires ASCII decimal digits only in a `tel:` URI (https://www.rfc-editor.org/rfc/rfc3966.txt). Persian-Indic digits inside an `href` will not dial. This is the number-one Iranian-specific `tel:` bug.

**Rule 2: wrap the visible number in `<bdi dir="ltr">`.** A Latin-digit phone number inside Persian RTL text is visually reordered by the bidi algorithm: `021 4390 0000` renders as `0000 4390 021`.

The shop's three numbers, as they must appear in markup:

```html
<a href="tel:+982144697309"><bdi dir="ltr">۰۲۱-۴۴۶۹۷۳۰۹</bdi></a>   <!-- primary -->
<a href="tel:+989123470889"><bdi dir="ltr">۰۹۱۲-۳۴۷-۰۸۸۹</bdi></a>  <!-- WhatsApp -->
<a href="tel:+989399141497"><bdi dir="ltr">۰۹۳۹-۹۱۴-۱۴۹۷</bdi></a>
```

**Messenger link formats differ from each other and from `tel:`. All three are traps:**

| Channel | Correct format | The silent failure |
|---|---|---|
| WhatsApp | `https://wa.me/989123470889?text=...` | `wa.me/09123470889` does **not** error. It renders "Chat on WhatsApp with 09123470889" - an unresolvable number. Verified live. Add a build-time assert: every `wa.me` href must match `/^https:\/\/wa\.me\/98\d{9}/`. |
| Bale | `https://ble.ir/09123470889` | Leading zero, **no** `+98`. `ble.ir/+98...` returns 404. |
| Telegram | `https://t.me/+989123470889` | International form, no leading zero. Works without a username. |

**Data model consequence:** `phone`, `whatsapp`, `bale` and `telegram` are separate fields. 37% of sampled Iranian shops publish a WhatsApp number that differs from the main phone, and 5 of 30 publish a landline as the main number. **Never derive the WhatsApp link from the landline** - a landline cannot have WhatsApp, and that is the second most likely bug after the missing country code.

### 4.5 Typography rules for Persian

**Line height.** Material Design classifies Arabic-script as a "Tall" script needing extra line height, and W3C alreq notes Arabic ascenders and descenders extend much further than Latin (https://w3c.github.io/alreq/). Set body to `line-height: 1.8` and headings to `1.35`, against Tailwind's defaults of 1.5 and ~1.1. Bump base font size roughly 1px over the Latin equivalent. **Tailwind's default `leading-tight` / `leading-none` on headings will clip Persian descenders.**

**Letter-spacing must be `normal`. This is a hard ban.** CSS Text 3 §7.2.1 states letter-spacing must not be applied in a manner that breaks the shaping and joining behaviour of cursive scripts (https://www.w3.org/TR/css-text-3/#letter-spacing-property). Browsers also disagree on which side the space lands: Chrome and Safari add it on the right, Firefox on the reading end. **Ban `tracking-tight`, `tracking-wide` and `tracking-widest` on any Persian element.** The premium-editorial reflex of tight tracking on headings and wide tracking on all-caps eyebrows actively degrades Persian. Apply tracking only to Latin-only runs: brand wordmarks, "SEIKO", "SINCE 2010".

**Weight.** Do not blindly avoid bold (that Material guidance was Noto-specific and dated), but reach for 500/600 where a Latin design would use 700. Persian at 700 in a UI font reads noticeably heavier than the Latin equivalent.

**ZWNJ (U+200C, نیم‌فاصله) must be literal characters in the copy.** It appears in almost every Persian sentence, separating prefixes, suffixes and compounds (می‌شود، کتاب‌ها، نیم‌فاصله) without letting the letters join, and has a dedicated key on the Persian keyboard. A plain space instead ("می شود") breaks the word; omitting it ("میشود") reads as illiterate to Iranians and costs trust on a premium shop. **Verify the JSON pipeline does not strip or normalize U+200C, and that it survives minification.**

### 4.6 Search normalization - a ~10-line function that is the whole fix

Persian users type interchangeably across three axes that are distinct codepoints:

| Axis | Variants | Normalize to |
|---|---|---|
| Yeh | Arabic ي `U+064A` / Persian ی `U+06CC` | `U+06CC` |
| Kaf | Arabic ك `U+0643` / Persian ک `U+06A9` | `U+06A9` |
| Digits | Arabic-Indic `٠-٩` / Persian `۰-۹` / ASCII `0-9` | ASCII for matching |
| ZWNJ | present / absent | strip for matching |

Apply the same `normalize()` to **both** the build-time index and the runtime query. Without it, searching `کاسیو` misses `كاسيو`-typed data, and the failure looks random. Even Digikala's own meta description mixes Arabic yeh (`رايگان`) with Persian yeh elsewhere, so this is not a hypothetical.

**Keep model references in ASCII** (SNK809, GA-2100, ES1L173M0095). That is how they are printed and typed.

### 4.7 Numbers, prices and dates

**Digits.** Two valid techniques exist in the wild: convert characters in the data (Torob) or use a Persian-numeral font feature (Zarinpal ships a dedicated `IRANYekanXVFaNumVF.woff`). **Prefer the OpenType feature** because it keeps the machine-readable text ASCII, so copy-paste, `tel:` hrefs and JSON-LD all stay valid.

Vazirmatn's `ss01` is literally named "Farsi Digits" and substitutes both ASCII `0-9` and Arabic-Indic `U+0660-0669` with Persian `U+06F0-06F9`. **Vazirmatn has no `ss02`** - its only features beyond defaults are `ss01`, `tnum` and `pnum`.

**Scope `ss01` to price and prose elements only, never body-wide**, or watch references like "SNK809" and "42mm" render with Persian numerals.

**Build trap that fails silently:** `pyftsubset` **drops `ss01` and `tnum` by default**. With no `--layout-features` flag the output keeps only `calt ccmp dnom fina frac init liga locl medi numr rlig`. `font-feature-settings: 'ss01'` will then do nothing, with no error anywhere. **Always pass `--layout-features='+ss01,+tnum'` (or `'*'`) and add a one-line visual check to the build.**

**Currency: تومان, never ریال.** A Torob watch-search page contained 474 literal Persian digit characters, 54 occurrences of "toman", and zero occurrences of "rial". A rial figure reads as 10x wrong. Note the ambiguity for structured data: ISO 4217 only defines IRR, and one toman equals 10 or 10,000 rials depending on the convention. If a price ever enters JSON-LD, store toman in the source and multiply into IRR at build time with one documented constant, unit-tested. This is an independent argument for the no-price decision.

**Do not use `Intl.NumberFormat` with `style:'currency', currency:'IRR'`.** It produces `‎ریال ۱۲٬۵۰۰٬۰۰۰` with a stray U+200E LRM and the wrong unit. Format the bare number and append تومان yourself. Wrap the pair: `<bdi>۴۲٬۵۰۰٬۰۰۰ تومان</bdi>`.

**Dates need no dependency.** `Intl.DateTimeFormat('fa-IR')` resolves `calendar: 'persian'`, `numberingSystem: 'arabext'`, `timeZone: 'Asia/Tehran'` by default. Drop `moment-jalaali`, `dayjs-jalali` and `date-fns-jalali`. On this site the only date candidates are the catalogue-updated stamp and the price-band stamp.

### 4.8 Carousels and icon mirroring

**Carousels: use native CSS scroll-snap, no library.** `overflow-x-auto` + `snap-x` + `snap-start` inside `dir="rtl"` reverses automatically. If prev/next buttons are needed, drive them with `card.scrollIntoView({inline:'start', behavior:'smooth'})`, which is direction-agnostic. **Never touch `scrollLeft`:** in RTL, Firefox and Safari report it as 0 at the start and increasingly negative toward the end, while Chrome reports a positive distance from the left, and Safari overshoots during rubber-band.

**Icon mirroring - load-bearing twice on a watch site.** Mirror icons whose meaning is tied to reading direction: back/forward arrows, breadcrumb chevrons, carousel prev/next, reply, share. **Do not mirror clocks** ("clocks still turn clockwise for RTL languages"), circular refresh, the magnifying glass, checkmarks, or logos (https://m1.material.io/usability/bidirectionality.html).

**Never CSS-flip a watch-face illustration or a product photograph.** The crown sits at 3 o'clock; mirroring puts it at 9 and reads as a fake. On a site whose entire pitch is authenticity, that single mistake is fatal.

---

## 5. Design language

### 5.1 What credible watch retail actually looks like, measured

Mined from production stylesheets and live computed styles on seikowatches.com, casio.com/us/watches/gshock, goldsmiths.co.uk (a Rolex-authorised dealer) and chrono24.com.

**Zero chrome on product cards.** Seiko's production stylesheet sets `border-radius: 0` as its dominant value (24 declarations) and contains almost no shadows (3 `box-shadow: none` against 2 real shadows in a 417KB file). G-Shock and Goldsmiths cards compute to borderless, `border-radius: 0px`, `box-shadow: none`, `background: rgba(0,0,0,0)`. **Let the grid gap be the only separator. Rounded plus shadowed cards are the single loudest dropshipper tell.**

**The card is at most three lines: BRAND / MODEL + REFERENCE / PRICE.** Verified strings: G-Shock renders `G-SHOCK` / `GA2100-1A1` / `$110.00`; Goldsmiths `ORIS` / `Big Crown Pointer Date 40mm Mens Watch Purple` / `£1,400.00`; Seiko `King Seiko` / `SLA083`. No marketing adjectives. "Luxury Elegant Fashion Quartz" on a card is counterfeit-listing copy.

**Printing the exact manufacturer reference is the highest-density authenticity signal and is universal in real retail.** SLA083, SPB381J1, GA2100-1A1, DW5600UBB-1, TW2Y64000. Chrono24 exposes "Reference Number" as a first-class filter facet. Counterfeit and dropship listings never carry references because they scrape marketing names, not the physical caseback. One JSON field.

**Wide letter-spacing on small uppercase labels is the shared "expensive" signature.** Seiko's stylesheet uses `letter-spacing: .1em` 46 times, its dominant value. Goldsmiths' H1 "WATCHES" computes to 32px Baskerville uppercase with 6px tracking (~0.19em); its section H3s are 17px weight 500 uppercase at 0.5px. **This is doing most of the perceived-luxury work and it is free. It is also banned on Persian - see 4.5. Apply it only to Latin runs.**

**Uppercase is surgical, not global.** Seiko's stylesheet is `text-transform: none` 83 times against `uppercase` 7 times. Uppercase the brand line, section eyebrows and buttons. Leave model names and body copy in sentence case.

**Motion is uniform and short.** Seiko uses `transition: .2s ease` **112 times** - one duration for essentially every interaction - and reserves `transition: 3s ease` (14 uses) exclusively for slow hero crossfades. No parallax, no scroll-jacking.

**No urgency devices anywhere.** Neither Seiko nor Goldsmiths nor G-Shock ships discount starbursts, countdown timers or "3 left!" badges. Goldsmiths' only price treatment is a plain struck-through was-price. Every urgency device is coded as low-trust in this category and actively undercuts the gallery framing.

**Photography is a locked formula, not a library.** G-Shock serves transparent PNGs sitting directly on the page background. Goldsmiths serves a strict 1:1 square (302x302 rendered) from a single asset pipeline. Seiko uses 360x360 product thumbs. **One ratio, enforced with `aspect-ratio` + `object-fit: cover`. Ragged card heights are an instant credibility loss.**

**The closest structural match to this project is Goldsmiths, and it is copyable verbatim.** A Rolex-authorised dealer makes physical-store contact its primary CTA architecture: "Rolex Official Retailer", "Showrooms", "Request An Appointment", "VISIT A SHOWROOM / BOOK AN IN-STORE APPOINTMENT". Rolex itself sells nothing online - the terminal action on rolex.com is a store locator (https://www.rolex.com/store-locator). **Replacing "Add to cart" with "Call the gallery" is not a downgrade from e-commerce. It is the category-defining pattern at the top of the market.**

**Trust copy names a mechanism and an actor, never an adjective.** Chrono24's vocabulary is process-based: "Certified Seal: Authenticity certified by watchmakers", "Watch with original box and original papers". Unbacked superlatives are what counterfeit sellers write, so they now signal the opposite.

**Headlines are statistics, not slogans.** Chrono24's H2/H3 elements read "4.7 out of 5 stars", "9 Million", "Over 340,000". **Lead with countable facts the shop can prove: sixteen years, fourteen brands, 1,000+ models in the case, one street address.** Numbers are checkable; adjectives are not, which is exactly why they read as authentic.

### 5.2 Named typefaces

**Verified Persian coverage.** Arabic-subset support is NOT Persian support. Direct cmap audits of the shipped TTFs found **Readex Pro missing all six Persian-specific letters** (پ چ ژ ک گ ی) and all Persian digits, **Tajawal missing five of six** plus all Persian digits, and **Ruwudu missing all ten Persian digits**. Cairo, Almarai, IBM Plex Sans Arabic, Markazi Text and Lalezar have the Persian letters but no ZWNJ in the Arabic slice.

**Confirmed full coverage** (all six Persian letters + all ten Persian digits + ZWNJ): **Vazirmatn, Estedad, Gulzar, Noto Naskh Arabic, Noto Sans Arabic, Parastoo, IBM Plex Sans Arabic, Markazi Text, Lalezar, Amiri.**

**Decision: Estedad as the primary family.**

| | Estedad | Vazirmatn |
|---|---|---|
| Licence | SIL OFL 1.1 | SIL OFL 1.1 |
| Variable axis | `wght` 100-900 | `wght` 100-900 |
| Latin glyphs | **purpose-drawn to match the Arabic** | **borrowed from Roboto** |
| Google Fonts | yes (v3) | yes (v16) |
| Designer | Amin Abedi | Saber Rastikerdar |

Estedad wins on the one criterion that matters for this project: its Latin is drawn to match its Arabic, so "SEIKO" and "GA-2100" sit correctly next to Persian copy without a second font file. Vazirmatn's Latin is Roboto, which reads as Android system UI, not premium watch boutique. Fine for body text, wrong for a catalogue where a Latin brand name appears on literally every card.

**Rejected: IRANSans, IRANYekan, Dana, Peyda, Yekan Bakh.** All commercial, sold by fontiran.com under tiered licences. Every "free IRANSans" GitHub repo is unauthorised redistribution, and shipping one puts an infringing font on a commercial retail site. Digikala's own `font-family: IRANYekan` is the de-facto convention, but the shop must buy a licence to copy it.

**Rejected: Shabnam, Samim, Sahel, Vazir.** All discontinued. Shabnam's README states development is stopped; last pushes 2021. Legally safe, technically frozen, no variable font, no new glyph coverage.

**Rejected: Morabba.** No verifiable licence. No official GitHub repository, not in the fontiran catalogue, not in the font-store OFL collection. Cannot prove permission to use it.

**Optional Latin display face for the wordmark and Latin brand names only.** The mechanism is a second `@font-face` with `unicode-range: U+0000-00FF` listed **first** in the stack, so the browser picks the Latin face per-character with no markup. Candidates, all self-hostable and licence-clear: **Jost** (Google Fonts, and literally Seiko's own typeface, a direct free Futura/DIN stand-in), **Manrope**, **Archivo**, or **Switzer**/**Cabinet Grotesk** (Fontshare, free commercial).

**Do not try to mirror a serif/sans pairing across both scripts.** Persian has no serif-vs-sans axis; its real contrast axes are calligraphic style and weight. Build the Persian side as one family at two weights (Estedad 800 display, Estedad 400 body) and let the Latin side carry any typographic dichotomy. Attempting to mirror the pairing is the most common way bilingual Persian sites look wrong.

**Budget.** A Persian + Latin subset of a variable font covering weights 100-900 with all OpenType features measures **57.0 KB woff2** (measured on Vazirmatn; Estedad's Arabic slice is larger at 55.7 KB, so budget ~70-80 KB). Instanced to one weight it drops to 23.4 KB. **Ship the variable subset, one file.** Reference point: Divar's IRANSansWeb Regular is 31.6 KB per weight.

**Do not split Persian and Latin by `unicode-range` for size.** Measured: Persian-only 28.1 KB, Latin-basic-only 31.0 KB, combined 57.0 KB. The Latin half is bigger than the Persian half, and a watch catalogue renders Latin brand names on every card, so both slices load on every page anyway. Splitting just adds a second render-blocking request.

**Preload:** `<link rel="preload" as="font" type="font/woff2" crossorigin>` on the one file, plus `font-display: swap`.

### 5.3 Palettes with hex

Five palettes were built and contrast-tested against the WCAG relative-luminance formula. All hold AAA for body ink and at least AA for muted secondary text.

**RECOMMENDED - "Paper & Graphite", for a fourteen-brand reseller:**

| Token | Hex | Contrast |
|---|---|---|
| `--bg` | `#FBFAF8` | - |
| `--ink` | `#23252A` | 14.70:1 AAA |
| `--muted` | `#5F646B` | 5.72:1 AA |
| `--hairline` | `#E3E1DC` | decorative only |
| `--accent` (call CTA only) | `#9E2B20` | 7.14:1 as text, 7.45:1 white-on-accent AAA |

The reasoning is strategic, not aesthetic. Fourteen brands arrive with fourteen incompatible visual identities. **The palette's job is to not fight them.** Reserving the single saturated colour exclusively for the phone CTA means the only coloured thing on any page is the action the whole site exists for.

**Alternative - "Cold Movement", if a cooler instrument register is wanted:**
`--bg #F4F5F7`, `--ink #12161C` (16.63:1), `--muted #5C636D` (5.56:1), `--hairline #D8DBE0`, `--accent #2E4E86` thermally-blued steel (7.55:1 as text, 8.23:1 CTA). Reads as tooling rather than jewellery, and heat-blued screws are the one luxury cue that is cold rather than gold, so it escapes the beige-and-brass trap by construction. A cool grey shell also does not fight warm-toned product photography.

**Alternative - "Salon", the boutique-interior reference:**
`--bg #F1EDE4`, `--ink #1B2620` (13.37:1), `--muted #5A6560` (5.19:1), `--hairline #DCD6C9`, `--accent #23342C` deep fir (11.24:1). Reads as vitrine felt. The desaturated fir deliberately avoids the Rolex-green appropriation problem a `#006039` would create for an unaffiliated reseller.

**Dark options exist but carry a photography cost.** "Tropical Dial" (`--bg #17120F`, `--ink #EDE7DE`, `--accent #C7663A` oxidised, 4.77:1 - use `#C7663A`, **not** the richer `#B4562C` which tests at 3.81:1 and fails AA) and "Lume" (`--bg #0B0C0D`, `--ink #E9EAEC`, `--accent #A8D94A` luminous compound, 11.83:1) both score well. Dark also has Iranian precedent: Torob's own product pages render on `rgb(21, 32, 43)`, so a dark interface is not alien to this audience.

**But dark loses on the binding constraint.** NN/g requires background, orientation, lighting and scale to match across all products on a listing page. A shop photographing fourteen brands in a working room cannot hold consistent specular highlights and matched shadow direction on a dark ground across 175 SKUs, but can trivially hold a light neutral. **Ship the grid on light. Reserve dark for two or three art-directed hero slots you control.** Also set the site background to a near-white that differs slightly from the photo background, so cut-outs do not float.

**Reference golds, if a metal accent is ever wanted:** Seiko `#a89579`, Goldsmiths `#bd9b60`. Both are muted, not saturated yellow. Saturated gold reads cheap.

**One accessibility gap to fix explicitly:** every hairline tested between 1.21:1 and 1.33:1 against its background, far below the 3:1 that SC 1.4.11 requires for meaningful UI boundaries (https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Fine for decorative rules and card edges, which are exempt. **Not fine the moment a hairline is the only thing marking a control boundary** - a filter chip, a bordered button, an input. Those need a separate darker token at roughly 3:1.

### 5.4 Motion vocabulary

**Two durations sitewide.** `200ms ease` for every hover and tap feedback. A slow multi-second crossfade for the hero only. That is Seiko's actual grammar, measured at 112 uses of `.2s ease`.

**No card lift, no card scale on hover.** Not part of this grammar.

**The one signature detail worth building: an 8-step seconds hand.** A mechanical watch at 28,800 vph advances its seconds hand in exactly 8 discrete steps per second, 125 ms per step (https://www.watchscanning.com/tools/beat-rate-converter/). Quartz steps once per second. **Animate with `steps(8)` at 125ms.** Smooth 60fps rotation reads as a render; a 1s tick reads as a cheap quartz; 8 steps reads as a movement, and watch people notice within two seconds. This is the highest-ROI craft detail available, and it derives from the product rather than decorating the page.

**But it must not run forever.** WCAG SC 2.2.2 Pause, Stop, Hide is **Level A** and applies to any moving content that starts automatically, lasts more than five seconds, and is presented in parallel with other content, with no decoration exception (https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). A perpetually running seconds hand is a textbook Level A failure. Run it for under five seconds on load and stop, or trigger it on hover/tap only.

**Banned outright, because SC 2.3.3 names them specifically:** parallax scrolling, decorative elements moving in and out on scroll, page-flipping transitions (https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). Also banned as category-tasteless: gold shimmer sweeps across the logo, count-up animated numbers, auto-scrolling brand-logo marquees, 3D watch models that spin on scroll, cursor-following bezels, and any tick sound.

Wrap whatever motion survives in `@media (prefers-reduced-motion: reduce) { animation: none }`.

**Motion budget: at most two animated ideas on the whole site, both tied to the physical object. Everything else is 200ms opacity.**

### 5.5 The brand's own atomic element

From `LOGO-GEOMETRY.md`: the mark is a watch dial rendered as a squircle, one solid shape with transparent knockouts, whose centre counterform is an hourglass that simultaneously reads as the counter of an **H**. Measured: outer radius `R` = 0.5 x size, squircle corner radius ~0.22 x size, 12 indices at 30 degree intervals, quarter indices ~7.1 degrees wide against baton indices ~2.9 degrees, ratio ~2.45:1, index track from 0.67R to 0.90R.

**The index tick is the atomic graphic element of this brand.** It is already load-bearing in the logo, so reusing it costs nothing and buys instant coherence:

- section dividers, a row of batons instead of a rule
- list bullets and spec-row markers
- the active-state indicator in navigation and filters
- the loading and skeleton motif, indices illuminating clockwise
- a large low-contrast background watermark behind the hero

This gives the site a signature no competitor can copy without copying the logo, and it means the visual language is derived from the client's own mark rather than imposed.

Rebuild rules: author as SVG, `viewBox="0 0 1500 1500"`, `fill="currentColor"`, no embedded fill values. Indices are **trapezoids, not rectangles** - each side edge points at the centre, which is what makes it read as a real dial rather than clip-art. Use exact 30 degree spacing; the original's hand-placed drift of 28.8 to 31.6 degrees is not a design decision worth preserving. Ship three lockups (mark, horizontal, stacked) plus a simplified 16px favicon with only the four quarter indices, because below 24px the batons fill in.

**There is no brand colour in the logo.** Keep the mark monochrome, black on light and white on dark, and let the single accent live everywhere except the logo, so the mark always reads as the most authoritative element on the page.

### 5.6 Brand mark handling rules, encoded once

All parent-brand wordmarks recoverable from Wikimedia Commons are Public domain (below the threshold of originality) with an explicit `trademarked` restriction tag. **Copyright is not the constraint; trademark is.** A shop that genuinely stocks these brands can use the marks nominatively to say what it sells, under the three-prong test from New Kids on the Block v. News America Publishing (https://en.wikipedia.org/wiki/Nominative_use).

Encode these five rules in the design system:

1. Ship each mark **unmodified**. No recolouring, no re-lettering, no redrawing.
2. **Never lock a brand mark up with the shop's logo** in a way that reads as partnership.
3. **Never use a brand mark as the site logo, favicon, or header identity.**
4. **Never put brand names in the domain, subdomains, metatags, or hidden text.** Citizen's terms explicitly prohibit metatag use.
5. **Never imply official agency in English** beyond "certified reseller".

Where no licence-clear vector exists (G-SHOCK, EDIFICE, Julius, Q&Q, Obaku), **set the name as styled type.** Faster, theme-aware, retina-crisp, and it sidesteps the asset-licensing question entirely.

Add one permanent, quiet line in the footer and on every brand page, per the WIPO Oki Data test (https://www.wipo.int/amc/en/domains/decisions/html/2001/d2001-0903.html), which requires a reseller to "accurately disclose the registrant's relationship with the trademark owner":

> فروشنده مستقل. نمایندگی رسمی برای سیکو، سیتیزن، کاسیو و جی‌شاک.
> Independent retailer. Certified reseller for Seiko, Citizen, Casio and G-Shock.

That single line does most of the defensive work and costs nothing.

---

## 6. Merchandising model

### 6.1 The catalogue shape

~175 curated models, weighted to the owner's stated priorities:

| Tier | Brands | Models each | Subtotal |
|---|---|---|---|
| Priority | SEIKO, CITIZEN, CASIO, TIMEX | ~25 | 100 |
| Certified, merchandised separately | G-SHOCK | ~20 | 20 |
| Mid | Q&Q, OBAKU, DANIEL KLEIN | ~10 | 30 |
| Long tail | GUESS, ESPRIT, TOMMY HILFIGER, CAT, EXTRI, JULIUS | ~4 | 24 |
| | | **Total** | **~174** |

Plus two cross-cutting browse entries the owner confirmed: **couple sets (ست)** ~10 and **kids' watches (دخترانه / پسرانه)** ~10, drawn from whichever brands supply them.

**Within every brand, cover the spread the shop actually sells: a few entry, most mid, a couple of halo models.** A catalogue that shows only the top of the range makes people assume they cannot afford the shop and they never call. This is the concrete answer to the 30x Q&Q-to-Seiko spread.

**Every brand page carries this line, in Persian, prominently:**

> بیش از ۱۰۰۰ مدل در مغازه موجود است. برای دیدن همه‌ی مدل‌ها تماس بگیرید یا حضوری تشریف بیاورید.

It is true, it removes all stock-sync maintenance, and it reframes the catalogue from "here is everything" into "here is a taste, the real collection is in the shop", which is exactly the visit the site exists to produce.

### 6.2 The two-taxonomy problem, and the resolution

This is the single biggest schema decision in the dossier. **Collections are real for some brands and fake for others:**

| Collection-driven (real, stable) | Attribute-driven (collections rotate or do not exist) |
|---|---|
| SEIKO: Prospex, Presage, 5 Sports, Astron, Essentials | GUESS: one-season names, filter by gender + finish + stone-set |
| CITIZEN: Promaster, Tsuyosa, Citizen L / xC, Eco-Drive Classic | TOMMY: only TH85 is real, rest by gender + strap + dial |
| CASIO: Edifice, Baby-G, Pro Trek, Vintage | ESPRIT: `ES1G`/`ES1L` only, filter by gender x size x strap x dial |
| G-SHOCK: 5600 square, GA-2100, Master of G, MT-G/G-STEEL | OBAKU: filter by strap type (mesh / leather) + gender + ultra-slim + diamond |
| TIMEX: Expedition, Waterbury, Marlin, Q Timex, Deepwater, Weekender | EXTRI: `X6xxx` / `X3xxx` / `E1xxx` code families |
| Q&Q: Superior | JULIUS: `JA-` / `JAH-` / Star / couple / gift set |

**Resolution: `collection` is an optional field.** Brand pages render a collection filter only when that brand has two or more populated collections. Everything else falls back to the universal attribute facets. Never render an empty or single-item collection facet - it reads as a broken site.

### 6.3 The product schema

Every filterable field is an enum or a number. No free strings, so the filter UI is generated from the data and the owner cannot typo a value out of a facet.

**Identity and commerce**

| Field | Type | Notes |
|---|---|---|
| `id` | string | url-safe slug, stable, never reused |
| `brand` | enum | one of 14 |
| `collection` | string \| null | optional, see 6.2 |
| `ref` | string | **manufacturer reference, ASCII, required.** The highest-density authenticity signal and the primary search key. |
| `title_fa` | string | Persian, leads with the reference for the fashion brands |
| `title_en` | string | Latin |
| `price_note` | string | default `"قیمت روز را تماس بگیرید"` |
| `status` | enum | `showcase` (default) \| `featured`. **No stock states.** The catalogue is explicitly not live inventory. |
| `featured` | boolean | |
| `sort_order` | number | manual. A physical shop wants to push specific stock; that is a field, not an algorithm. |

**Specs**

| Field | Type | Notes |
|---|---|---|
| `gender` | enum | `men` \| `women` \| `unisex` \| `girls` \| `boys` \| `kids` \| `couple` - **six values, not three.** Torob separates دخترانه and پسرانه from بچگانه, and the owner confirmed couple sets. |
| `case_shape` | enum | `circle` \| `square` \| `rectangle` \| `oval` - **دایره / مربع / مستطیل / بیضی.** Iranian-specific, a first-class Torob filter, and the field a Western schema would omit. |
| `case_diameter_mm` | number | Bucket into `<=36` / `37-40` / `41-44` / `45+` for the UI, not a slider. |
| `case_material` | enum | `stainless_steel` \| `plated_steel` \| `titanium` \| `resin` \| `ceramic` \| `alloy` |
| `case_color` | enum | `silver` \| `gold` \| `rose_gold` \| `black` \| `two_tone` |
| `movement` | enum | `quartz` \| `automatic` \| `mechanical` \| `solar` \| `eco_drive` \| `kinetic` \| `digital` \| `ana_digi` |
| `display` | enum | `analog` \| `digital` \| `ana_digi` |
| `water_resistance_atm` | integer | `0 \| 3 \| 5 \| 10 \| 20 \| 30`. **Store the integer, render the sentence.** |
| `crystal` | enum | `mineral` \| `sapphire` \| `hardlex` \| `acrylic` |
| `dial_color` | enum | |
| `strap_material` | enum | `steel_bracelet` \| `leather` \| `resin` \| `silicone` \| `mesh` \| `nylon` \| `ceramic` \| `titanium` |
| `features` | string[] | closed list: `chronograph`, `date`, `day_date`, `gmt`, `alarm`, `backlight`, `luminous`, `world_time`, `moon_phase`, `tachymeter` |
| `is_eco_drive` | boolean | cross-cutting Citizen badge, not a collection |
| `warranty_provider` | string | e.g. "پوزیترون", "آریازمان", "پریما". **From the brand's Iranian representative, never the shop.** |
| `warranty_months` | integer | |

**Media**

`images`: array of `{ src, alt, type, w, h }` where `type` is `front` \| `angle` \| `side` \| `macro` \| `back` \| `wrist` \| `lifestyle`. `type: "front"` is required. **Typing the array (rather than an ordered bare list) lets the card deterministically pick `front`, the hover pick `wrist`, and the build warn when a watch has no wrist shot.**

`whatsapp_text`: pre-filled per product. This is the single highest-value merchandising detail in the dossier and it is copied verbatim from the validated Iranian pattern.

### 6.4 The price-display decision

**Research conflicts hard here, and the conflict is worth stating honestly.**

**For publishing prices:** Across Torob searches for ساعت مچی مردانه, رولکس, امگا and تیسوت, **every single result carried a numeric toman price, including a Rolex Day-Date at ۱۸٬۱۵۰٬۰۰۰٬۰۰۰ تومان. Zero «تماس بگیرید» listings were observed.** Every functioning Iranian shop site shows numbers. Hiding price removes the shop from how Iranians shortlist. And the "inflation makes it unmaintainable" worry is overstated: of 30 physical shops listing the same Casio MTP-1183A, 18 had not touched their price in months, up to five months.

**Against publishing prices:** A 4x spread across four Seiko models and a 30x spread across the shop's own range mean any static number is wrong quickly and invites arguments on the phone. The site has no backend. And the whole conversion goal is the call.

**Decision, three parts:**

**1. No per-model price.** The owner has decided, and it is defensible. Every card carries `قیمت روز را تماس بگیرید` with the call button adjacent.

**2. A per-brand price band, dated.** One line on each brand page:

> ساعت‌های سیکو در گالری هومن از حدود ۲۵ میلیون تومان شروع می‌شود.
> بروزرسانی قیمت: ۱۴۰۵/۰۶/۰۲

Fourteen numbers total, in one file, updated when the owner feels like it, with a visible stamp so staleness is honest rather than hidden. **This is the compensation for the no-price decision and it is not optional.** It answers "can I afford this shop" before the visitor leaves, which is the entire failure mode of a price-free catalogue.

**3. A pre-filled message on every messaging CTA**, copied from the validated Torob pattern. Torob's own CTA for a physical shop is literally `اطلاعات تماس`, not "buy", and it opens a pre-filled Persian WhatsApp message. Adapted for a no-price site:

> سلام، درباره‌ی ساعت [BRAND] مدل [REF] سوال داشتم. موجود هست و قیمتش چنده؟
> [product URL]

That one sentence carries both questions Iranian buyers actually call about, and it turns a blank chat into a qualified lead.

**Do not list on Torob.** Listing there requires publishing and maintaining live prices, enters a race against 40-95 shops on identical SKUs, and produces price-shoppers instead of phone calls. That is the opposite of this site's purpose.

### 6.5 Filters and findability

Baymard's essential set for any category is Price, Brand, Rating, Size, Colour (https://baymard.com/learn/ecommerce-filter-ui). Rating is irrelevant with no backend; price is off the table per 6.4. **That leaves five facets, and the fifth is Iran-specific:**

1. **برند** Brand
2. **جنسیت** Gender (six values)
3. **فرم صفحه نمایش** Case shape
4. **بند** Strap material
5. **موتور** Movement

Plus one cross-cutting badge filter: **Eco-Drive**.

**The rule that keeps the set honest:** Baymard finds that users expect a filter for every attribute they can see on the card, and 38% of sites break this (https://baymard.com/blog/have-filters-for-list-item-info). **Whatever is printed on the card must be filterable; whatever is not printed needs no filter.** Design the card first, derive the filters from it.

Implementation spec, roughly 80 lines of vanilla JS over the loaded JSON: multi-select checkboxes not radios, live result counts computed from the data, visible applied-filter chips, per-facet clear plus clear-all, instant update on desktop, explicit Apply button in a mobile drawer.

**Sorts: three, plus no toggle.** Newest, then the manual `sort_order` as the default (a physical shop wants to push specific stock), then A-Z by brand. No in-stock toggle, because the catalogue is explicitly a showcase.

**Curated entry points on the homepage, six to eight**, each landing on a pre-applied filter URL (`?brand=seiko&gender=men`) so there is one grid template and not ten pages: مردانه / زنانه / بچگانه / ست زوج / اتوماتیک / اکو درایو / جی‌شاک / زیر ۵ میلیون. Target is two clicks to a grid of 20 or fewer.

**Handle gender as both a curated collection and a filter.** Casio's own G-Shock page ships 14 colour swatches, 7 band materials and a water-resistance facet but **no gender filter at all** - "WOMEN" is a curated collection link instead. Copy that: gender as a landing entry, plus a facet inside the grid.

### 6.6 Water resistance - the copy that prevents the most common complaint

ISO 22810 ratings are **static lab pressure tests, not usable depths** (https://en.wikipedia.org/wiki/Water_Resistant_mark). The spec's own caveat: "An indication of the test pressure in terms of water depth does not mean a water-resistant watch was designed for repeated long-term use in such water depths."

**Never print a bare "30m" on a card. Print the permitted activity, rendered from a lookup keyed on `water_resistance_atm`:**

| ATM | Persian sentence | Meaning |
|---|---|---|
| 3 | فقط در برابر پاشش آب و باران - برای دوش و شنا مناسب نیست | splash and rain only, not shower, not swimming |
| 5 | دوش، حمام و شنای سطحی - غواصی خیر | shower, bath, shallow swimming, no diving |
| 10 | شنا، اسنورکلینگ و موج‌سواری | swimming, snorkeling, surfing |
| 20 | غواصی آزاد | skin diving |

Consumer guides are looser than ISO here - several say 3ATM tolerates a shower, and ISO says it does not. **Use the conservative ISO wording.** A shop that undersells water resistance never has a warranty argument; a shop that oversells it does. This is one lookup table and it is the highest-value piece of copy on any product page.

---

## 7. Architecture recommendation

### 7.1 Stack winner: Astro in static output mode

`output: 'static'`, no adapter, single locale `fa-IR`, Tailwind v4, content in one git-tracked `products.json`, images through `astro:assets`, built on a developer machine, uploaded as a plain `dist/` folder to Liara.

**The argument.** Astro is the only option that scores well on all five requirements simultaneously:

1. **Per-product pre-rendered HTML.** Non-negotiable, because social crawlers (WhatsApp, Telegram, Facebook, Discord) fetch the URL server-side and do not execute JavaScript (https://prerender.io/blog/how-to-fix-link-previews/). A CSR catalogue produces identical generic previews for every watch. For a shop whose funnel is "customer sees watch, forwards the link to a friend", per-product `og:title` and `og:image` in the served HTML is a conversion feature. **This single constraint eliminates every SPA and hash-routing architecture.**
2. **Build-time AVIF/WebP with no server.**
3. **Zero shipped JS by default.**
4. **RTL-native via Tailwind v4 logical properties**, no plugin, no PostCSS flip step.
5. **A design system good enough to actually produce a beautiful site**, which is the stated bar and the reason Astro's ~400 extra transitive packages are defensible here.

**Why not the alternatives:**

- **Next.js 16 static export: rejected.** `output: 'export'` forces `images: { unoptimized: true }`, which disables all resize and format conversion because `/_next/image` does not exist without a server (https://nextjs.org/docs/messages/export-image-api). You get React's full dependency surface and none of the image benefit. The App Router also removed built-in i18n routing entirely.
- **Vite + React SPA: rejected** on the link-preview constraint alone.
- **Hugo: strongest runner-up on longevity.** Genuinely dependency-free image processing (AVIF and WebP from a single static binary, no Node, no sharp) and the best "still builds in a year" candidate if you pin the binary. Loses on authoring ergonomics (Go templates) and on how fast a distinctive design can be iterated, which is the stated bar. Its backwards-compatibility record for infrequently-touched sites is also weak: 0.158.0 renamed language config keys and template methods.
- **Eleventy 3 + eleventy-img: the closest honest competitor.** Fewer dependencies, and the HTML-transform image plugin (which scans rendered HTML and rewrites every `<img>` into a full `<picture>`) is arguably lower-maintenance than Astro's component API. Loses on component ergonomics and typed content collections, not on capability. If the team prefers it, it is a defensible choice.

**Documented escape hatch, in the README.** A ~150-line Node script whose only dependency is `sharp`, reading `products.json` plus a photo folder and emitting `index.html` and `p/<slug>.html` via template literals. If Astro 8 breaks the build in 2028 and nobody wants to fix it, the data ports in an afternoon **because the data was never trapped in a framework-specific format.** That portability is the real reason `products.json` beats content collections here.

### 7.2 Pinning, because this repo will be neglected

Astro ships breaking majors roughly annually: 6.0 landed 10 March 2026 requiring Node 22+, dropping Node 18 and 20, moving to Vite 7, removing CommonJS config files, and replacing `<ViewTransitions />` with `<ClientRouter />` (https://docs.astro.build/en/guides/upgrade-to/v6/).

**Freeze it:** exact-pin `astro` with no caret, commit `package-lock.json`, add `.nvmrc` with `22`, declare `sharp` as a direct dependency at an exact version rather than relying on transitive resolution, use npm rather than pnpm (pnpm's symlink and optional-dependency handling is the most common source of `Could not load the "sharp" module`), and never run `npm update`. A pinned Astro 6 repo will still build in 2028; an unpinned one will not.

**Document `passthroughImageService()` in the README** as the one-line degradation that keeps `<Image>` and `<Picture>` working (alt enforcement, no CLS) with zero processing if sharp ever breaks (https://docs.astro.build/en/guides/images/).

**Add an npm mirror line to the README.** Iranian mirrors exist and are maintained: `mirror.kargadan.ir`, `mirror-npm.runflare.com`, ArvanCloud's package mirror. Without a two-line `npm config set registry` block, a future maintainer hits an install hang and concludes the project is dead.

**No CI.** No GitHub Actions build-and-deploy pipeline, no git-based CMS depending on a GitHub OAuth app. GitHub Actions is restricted for Iranian accounts. The build runs on a laptop; the deploy is a folder upload. **This single decision removes the most common source of "the site cannot be updated any more."**

### 7.3 Image pipeline

**Watch photos live in `src/assets/watches/`, never in `public/`.** Files in `public/` are copied verbatim with no optimization, and this is the most common way to silently ship 3MB unoptimized JPEGs. The DOM looks identical.

**Concrete spec:**

- **One aspect ratio: 1:1, enforced.** Crop every product square at build time by padding, so a shop owner shooting on a phone cannot break the grid. The fixed ratio matters more than the codec.
- Grid thumbnails at widths `[240, 360, 480, 720]`, `sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"`.
- Detail hero at `[480, 720, 960, 1440]`, `sizes="(max-width: 768px) 92vw, 640px"`.
- Formats `['avif', 'webp']` plus a JPEG fallback. AVIF has ~93-95% global support and is typically 20-50% smaller than WebP at equal perceptual quality. **Do not serve AVIF alone** - the ~5% gap is concentrated in older iOS and legacy Android WebView, which over-indexes on exactly the older devices common in this market.
- `loading="lazy" decoding="async"` on everything below the fold. `loading="eager" fetchpriority="high"` on exactly the LCP image. Chromium's lazy-load distance threshold is 1250px on 4G and 2500px on 3G-or-slower.
- Preload only the LCP image and the one woff2. Never preload the grid - on a throttled connection that is worse than doing nothing.

**Measure the build, do not guess it.** 175 models x 2 images x 4 widths x 3 formats is ~4,200 encodes per cold build, mostly AVIF. Astro reprocesses every image on every build regardless of change. **Run a 20-photo probe through the real pipeline in Phase 01 and multiply.** Set AVIF `effort` to ~4 (Astro 6.1+ exposes codec-specific encoding effort) and cache `node_modules/.astro` between builds. If the owner ever watches a six-minute build, he will conclude the site is broken.

### 7.4 Search

**At ~175 products, no search library is needed and adding one is the wrong call.**

175 products x ~400 bytes of metadata is ~70KB of JSON, smaller than one product photo. Ship the whole catalogue as one JSON file and filter in the browser:

```js
products.filter(p => norm(p.searchBlob).includes(norm(q)))
```

`String.includes()` over brand + model + reference + Persian transliteration covers roughly 95% of real searches.

**The real Persian search problem is normalization, not the algorithm, and no library solves it for you.** See section 4.6. MiniSearch (~5.9kB gzipped) and Fuse.js (~9.5kB) both exist, but adding Fuse to a 175-row array will not fix `کاسیو` failing to match `كاسيو`-typed data - only `norm()` will. Add Fuse only if real users demonstrably mistype brand names in Latin script.

**Note the scale trap that was avoided:** at 1,000 products the index alone would be ~150KB, which would consume the entire JS budget before a single line of filter logic. The 175-model decision is what keeps this simple.

### 7.5 Content authoring for a non-technical owner

**Ship the fallback on day one, add the CMS only when update volume proves it necessary.**

**Baseline (launch):** the developer edits `products.json` on request. Photos arrive by whatever channel measurably works on Hemmati's phone. The developer runs one resize/WebP command, plus `rembg` (free, MIT, offline, ~2-3s per image) where a cutout is wanted, commits, rebuilds, uploads. Zero work, and it is what will actually run for the first weeks.

**Because the site publishes no per-model prices, the repricing volume that normally kills this model does not exist.** The only recurring edit is the fourteen brand price bands. That is a fifteen-minute job.

**When it outgrows that: Sveltia CMS at `/admin`, GitHub backend, PAT auth.**

The mechanics that make this the right choice for this specific owner:

- **Personal-access-token sign-in with no OAuth app and no broker server.** GitHub put SPA PKCE on hold, so PAT is the only zero-infrastructure login (https://sveltiacms.app/en/docs/backends/github.md). The standard "deploy an OAuth broker on Cloudflare Workers" recipe is exactly the wrong shape for Iran, because `workers.dev` is DNS-poisoned.
- **A fine-grained PAT can be scoped to one repository with `contents: write` and created with no expiration** (https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). **The developer issues it from their own account and hands Hemmati one string.** He never creates a GitHub account, never sees GitHub, never verifies an email or phone with a US company. This is the biggest "no tech experience" unlock available.
- **Full mobile support with QR-code login**, which matters because the phone that took the photos is the device that will be used.
- **Client-side image transformation on upload:** `transformations.raster_image` with `format: webp, quality: 85, width: 1600`. A 5MB phone JPEG becomes a ~150KB WebP committed straight to the repo. That is the entire image pipeline, free, zero maintenance.
- It is one extra static HTML file plus a config, served from the same origin. No server, no database, no build step, no monthly cost.

**The one strike: Sveltia has no Persian UI locale** (Decap does). Mitigation is cheap: every field `label:` in the CMS config is your own string, so write them in Persian. The form Hemmati fills reads Persian even though Save/Publish do not. Arabic is a shipped locale, so RTL layout already works.

**Rejected explicitly:**

- **Netlify Git Gateway:** formally deprecated (https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/). The "Decap + Netlify Identity, zero config" tutorial that dominates search results is a dead end.
- **Pages CMS:** best-in-class at inviting editors with no GitHub account, but the free hosted instance is on Vercel and self-hosting needs PostgreSQL, a Node server, a GitHub App and a reverse proxy. Fails both the no-backend and no-monthly-cost constraints.
- **Airtable:** its ToS §18 prohibits use by anyone located in a country under US sanctions (https://www.airtable.com/company/tos). The shop would be in breach from day one and the catalogue could vanish without appeal. Attachment URLs also expire, so photos could not be hotlinked anyway.
- **Google Sheets:** technically reachable and needs no API key via publish-to-web CSV, but it cannot hold images. For a watch shop the photo IS the product. It solves the easy half.
- **Publii:** genuinely well matched to an Iranian shop with a Windows PC and FTP hosting (free, GPL, no account, no sanctions surface), but it owns the whole site, so you would author a Publii Handlebars theme instead of the design. Keep in reserve if GitHub access ever becomes the blocker.

**Deploy path.** Liara Static accepts a drag-and-drop zip in its web console, which is a step Hemmati can be taught in five minutes if the developer is unavailable. If the host ends up FTP-only, `SamKirkland/FTP-Deploy-Action` is actively maintained (MIT, ~5.2k stars) and bridges a GitHub repo to any FTP/SFTP server - but that reintroduces CI, so prefer manual upload.

---

## 8. SEO / schema / performance budgets

### 8.1 Optimize for exactly one crawler

Google holds **99.42%** search share in Iran; Bing 0.48%, Yandex 0.04%, DuckDuckGo 0.02% (https://gs.statcounter.com/search-engine-market-share/all/iran, July 2026). Skip Bing Webmaster Tools, skip IndexNow, skip Yandex verification.

**Two hard constraints on the SEO strategy:**

**Google Business Profile does not exist for Iran.** Google's own support page lists Iran among unsupported countries due to OFAC (https://support.google.com/business/answer/6270107). No local pack, no claimable listing, no Google reviews, no Google-hosted hours, ever. The shop's Maps link is a dropped pin at raw coordinates with no business entity attached, and it cannot be upgraded. **Every hour that would normally go into GBP redirects into (a) the `LocalBusiness` JSON-LD, (b) visible on-page NAP in Persian, and (c) Balad and Neshan listings.**

**A naive Iranian VPS may geo-block foreign IPs, which would silently block Googlebot** (which crawls from US addresses) and make the entire SEO effort worthless. Iranian CDN edges demonstrably answer globally (aparat.com, digikala.com, basalam.com and divar.ir all returned 200 from a US-routed host on 185.147.x / 185.166.x / 185.188.x). **Verify after launch by fetching the live site from a non-Iranian IP and by running Search Console's URL Inspection live test.**

### 8.2 The Persian query map, pulled live

Google autocomplete (hl=fa, gl=ir, 2026-08-24) returns these real queries:

| Intent | Queries |
|---|---|
| **Dealer authority** | نمایندگی رسمی ساعت سیکو در ایران / نمایندگی رسمی ساعت کاسیو در تهران / نمایندگی رسمی ساعت سیتیزن |
| **Authenticity** | ساعت سیکو اصل / ساعت کاسیو مردانه اصل / ساعت جی شاک اصل / ساعت مچی اصل ژاپن / ساعت اورجینال مردانه |
| **Category** | ساعت مچی مردانه / ساعت مچی زنانه / ساعت مچی دخترانه اسپرت |
| **Local** | ساعت فروشی تهران / بهترین ساعت فروشی تهران |
| **Hyperlocal, near-uncontested** | **ساعت فروشی اکباتان** and **تعمیرات ساعت اکباتان** both return as real autocomplete suggestions |

**Do not fight Torob on `قیمت ساعت سیکو`.** Torob's own page title for that query is `لیست قیمت روز ساعت مچی سیکو | ترب` and it owns high-intent price queries. **Win instead on queries a price aggregator structurally cannot serve:** dealer authority and neighbourhood. Hooman's certified-reseller status plus a fixed sixteen-year-old address is precisely the answer to those.

**Site architecture falls straight out of the query map:**

| Page | Targets |
|---|---|
| Homepage | نمایندگی رسمی ساعت سیکو / سیتیزن / کاسیو + گالری ساعت اکباتان |
| `/brand/seiko/` etc. x14 | ساعت [برند] اصل + نمایندگی رسمی |
| `/men/` `/women/` `/kids/` `/couple/` | ساعت مچی مردانه / زنانه / دخترانه / ست |
| **`/repairs/`** | **تعمیر ساعت اکباتان + تعویض باتری ساعت** |
| `/visit/` | ساعت فروشی اکباتان + address, hours, directions |
| `/authenticity/` | تشخیص ساعت اصل + warranty explanation |

**`/repairs/` is promoted to a definite deliverable.** The owner confirmed repairs and battery replacement. `تعمیر ساعت` is a high-intent, low-competition Persian term, and combined with `تعمیر ساعت اکباتان` this page may convert better than the catalogue.

**Two more signals from autocomplete worth acting on:** `ساعت فروشی تهران اینستاگرام` shows Iranians search Google for a shop's Instagram, so put the handle in prominent visible text and in `sameAs`. And `ساعت تایمکس ترب` confirms Torob's brand is embedded in product queries, which is another reason not to compete there.

### 8.3 Title and meta patterns, from the market leaders

Torob's category title format is `لیست قیمت روز ساعت سیکو | ترب` - intent phrase + entity + pipe + short brand. Digikala's meta description is Persian prose padded with checkmark glyphs to widen the SERP snippet: `✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت`.

**Templates:**

- Product: `{مدل} | {برند} اصل - گالری ساعت هومن`
- Brand: `ساعت {برند} اصل | نمایندگی رسمی - گالری ساعت هومن`
- Meta description, 120-150 chars, using the proven checkmark convention: `✓نمایندگی رسمی ✓۱۶ سال سابقه ✓شهرک اکباتان ✓تماس: ۰۲۱-۴۴۶۹۷۳۰۹`

Note Digikala's own meta mixes Arabic yeh (`رايگان`) with Persian yeh elsewhere. Run the normalizer over all Persian content at build time: force `U+06CC` and `U+06A9`, preserve ZWNJ. **Keep model numbers in ASCII.** Where a number is searched both ways (`سیکو ۵` vs `Seiko 5`), put one form in the H1 and the other in body copy so both match.

### 8.4 Structured data

**One `JewelryStore` node, site-wide, with a stable `@id`.** Google's guidance is explicit: use the most specific `LocalBusiness` subtype available (https://developers.google.com/search/docs/appearance/structured-data/local-business). `https://schema.org/JewelryStore` returns 200 and is a subtype of Store.

```json
{
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "@id": "https://REPLACE.ir/#shop",
  "name": "گالری ساعت هومن",
  "alternateName": "Hooman Watch Gallery",
  "url": "https://REPLACE.ir/",
  "image": ["https://REPLACE.ir/img/storefront-1200x900.jpg"],
  "description": "نمایندگی رسمی سیکو، سیتیزن، کاسیو و جی‌شاک در شهرک اکباتان تهران. از سال ۱۳۸۹.",
  "telephone": "+98-21-44697309",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "شهرک اکباتان، فاز یک، بازارچه شماره ۱۰، پلاک ۳",
    "addressLocality": "تهران",
    "addressRegion": "تهران",
    "addressCountry": "IR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 35.712130, "longitude": 51.312458 },
  "hasMap": "https://REPLACE-neshan-or-balad-place-url",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "11:00", "closes": "14:00" },
    { "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "17:00", "closes": "22:00" }
  ],
  "sameAs": ["https://www.instagram.com/hooman_watchgallery/"],
  "currenciesAccepted": "IRR",
  "knowsAbout": ["Seiko","Citizen","Casio","G-SHOCK","Timex","Q&Q","Obaku","Guess","Esprit","Tommy Hilfiger","CAT","Daniel Klein","Extri","Julius"],
  "contactPoint": [
    { "@type": "ContactPoint", "telephone": "+98-912-3470889", "contactType": "sales", "availableLanguage": ["fa"] }
  ]
}
```

**The two `openingHoursSpecification` entries are the single most important detail in this block.** A single 11:00-22:00 range would send customers to a closed shop during the daily 14:00-17:00 break and turn the site's best asset into a complaint.

**`knowsAbout` is how the fourteen-brand roster becomes machine-readable**, which is what AI answer engines read and the only structured channel available given no Google Business Profile.

**Product schema, the honest version.** Google's Product snippet spec requires `price` inside `Offer` (https://developers.google.com/search/docs/appearance/structured-data/product-snippet). schema.org has **no** enumeration meaning "price on request". A no-price catalogue therefore cannot earn a Product rich result. Do not chase it.

**Ship `Offer` with `availability: InStoreOnly`, `seller` pointing at the shop's `@id`, and no `price`:**

```json
"offers": {
  "@type": "Offer",
  "url": "https://REPLACE.ir/w/seiko-snk809/",
  "availability": "https://schema.org/InStoreOnly",
  "itemCondition": "https://schema.org/NewCondition",
  "priceCurrency": "IRR",
  "seller": { "@id": "https://REPLACE.ir/#shop" },
  "availableAtOrFrom": { "@id": "https://REPLACE.ir/#shop" }
}
```

That triple - `InStoreOnly` + `seller` + `availableAtOrFrom` - is what tells a machine "phone this shop" without lying about a price. **Search Console will report "Missing field price" as a known, deliberate state. Document it so nobody later "fixes" it by inventing prices.** Never write `"price": "0"` - Google reads that as free.

If the owner ever agrees to publish coarse bands, `AggregateOffer` with `lowPrice` satisfies the requirement and is the Google-valid middle path. Verify against the Rich Results Test before committing.

**BreadcrumbList on every page.** The cheapest structured-data win and the only one here that reliably changes SERP appearance (the URL line becomes the breadcrumb trail). Generate it from the file path at build time. Note: `item` is not required on the last element - Google uses the containing page's URL.

**ItemList on category pages: ship it, for the right reason.** Google's carousel rich result supports only Course, Movie, Recipe and Restaurant - **Product is not among them**, so an ItemList on a watch category page will not produce a carousel. It costs ~800 bytes and gives AI answer engines a clean ordered list of what the shop stocks. Do not sell it to the owner as "you'll get a carousel in Google."

**Skip entirely:** hreflang (single language, single market), `geo.position` meta tags (Google ignores locational meta tags), and any XML-sitemap `<priority>` or `<changefreq>` (Google ignores both).

### 8.5 Sitemap and robots

One flat `sitemap.xml`, no index file, at ~200 URLs. `<loc>` from the output path, `<lastmod>` from the **source data file's git commit date, not the build timestamp** - a build-time date makes every URL look modified on every deploy, which is exactly the "not verifiably accurate" case Google discounts. Zero `<priority>`, zero `<changefreq>`.

`robots.txt`: copy Torob's minimal pattern, not Digikala's. Allow everything, disallow nothing (there are no carts or accounts to hide), one `Sitemap:` line. **Do not blanket-block query strings** - instead make sure the site never generates them, by keeping client-side filter state out of the URL except for the curated entry links. Optionally block AhrefsBot and SemrushBot to save bandwidth. **Never block Googlebot-Image** - the catalogue's original photography is a real discovery channel for watches.

### 8.6 Performance budgets

Baseline from the current performance-inequality reference (https://infrequently.org/2025/11/performance-inequality-gap-2026/): 9 Mbps down, 100 ms RTT, a Samsung Galaxy A24-class device, giving 0.3 MiB JS and 2.0 MiB total for a three-second target globally.

**Halve it for Iran, because the network is degraded post-blackout and international transit runs at 187 ms:**

| Budget | Limit | Why |
|---|---|---|
| Total, first load | **≤ 300 KB** | Competitors ship 430 KB to 1.21 MB of HTML alone |
| JavaScript | **≤ 30 KB** | A static Persian catalogue has no business shipping a framework runtime. The filter is ~80 lines of vanilla JS over a JSON blob. |
| Catalogue JSON | ≤ 70 KB | 175 products x ~400 bytes |
| Fonts | ≤ 80 KB, one file | One variable woff2, subset, preloaded, `font-display: swap` |
| CSS | ≤ 20 KB | Inline the critical path |
| LCP image | **≤ 80 KB AVIF** | Must be discoverable in the initial HTML, never JS-injected |
| HTTP requests | ≤ 25 | Every extra foreign origin costs a fresh ~200 ms handshake |
| Origins | **1** | Single origin. Four connections cut the three-second budget by 350 KiB. |

**Core Web Vitals targets** (https://web.dev/articles/vitals): LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, all at the 75th percentile.

- **LCP** will be the hero or first product image on every template. Reserve it with `width`/`height` or `aspect-ratio` to hold CLS at 0.
- **INP** is nearly free on a static site. Do not add JS that jeopardizes it - no client-side filtering library on category pages, plain links for the curated entries.
- **CLS** is guaranteed by the fixed 1:1 aspect ratio plus explicit dimensions.

**The phone number must never be blocked behind an image or font load.** Render it as text in the initial HTML, styled so it is legible before the webfont arrives.

**Add a service worker that caches the catalogue**, so a returning visitor can browse offline and still see the phone number during a throttling event. This is the one piece of JS that earns its budget.

### 8.7 Open Graph

Required by ogp.me: `og:title`, `og:type`, `og:image`, `og:url`. Image spec, which the whole OG ecosystem follows: **1200x630, JPEG or PNG (not WebP - some preview crawlers still choke), under ~300 KB, absolute HTTPS URL, with `og:image:width` and `og:image:height` declared** so the client can lay out the card before downloading. Set `og:locale` to `fa_IR`. Generate them at build time from the product photo plus the logo and the Persian model name.

**Correct one premise:** OG tags buy almost nothing on Instagram, which does not render previews for arbitrary bio or story links. The surfaces that actually render a preview are WhatsApp, Telegram, and the domestic Telegram-derived messengers (Eitaa, Bale, Rubika - likely OG-compatible, untested). **Telegram's OG behaviour is empirical, not specified** - its Instant View docs cover only XPath templates and never mention Open Graph. Ship `twitter:card=summary_large_image` as a fallback, then test by pasting a real URL into Telegram Saved Messages and WhatsApp before launch.

### 8.8 Analytics: ship none

**GA4 is a hard block, not a preference.** Google terminated Google Analytics access for Iranian accounts and websites in December 2024 to January 2025, wiping historical property access for an estimated 10,000+ Iranian businesses with no warning (https://www.khabaronline.ir/news/2010036/).

**Skip analytics entirely at launch.** The site has one conversion, a phone call, which no client-side analytics can measure anyway. GTM was the slowest asset measured from Iran at 2.70s on one node, and every foreign script is a render-blocking liability during throttling.

**The measurement that actually matters is a question to Hemmati: "did more people call this month?"** That is the metric, and it costs nothing.

If the owner later wants numbers, in order of preference: **StatsFA** (statsfa.com, domestic servers, cookieless, Persian dashboard he can read himself, survives blackouts) > **GoatCounter** (free for small business, a single Go binary self-hostable on the Iranian host) > **Yandex Metrica** (free, no sanctions exposure, but heavy and foreign). Verify script reachability from a real Iranian connection before committing to any of them. Reject self-hosted Plausible outright: its own docs frame it as ongoing infrastructure work (Docker + PostgreSQL + ClickHouse), which is absurd for a shop getting a few hundred visits a month.

### 8.9 Two zero-code tasks worth more than most of the build

1. **Register the business on Balad** at https://business.balad.ir/ - free, self-serve, in Persian. Balad is the navigation app an Iranian will actually have installed. Use the resulting place URL as `hasMap` in the JSON-LD and as the directions link.
2. **Register on Neshan.** No public self-serve registration flow was found on neshan.org's homepage - it may be app-only. Email `support@neshan.org` or use `t.me/Neshan_support_bot`. Treat as a nice-to-have secondary to Balad.

The shop currently has no verified presence on any map. These two listings, plus the JSON-LD, are the entire local-discovery layer.

---

## 9. Imagery: legal position and the practical path

### 9.1 The legal position, in four sentences

**Owning the watch grants no rights to the brand's photograph.** 17 U.S.C. §109 lets the owner of a lawfully made copy sell that copy and display it "to viewers present at the place where the copy is located." It does not touch the reproduction right (https://www.law.cornell.edu/uscode/text/17/109). Uploading a brand image to the site is a reproduction plus a new public display, both outside §109.

**Nominative fair use covers the words, not the pictures.** It is a trademark doctrine, expressly distinct from copyright fair use (https://en.wikipedia.org/wiki/Nominative_use). It lets the shop write "SEIKO" and "we sell Citizen". It gives no cover whatsoever for copying their photographs. Keep the two questions separate in every design decision.

**There is no fair-use argument to build the catalogue on.** Using a whole professional product photo, commercially, to sell the same product is the weakest possible posture on all four factors: whole work, commercial, direct substitution for the licensing market (https://www.copyright.gov/fair-use/).

**Iran is not a party to the Berne Convention** (182 states are; Iran is a TRIPS observer only), so a foreign brand has no straightforward domestic copyright suit against an Iranian shop. **This is the honest reason the practice is endemic locally, and it is not the risk that matters.**

### 9.2 The risk that actually matters

**The enforcement vector is DMCA §512 notice-and-takedown against the host, CDN, registrar or Instagram**, which operates wherever the file is served, not where the shop sits. A compliant notice obliges the provider to "act expeditiously to remove, or disable access to" the material to keep its safe harbour (https://www.copyright.gov/512/).

**So the downside is not a lawsuit. It is the catalogue or the Instagram account going dark without warning, right when the shop depends on it for phone leads.** That framing usually wins the argument for spending one afternoon photographing the case. Do not present it to the owner as "everyone does it, so it is fine."

**Copying a marketplace listing photo adds a second problem on top:** the photo shows a different physical unit than the one in the case. The customer drives to Ekbatan, the watch does not match the picture, the call was wasted and the trust is gone. That is worse than the legal exposure.

### 9.3 What the brands actually offer, brand by brand

| Brand | Public asset source? | Route |
|---|---|---|
| **Timex** | **Yes, effectively** | Public Shopify CDN, reference-named 1000x1200 PNGs, bulk `products.json`. Still Timex's copyright. Press: `Timex@Civic-US.com` at https://press.timex.com |
| **Guess** | Via Timex Group | Same press portal (Sequel AG is a Timex Group division). guess.com is unreachable to automation. |
| **Esprit** | **Logo only, cleanly** | TMS Group publishes the current wordmark SVG in both polarities with no login. No product imagery. |
| **Citizen** | No | Permissioned Widen/Acquia retailer portal. Access comes from the Iranian importer, not the web. |
| **Seiko** | No | Press-release and distributor-request based. `/global-en/forthemedia_login` is gated. |
| **Casio / G-Shock** | No, and blocked | Akamai 403 on every regional store, even to reader proxies. Written-permission path exists in their terms. |
| **Tommy Hilfiger** | No | newsroom.tommy.com is login-gated (ePressPack). PVH media library 404s. Address requests to **Movado Group**, not tommy.com. |
| **Obaku** | No | No press kit, no dealer portal, no wholesale page. Only `info@obaku.com`. Brands at this tier usually say yes to a named retailer. |
| **Q&Q / Daniel Klein / CAT** | Unverified | Research gap. |
| **Extri / Julius** | No | No press kit anywhere. Manufacturer B2B listings (devars.en.alibaba.com, HKTDC) if the shop is their customer. |

**Terms that explicitly forbid the obvious shortcut:**
- Citizen: content "may not be reproduced, duplicated, copied, sold, resold, visited, or otherwise exploited for any commercial purpose", no "data mining, robots, or similar data gathering and extraction tools", no metatag use of their marks (https://www.citizenwatch.com/us/en/legal/terms).
- Timex: "Nothing on this Site shall be construed as granting, by implication, estoppel, or otherwise, any license or right to use any trademark, logo or service mark" (https://www.timex.com/pages/terms-conditions).
- Seiko USA: users are "prohibited from using the site or its content ... to spam, phish, pharm, pretext, spider, crawl, or scrape" (https://www.seikousa.com/pages/terms-of-service).
- Casio: has a **written-permission path**, and the stated price is a designated copyright notice (https://world.casio.com/terms/). Worth one email if the shop is a real Casio stockist.

**Scraping Chrono24 is worse than scraping a brand.** Its robots.txt bans HTTrack, Scrapy, BLEXBot, Amazonbot, MJ12bot and dozens more by name, and its listing photos are typically shot by **other dealers**. Copying them infringes a competitor's copyright, and competitors complain faster and louder than brands do.

### 9.4 AI generation: banned for real SKUs, fine for atmosphere

**Banned by the industry's own published standard**, which Google states plainly: "Don't use a generic image, graphic, or illustration that is not the actual product image" (https://support.google.com/merchants/answer/6324350).

An AI "Seiko 5" gets the index count, dial text, crown position or logo subtly wrong. The customer phones, comes in, and the watch is not the one in the picture, which destroys exactly the trust the site exists to create. **AI product renders are legally worse than copied brand photos, not better** - they reproduce the brand's mark and dial trade dress on a product that does not exist, which is outside nominative fair use, and they add a misrepresentation problem on top of the trademark one.

**AI imagery IS acceptable for:** hero and section backgrounds, abstract textures, gradients, decorative motifs, store-atmosphere illustration, and category tiles that do not purport to be a specific SKU.

**The clean design rule: if a customer could reasonably think "that is the watch I would receive", it must be a photograph of actual stock.** Everything behind, around, or between the product grid can be generated.

### 9.5 The practical path

**Every SKU image is a photograph of the actual stock. This is not a compromise, it is strictly better here** - a photo of the real watch on the real counter is the authenticity proof this market demands, it removes every licensing and foreign-CDN risk at once, and it is the one asset no competitor can copy from a supplier CD.

**Shoot list, four images per model minimum:**

| # | Type | Purpose |
|---|---|---|
| 1 | `front` | The card image. Required. |
| 2 | `angle` (3/4) | Depth |
| 3 | `side` | Case thickness |
| 4 | **`wrist`** | **Scale. Strongly recommended, not optional in practice.** |

Optional extras for hero pieces: `macro` (dial detail), `back` (caseback, which is where the serial number lives).

**The wrist shot is the one that converts.** 42% of users try to judge product size from images and 28-37% of sites provide no in-scale image; Baymard names accessories, jewellery and watches explicitly as the categories where human-model imagery is critical, and 23% of sites fail it (https://baymard.com/blog/in-scale-product-images). "How big is 41mm actually" is the question that either becomes a wasted phone call or prevents one entirely. Make `type: "wrist"` a build-time warning when absent.

**56% of users' first action on a product page is to explore the images, before reading any text.** Product page layout: gallery occupies the first viewport on mobile, phone CTA pinned directly beneath it, spec table below the fold. Do not lead with prose.

**Two thumbnails per card, four per product page.** Baymard finds 3+ thumbnails in list views raises purchase confidence; a hover or swipe second image (front to wrist) is cheap and directly cuts browse-to-decide time.

**The shooting rig, which costs almost nothing:**

- One soft key light at ~45 degrees
- A light cone or tent, because a watch crystal is a mirror and diffusion is the specific fix, not more lumens
- A white foam-board reflector opposite
- A white paper sweep curving vertical to horizontal
- Phone on a small tripod, **rear camera**
- **The tripod position taped to the table**, so every SKU shoots from the identical spot

That last item is what actually produces a consistent catalogue, not the gear (https://www.shopify.com/blog/jewelry-photography).

**Set every watch to 10:10 before shooting.** Hands at 10:10 with the seconds hand around 30-33s frame the brand logo at 12, produce a symmetric "smile", and avoid the hands shadowing dial furniture (https://www.squareshot.com/post/watch-photography-that-works-time-after-time-again). Cost: zero. Effect: 175 photographs that look like one catalogue instead of 175 snapshots. **This is the highest-leverage single instruction to hand the shop.**

**Adopt Google Merchant Center's image spec as the house standard**, even with no product feed: minimum 500x500, ~1500x1500 recommended, product fills 75-90% of the frame, solid white or transparent background, no borders, no watermarks, no logo overlays (https://support.google.com/merchants/answer/6324350). It gives the owner an objective "is this shot acceptable?" checklist and future-proofs the images for Instagram Shopping later. **Square 1:1 at 1500px, exported to WebP, is the whole spec.**

**One written line assigns copyright.** If anyone other than the owner shoots the catalogue, get a signed sentence assigning copyright to the shop. Under Copyright Office Circular 42 the default owner is the photographer, not whoever paid (https://www.copyright.gov/circs/circ42.pdf). Otherwise the shop licenses its own catalogue from whoever held the phone, which becomes a real problem the day they fall out.

**Design the page to look correct with ONE image.** Treat images 2-4 as progressive enhancement, or the site cannot launch until every photo exists.

**Placeholder policy.** For any model published before its photos exist, ship a deliberate "عکس به‌زودی - برای دیدن حضوری تماس بگیرید" tile with the call button, not a borrowed image and not a broken-image gap. It is safer, it is honest, and it converts better.

**Also shoot the shop itself.** A photograph of the counter, the display cases, and Hemmati behind them is the single strongest authenticity signal available and no competitor in the 13-shop teardown has one. That photo is the homepage hero.

---

## 10. Corrections log

Fourteen claims were overturned by adversarial verification. The corrected version wins in every case above. Grouped by consequence.

### Corrections that CHANGED a decision

**C1. Vercel is degraded, not blocked.** The 2021 staff quote is a liability disclaimer ("we cannot guarantee deliverability"), not a block, and the May 2026 report explicitly says Iranian users can technically reach Vercel. The 403s are WAF false positives from shared national-gateway IPs, fixable self-serve via System Bypass Rules accepting CIDR ranges (https://vercel.com/docs/vercel-firewall/vercel-waf/system-bypass-rules), though only on Pro and above. *Still avoided here*, but for the right reasons: Iranians cannot sign up or pay, and 31 CFR §560.540(b)(3) excludes commercial web hosting for Iranian entities anyway.

**C2. Netlify did not suspend Iranian users.** The May 2026 action targeted one open HTTP proxy project running on Edge Functions plus thousands of fraudulent accounts, and Netlify's Head of Infrastructure posted an explicit policy statement in the very thread cited ("We can't provide an open proxy to the internet"). The original claim missed it by reading only the first page of a 39-post thread. Netlify's Website Terms genuinely lack an export clause, but the operative Self-Serve Subscription Agreement carries §11 "Trade Sanctions and Export Control". *Enforcement is contractual and announced, not silent nationality-based suspension.*

**C3. GitHub Pages is disqualified by product terms, not sanctions. This is the most consequential correction in the set.** The original claim concluded "Iranian commercial use of GitHub Pages is explicitly permitted." The OFAC licence is real and Iran is genuinely outside the Crimea/Donetsk/Luhansk personal-communications carve-out. But a separate, country-neutral rule in GitHub's Terms for Additional Products bans Pages for "an online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions." *Absence of a sanctions bar is not presence of permission.*

**C4. Iran had TWO 2026 shutdowns, not one 138-day one.** Roughly 8-28 January (~20 days, protests) and 28 February to 26 May (~88 days, war), with a month of relaxed whitelist access between them at ~50% reduced traffic. The original claim welded the first event's start to the second's end and labelled it "roughly 90 days". It also froze the recovery figure at 40%: Cloudflare's Q2 2026 review (28 July 2026) reports traffic has since peaked near 90% and settled at roughly 59% of pre-shutdown levels. *Domestic-hosting conclusion unchanged and arguably strengthened - the second blackout was the longest nationwide disruption recorded in any country.*

**C5. Google Fonts is NOT blocked in Iran.** Live tests on 2026-08-24 returned HTTP 200 from 7 of 8 Iranian probe nodes for both the CSS API and a gstatic woff2. The one failing node timed out on every URL including domestic ones. OONI has zero measurements for fonts.googleapis.com in Iran, meaning it is not even on censorship test lists. *Self-host anyway* - for latency (5-40x slower than domestic), blackout resilience, and because Iranian devs report intermittent hangs producing 13,012ms FCP versus 348ms self-hosted. **But never justify the decision with "Google Fonts is blocked", which is false and will be challenged.**

**C6. Vazirmatn has ss01 but NO ss02.** The original brief assumed ss02. Its only features beyond defaults are `ss01` (literally named "Farsi Digits"), `tnum` and `pnum`. Also corrected: Vazirmatn's Latin comes from **Roboto**, not DejaVu Sans - DejaVu was only the base for the very first version. *This is why Estedad wins in section 5.2.*

**C7. ArvanCloud's SDN designation SURVIVED verification and is current.** All four parties (the company, CEO Pouya Pirhosseinloo, tech lead Farhad Fatemi, and the Dubai affiliate) remain on the live SDN list as of August 2026. General License P expired 6 July 2023. Note the practitioner nuance: the OFAC listing has no enforcement surface inside Iran, ArvanCloud opened a fifth datacenter in August 2026, and Iranian devs depend on its package mirrors. **The constraint applies to the reader, not to the Tehran shop.** Any US person, US entity, USD banking, diaspora developer, or foreign client makes it prohibited. Also note the EU delisted ArvanCloud in April 2024 after litigation, while the UK and Australia added listings in September 2023.

### Corrections that refined a claim without reversing it

**C8. Render's Iran ban in its ToS is real but irrelevant.** §1.7 exists and is broader than quoted (it covers citizens and residents regardless of location, with immediate termination). But it decides nothing on the ground: render.com sits behind Cloudflare and bills through Stripe, so the paid tier is closed regardless. Render does not appear in the Iranian developer community's own canonical sanctions list at all.

**C9. Firebase/GCP blocking is overstated and misattributed.** The verified "Country Blocked" errors are from Firebase **backend APIs** (Auth, Realtime Database) and Cloud Run, not Firebase **Hosting** serving static assets. The primary evidence is a GitHub issue closed in two days in 2017. The "scorched earth" quote appears in none of the cited sources, and the AWS/Azure contrast rests on a single 2019 forum comment contradicted in its own thread. Most importantly the causation has inverted: Filterwatch's June 2026 report lists Google Firebase as blocked **from the Iranian side**. *Avoid it anyway; switching to AWS or Azure does not clear the Iranian-side block.*

**C10. GL D-2 was archived, not superseded, and the price framing was backwards.** Its provisions were incorporated into 31 CFR §560.540 effective 17 May 2024. Two corrections: §560.540(a)(1) says nothing about fees, so **both fee-based and free** services are authorized for ordinary Iranian users - the "no cost" condition applies only to the Government of Iran under (a)(6). And the claim omitted paragraph (b), whose exclusions are exactly what bind a hosting decision: **(b)(3) does not authorize "web-hosting services for websites of commercial entities located in Iran."** No GL D-3 exists.

**C11. "Users only had access to domestic services" was too absolute.** The paper cited actually says the June 2025 blackout preserved domestic and government services while cutting foreign ones - traffic fell ~90%, not 100%. International DNS stayed permitted, some Google Search access was deliberately preserved, and Psiphon alone held ~1.5M Iranian users. Also missing from the original mechanism list, and important for hosting: **wholesale IP-range blocking of Hetzner, DigitalOcean and Linode**, plus blanket UDP blocking. No SNI or DNS workaround saves a blackholed prefix.

**C12. Cloudflare's DNS poisoning hits pages.dev, not workers.dev.** Live queries against three Iranian resolvers returned genuine Cloudflare anycast IPs for `workers.dev` while poisoning `pages.dev` to 10.10.34.36, and Shecan returns 10.10.34.43 for both. Per-resolver, per-ISP, and episodic - `workers.dev` was poisoned for about five days in mid-August 2026 and clean again by the 20th. The cited net4people issue is dated October 2022, not June 2025, and the June 2025 Cloudflare event was **IP blocking during a total shutdown, substantially rolled back within a day**, not standing SNI-based CDN blocking. *Practical conclusion holds: never ship on a free platform subdomain.*

**C13. raw.githubusercontent.com is no longer blocked.** OONI shows 417 of 427 measurements OK from Iran over the last twelve weeks with **zero** confirmed blocks - fewer than github.com (3), gist.github.com (3) or codeload.github.com (2). The claimed asymmetry is inverted. The 2017 DPI hardening is real history; presenting it in the present tense is not. The "GitHub Pages is treated differently" element had no source at all: OONI has zero Iran measurements for github.io. Separately, GitHub's allowlist status flipped twice in 2026 - on 18 April, off 15 May.

**C14. The Iranian preferential-tariff gap is steeper than stated, and it is not a decision driver.** Filter.watch's November 2024 investigation puts domestic traffic at "3 to 4 times cheaper", i.e. domestic at one-quarter to one-third of international, not the claimed one-third to one-half (the "one-half" figure traces to a February 2018 report). The "hundreds of sites at half price" detail is unsupported and conflates two mechanisms. The ITO registry is real (~43k domains registered, IP-based rather than a curated list), but Iranian hosting vendors sell domestic hosting on latency and blackout resilience, not on the tariff, and VPN-tunnelled traffic bills at the international rate anyway. *Register for it - it is free and it helps - but do not present it as the reason to host domestically.*

**Also corrected in passing:** Iran-to-Europe latency measures ~70-97 ms from Iranian datacenter networks, not the claimed 90-120 ms band (which better describes consumer DSL and mobile, where last-mile adds 20-50 ms); most of it is plain distance, since Tehran to Frankfurt implies a ~45-55 ms floor. Domestic is ~2.5 ms, so the real gap is ~25-30x, larger than claimed. Liara is headquartered in **Qom**, not Tehran, its datacenter is "دیتاسنتر امین" in Qom province, and **its free tier is currently suspended** with an on-site banner citing international connectivity. ParsPack was founded in **2009**, not 2010, and IranServer's "free SSL on all plans" is third-party-reported, not vendor-stated. Every Iranian site checked self-hosts fonts, but Digikala uses **next/font**, whose Google path self-hosts Google Fonts at build time, so "zero Google Fonts references" is true of runtime hotlinks only.

---

## 11. Open questions for the shop owner

Ordered by how much they block the build.

### Blocking - the build cannot finish without these

**1. Product photography: what exists, at what resolution, and covering how many models?**
This is the critical path and nothing else comes close. The answer decides whether launch is four weeks or four months. If nothing usable exists, the next question is when a two-session shoot can happen with a permanent taped-down shooting station in the shop.

**2. Which 150 to 175 watches does he most want to sell?**
Do not ask "do you want all 1,000 on the site" - he will say yes, because more sounds better. Ask instead: *"Which 150 watches do you most want to sell? We will photograph those properly, and every brand page will say the full 1,000 are in the shop."* That reframes it as merchandising rather than omission and is the question that gets a useful answer.

**3. How does he give directions on the phone?** (Questionnaire item 18, left blank.)
Ekbatan is a maze of phases and numbered bazaarchehs. His own sentence will beat anything we compose. One sentence, and it is the difference between a customer arriving and giving up.

**4. Is Bale used? Is Telegram used?**
He answered only for WhatsApp. A dead messenger link is worse than none. Bale is the highest-value non-VPN channel and takes the same `09...` number, so if he uses it, it goes next to WhatsApp. If not, publish neither.

**5. Per-brand price bands: will he give fourteen "starts from" numbers?**
This is the compensation for the no-price decision and section 6.4 argues it is not optional. Fourteen numbers in one file. If he refuses, the site must communicate range some other way and the risk of "this shop is not for me" bounces goes up materially.

### Important - these change specific pages

**6. Q&Q: its own brand page, or nested under Citizen?**
Section 2.6 recommends its own page, because it is the affordable door and the Citizen relationship reinforces it rather than competing. Confirm. (Also confirm the questionnaire reading: OBAKU stocked **and** Q&Q additional, since answers 8 and 9 appear shifted by one line.)

**7. Which Iranian importer supplies each brand, and what warranty do they issue?**
Every authenticity claim on the site depends on this and none of it can be verified from outside. Known candidates: Positron for Casio, Zaman Avaran Pishro for Citizen, Aria Zaman for Timex, Prima Group for Obaku. Copy must read `گارانتی [نام شرکت]` precisely - overclaiming a manufacturer warranty is false and easy for a knowledgeable buyer to catch, which would undo the entire authenticity pitch.

**8. Does the shop offer installment purchase (خرید قسطی)?**
Several Iranian sellers lead with it in the Q&Q and Extri price band, and Snapp Pay appears on competitor sites. Its presence or absence changes the CTA block.

**9. Would he consider a public exchange or return window for in-shop purchases?**
Every competitor states one, always short and numeric (۷ روز, ۳۰ روز). The market has trained buyers to look for a number of days and its absence is conspicuous.

**10. Does he stock the premium tiers?** (Citizen Attesa/Series8, Seiko King Seiko/Astron, Casio MR-G/Oceanus.)
The collection taxonomy and price framing change materially if the range stops around $500.

**11. Are there real customer testimonials with names and dates?**
Ratings-as-trust is the one mechanism Basalam sellers have and no standalone Iranian watch site does. Real attributed quotes on a static page cost nothing and plug the gap every competitor has. Needs source material he is willing to stand behind.

### Verification tasks that need doing, not asking

**12. Confirm Persian transliterations before writing catalogue copy.**
Verified: سیکو، سیتیزن / سیتی زن (carry both), کاسیو، دنیل کلین، اسپریت، اوباکو، کیو اند کیو، تایمکس، گس، تامی هیلفیگر، اکستری، جولیوس. **Still needed: G-Shock (جی‌شاک assumed), CAT (کاترپیلار vs کت), plus Persian collection names** (پرومستر، سویوسا، پرزیج، پراسپکس، ادیفایس). These are the actual search terms and must be fixed before content is written.

**13. Research gap: Daniel Klein and CAT.** Neither had a dedicated research lane. One verification pass each before their brand pages are written: price band, collections, logo asset licensing, Iranian importer.

**14. Verify the Guess triangle red.** guess.com is unreachable from this environment and the Wikimedia SVG is monochrome black. Sample from a physical product, packaging, or the distributor's assets before it goes in the CSS.

**15. Run the image-pipeline probe in Phase 01.** 20 real photos through the real Astro pipeline, measured, multiplied. Do not plan against a guessed build time.

**16. Test the JSON-LD in the Rich Results Test** on a staging URL to confirm whether "Missing field price" on a priceless `Offer` reports as an error or a warning. Documented as deliberate either way, but confirm before launch.

**17. Verify Googlebot can reach the live site from a non-Iranian IP** after deploying to the Iranian host. If the host geo-blocks foreign traffic, the entire SEO effort is worthless and nobody will notice until months later.

**18. Test link previews by pasting a real product URL into WhatsApp and Telegram Saved Messages** before launch. Telegram's OG behaviour is empirical, not specified.

**19. Confirm Liara's current terms:** whether the free tier is still suspended, whether a custom domain with automatic Let's Encrypt SSL is included, and whether signup requires Hemmati's کد ملی and a Shetab card in person. The domain registration at IRNIC definitely does, and that is one session with him.

**20. Re-check the filtering status of WhatsApp, Instagram and Telegram immediately before launch.** Iran's block list shifts without notice in both directions and it determines which secondary links are worth showing.

---

*End of dossier. Source files: `CLIENT-PROFILE.md`, `CATALOGUE-SCALE.md`, `COMPETITORS.md`, `PERSIAN-MARKET-INTEL.md`, `VERIFIED-FINDINGS.md`, `LOGO-GEOMETRY.md`.*
