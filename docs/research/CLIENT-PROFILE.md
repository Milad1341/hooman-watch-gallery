# Client Profile - گالری ساعت هومن / Hooman Watch Gallery

Facts below come from the shop's live Instagram and Maps pin (2026-08-24), plus **the
owner's answers to the Phase 00 questionnaire**. Answers are marked ✅. Remaining gaps are
marked ⚠️.

Source: `https://www.instagram.com/hooman_watchgallery/` and `docs/OWNER-QUESTIONS-fa.md`

---

## Identity

| Field | Value |
|---|---|
| Persian name | گالری ساعت هومن |
| Latin name | Hooman Watch Gallery |
| Instagram | `@hooman_watchgallery` |
| Followers / Posts | 1,365 / 1,277 |
| **Trading since** | ✅ **2010** (16 years as of 2026) |
| **Contact person** | ✅ **Hemmati** (آقای همتی) |

1,277 posts against 1,365 followers is the core business fact: years of work, almost no
reach. The site turns that effort into something findable.

## Opening hours ✅

**Open all seven days. Split shift, no closing day.**

| | |
|---|---|
| Morning | ۱۱:۰۰ - ۱۴:۰۰ |
| Evening | ۱۷:۰۰ - ۲۲:۰۰ |

Closed 14:00-17:00 daily.

**Build note:** this needs **two `openingHoursSpecification` entries per day**, not one.
A single 11:00-22:00 range would be wrong and would send customers to a closed shop during
the afternoon break. Since hours are identical every day, one pair of entries covering
`Monday` through `Sunday` is enough.

**This is also the highest-value fact on the site.** Checking opening hours is the single
most common reason people phone a retail shop (56-63%). Putting it above the fold answers
the question before it becomes a wasted call.

## The positioning - wording corrected by the owner ✅

Their Instagram bio says **نمایندگی رسمی سیکو، سیتیزن، کاسیو**.

**The owner clarified: they are a certified reseller, not a distributor.**

This matters and constrains the English copy:

| Write in English | Do NOT write |
|---|---|
| Certified reseller | Official distributor |
| Authorised retailer | Sole agent / exclusive importer |
| Certified dealer for Seiko, Citizen, Casio | Official representative of Seiko in Iran |

The **Persian** wording stays as the shop already uses it - نمایندگی رسمی is their own
established claim and they own it. The **English** must be accurate, because overclaiming a
trademark relationship is a real legal risk on a site whose entire purpose is trust.

✅ **Dealer status covers Seiko, Citizen, Casio, and G-Shock.**

✅ **Certification documents exist**, but the owner considers them unimportant and does not
want them featured. **Dropped from the plan.** Do not build a certificate-photo section.

## Warranty ✅

**Warranty comes from the brand, not the shop.** Copy must say so precisely: warranty is
provided by the brand's Iranian representative, and the shop is where you buy and where you
bring it. Never imply the shop underwrites it.

## Services ✅

**Repairs and battery replacement: yes.**

This confirms `/repairs` as a real page. `تعمیر ساعت` is a high-intent, low-competition
Persian search term and, combined with `تعمیر ساعت اکباتان`, this page may convert better
than the catalogue. Promote it from "only if confirmed" to a definite deliverable.

## Brands ✅ - now fourteen

Confirmed roster, with two additions from the owner:

| Brand | Dealer status | Notes |
|---|---|---|
| **SEIKO** | ✅ certified reseller | priority |
| **CITIZEN** | ✅ certified reseller | priority |
| **CASIO** | ✅ certified reseller | priority |
| **G-SHOCK** | ✅ certified reseller | merchandised separately from Casio |
| **TIMEX** | | priority |
| **Q&Q** | | ⚠️ **new** - see note |
| **OBAKU** | | ✅ confirmed stocked |
| EXTRI | | |
| JULIUS | | |
| GUESS | | |
| ESPRIT | | |
| TOMMY HILFIGER | | |
| CAT (Caterpillar) | | |
| DANIEL KLEIN | | |

✅ **Priority brands for merchandising: SEIKO, CITIZEN, CASIO, TIMEX.** These lead the
homepage and get the most catalogue depth.

**Note on Q&Q:** the owner listed it as an addition. Q&Q is **Citizen's value sub-brand**,
which fits a shop that is already a certified Citizen reseller. Worth confirming whether
they want it presented as its own brand (like G-Shock) or nested under Citizen.

⚠️ The answers to questions 8 and 9 appear shifted by one line, so the reading above is
"OBAKU is stocked **and** Q&Q is an additional brand". Worth a one-line confirmation.

## Catalogue scale ✅ - and this changes the architecture

✅ **Roughly 1,000 distinct models in stock.**

This is far beyond the 50-300 the plan assumed and it invalidates several decisions. See
`docs/research/CATALOGUE-SCALE.md` for the full analysis and the recommendation.

Also confirmed:
- ✅ **Couple sets (ست): yes**
- ✅ **Kids' watches (دخترانه / پسرانه): yes**

## Contact ✅

| Channel | Number | Role |
|---|---|---|
| **Landline** | ۰۲۱-۴۴۶۹۷۳۰۹ | ✅ **primary** - lead with this |
| Mobile 1 | ۰۹۱۲-۳۴۷-۰۸۸۹ | ✅ **WhatsApp is on this number** |
| Mobile 2 | ۰۹۳۹-۹۱۴-۱۴۹۷ | secondary |

✅ Owner wants **all three published**, with 021 as the primary.

```
tel:+982144697309          primary, ASCII E.164
tel:+989123470889
tel:+989399141497
https://wa.me/989123470889?text=...      98 prefix, NO leading 0
https://ble.ir/09123470889               leading 0, NO +98  (⚠️ confirm Bale is used)
```

⚠️ **Bale and Telegram not confirmed.** The owner answered only for WhatsApp. Ask before
publishing a Bale link - a dead messenger link is worse than none.

✅ **Email:** none yet, will be created with the domain.

## Location

- تهران، شهرک اکباتان، فاز یک، بازارچه شماره ۱۰، پلاک ۳
- 35.712130, 51.312458
- ✅ **Parking available nearby**
- Their Maps link is a **dropped pin, not a business listing** - no name, hours, photos or
  reviews exist anywhere on the open web.

⚠️ **Question 18 was left blank: how he gives directions on the phone.** Still needed.
Ekbatan is a maze of phases and numbered bazaarchehs, and his own sentence will beat
anything we compose. Ask again - it is one sentence and it is the difference between a
customer arriving and giving up.

## Domain ✅

**Not yet registered. Owner wants a `.ir` domain.** Correct choice - it is eligible for
Iran's preferential-tariff registry, which makes the site materially cheaper for customers
to browse on mobile data.

## Assets

- Logo: supplied. See `LOGO-GEOMETRY.md`.
- ⚠️ **Product photography: owner will send later.** This is now the critical path - see
  `CATALOGUE-SCALE.md`.
- Shopfront photography: none yet. Should be shot. A real photo of a real shop, and of
  Hemmati behind the counter, is the strongest authenticity signal available.

## Remaining gaps

1. ⚠️ **Directions from a landmark** (question 18, left blank).
2. ⚠️ **Bale / Telegram** - used or not?
3. ⚠️ **Q&Q** - own brand, or nested under Citizen?
4. ⚠️ **Photography** - what exists, at what resolution, and how many models are covered.
