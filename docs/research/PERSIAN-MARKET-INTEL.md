# Persian Market Intel - pulled live from Torob and Neshan

Captured first-hand on 2026-08-24 via real Chrome. Torob (`torob.com`) is Iran's dominant
price-comparison engine and is where a large share of Persian product searches actually
land, so its taxonomy is a good proxy for how Iranians think about buying a watch.

---

## 1. Persian brand transliterations (critical for SEO)

Iranians search in **Persian script**, not Latin. A site that only ever writes "SEIKO" is
invisible to the query `قیمت ساعت سیکو`. Confirmed spellings as used by Torob:

| Latin | Persian | Notes |
|---|---|---|
| Seiko | سیکو | |
| Citizen | سیتی زن / سیتیزن | **both spacings occur** - carry both as keywords |
| Casio | کاسیو | |
| Daniel Klein | دنیل کلین | confirmed as a real Iranian-market brand |
| Rolex | رولکس | |
| Naviforce | نیوی فورس | |
| Romanson | رومانسون | |

**Rule for the build:** every brand page needs the Persian name in the `<h1>` or `<title>`
and the Latin name alongside it, wrapped in `<bdi>` so the bidi algorithm does not scramble
the line. Persian name for discovery, Latin name for recognition on the dial.

NEEDS RESEARCH: confirmed Persian spellings for Timex, Guess, Tommy Hilfiger, Esprit,
Extri, Julius, CAT, Obaku, G-Shock. Do this before writing catalogue copy.

## 2. How Iranians actually filter watches

Torob's live filter set, in its own order:

1. **قیمت** - price range, in toman
2. **برند** - brand
3. **جنسیت** - gender: `زنانه` women, `مردانه` men, `دخترانه` girls, `پسرانه` boys, `بچگانه` children
4. **فرم صفحه نمایش** - **case shape**: `دایره` circle, `مربع` square, `مستطیل` rectangle, `بیضی` oval
5. **نو / کارکرده** - new vs used
6. **فقط موجودها** - in stock only
7. **امکان خرید حضوری** - **"in-person purchase available"**

Three of these are not what a Western watch site would predict:

- **Case shape is a first-class filter in Iran.** Western retailers filter by case
  *diameter*; Iranians filter by *shape*. The product schema must carry a `caseShape`
  field, and the catalogue should offer it as a filter.
- **Kids' watches are a real, separately-named category.** `دخترانه` and `پسرانه` are
  distinct from `بچگانه`. If the shop stocks them, they deserve their own browse entry.
- **"In-person purchase available" is a filter people use.** Iranian buyers actively
  look for a physical shop they can walk into. This is direct evidence that Hooman's
  greatest asset - a real address, fifteen years old - is something buyers filter *for*.
  It should be stated loudly, not buried in a footer.

## 3. Observed Iranian market prices for Seiko

Live Torob listings, "from" prices in toman:

| Model | From | Sellers |
|---|---|---|
| Seiko SSK003K1, steel bracelet | ۲۵٬۵۰۰٬۰۰۰ | 18 shops |
| Seiko SRPE45J1, leather | ۲۸٬۵۰۰٬۰۰۰ | 5 shops |
| Seiko SSA405J1, leather | ۹۵٬۰۰۰٬۰۰۰ | 4 shops |
| Seiko SRPB46J1, leather | ۱۰۶٬۹۹۳٬۰۰۰ | 8 shops |

A roughly **4× spread** across four models of one brand, and the same model varies between
shops. **This validates the "call for price" decision.** Published prices in this market go
stale fast and invite arguments; a phone call lets the shop quote today's number and open a
conversation. Keep prices off the site.

It also sets expectations for the design: these are **serious purchases**, 25 to 107 million
toman. The site has to look worth that much money. This supports the dark-vitrine direction
over anything that reads as a discount storefront.

## 4. Torob is a search competitor, not just a marketplace

The page title for the Seiko query is `لیست قیمت روز ساعت مچی سیکو | ترب` - "today's price
list for Seiko watches". Torob owns the high-intent Persian price queries and will be hard
to outrank on them.

**Strategic consequence:** do not fight Torob on `قیمت ساعت سیکو` (Seiko price). Win instead
on queries Torob structurally cannot serve:

- `نمایندگی رسمی سیکو تهران` - official Seiko dealer, Tehran
- `گالری ساعت اکباتان` - watch gallery, Ekbatan
- `خرید ساعت اصل تهران` - buy authentic watches, Tehran
- `تعمیر ساعت اکباتان` - watch repair, Ekbatan (if the shop offers it)

These are **dealer-authority and neighbourhood queries**. A price aggregator has no answer
to them, and Hooman's official-dealer status plus fixed address is precisely the answer.
This is the SEO strategy: do not compete on price, compete on authenticity and locality.

## 5. Neshan has no listing for the shop

Searching Neshan (`neshan.org`, Iran's main domestic mapping service) for
`گالری ساعت هومن` returns **no business result**.

Combined with the absent Google Business Profile, the shop currently has **no verified
presence on any map**. Two cheap wins that need no code:

1. Register the business on **Neshan** and **Balad** (`balad.ir`).
2. Ship `LocalBusiness` JSON-LD on the site so the data is machine-readable from day one.

Neshan also renders its own map over OpenStreetMap data and serves a Persian UI, making it
the correct embed for an Iranian audience - Google Maps embeds are an unreliable dependency
for visitors inside Iran.

## 6. Dark UI has precedent in Iranian commerce

Torob's own product pages render on `rgb(21, 32, 43)`, a dark navy-slate. Worth noting
because it shows the chosen dark-vitrine direction is **not alien to Iranian users** - the
country's main price-comparison engine already ships a dark interface. The concern that a
dark site would feel unfamiliar to this audience is not supported.

Digikala, by contrast, is white with `IRANYekan`. So both conventions exist and the choice
is genuinely open.

---

## 7. Q&Q - confirmed Persian name and a merchandising insight

Researched directly on 2026-08-24 after the owner added Q&Q to the roster and confirmed it
should stand alone as its own brand.

**Persian name: `کیو اند کیو`** (three words, spaced).

Codepoints verified character by character - it uses **Persian keheh `ک U+06A9`** and
**Persian yeh `ی U+06CC`** throughout, with no Arabic `ك U+0643` or `ي U+064A`. Safe to use
as-is in the index and in page titles.

Confirmed in use by Digikala (`خرید و قیمت محصولات برند کیو اند کیو | دیجی کالا`) and by
multiple Iranian watch retailers. Latin form is written `Q&Q`.

### What the search results establish

- Q&Q is **زیر مجموعه برند سیتیزن** - a Citizen sub-brand. Iranian sellers say this openly
  and use it as a trust signal, which is useful: Hooman is a **certified Citizen reseller**,
  so the Citizen relationship reinforces the Q&Q page rather than competing with it.
- Japanese brand (`برند ژاپنی`), assembled in China and Thailand. Iranian listings state this
  plainly rather than hiding it.
- There is a **Superior line** (`لاین سوپریور`) worth carrying as a collection name.
- Reference formats seen in the wild: `Q&Q S21A-00`, `VQ66J001Y`. Standard alphanumeric, keep
  in ASCII per the normalisation rule.

### The merchandising insight

Observed Iranian price band for Q&Q: **۸۰۰ هزار تا ۳ میلیون تومان** (800,000 to 3,000,000
toman).

Set that against the Seiko band recorded in section 3 of this file: **۲۵ تا ۱۰۷ میلیون
تومان**. That is roughly a **30x spread across the shop's own range.**

**Q&Q is the affordable door into the shop**, and that matters more than its unit margin. A
visitor who assumes a "certified Seiko dealer" is out of their price range never phones. A
catalogue that visibly spans 800,000 to 100,000,000 toman tells them there is something here
for them.

Concrete consequences for the build:

1. **Do not merchandise only the expensive pieces.** Within every brand, show entry, mid and
   halo models. A catalogue that shows only the top of the range reads as "not for me".
2. **Q&Q and the other value brands earn real placement**, not a footnote. They are the
   widest part of the funnel.
3. Since the site publishes **no prices**, range has to be communicated some other way -
   through the brands carried, the variety visible in the grid, and the copy. This is a
   genuine cost of the no-price decision and the design has to compensate for it deliberately.
