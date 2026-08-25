# Competitor Teardown - verified first-hand

Checked 2026-08-24 via real Chrome and direct `openssl` / `curl` probes. The two named
competitors came from the client. Probes were run from outside Iran, which is noted where
it affects the reading.

---

## The competitive set

| Site | What it is | TLS | Verdict |
|---|---|---|---|
| **irantimer.com** | Full e-commerce, luxury tier, content studio | Certum DV, valid to 2026-12-23 | **The real competitor** |
| **ttbol.ir** | "فروش انواع برندهای اصل" | **HTTPS never answers** | Effectively broken |
| watchstore.ir | Watch retail | **Self-signed `CN=localhost`** | Browser blocks it |
| iwatch.ir | Watch retail | **Self-signed `CN=moeini`** | Browser blocks it |
| torob.com | Price aggregator | Certum DV, valid | Search competitor, not a shop |

---

## 1. IranTimer - the one to take seriously

`ایران تایمر | خرید و فروش ساعت مچی زنانه و مردانه اورجینال`

A genuinely well-funded operation. What they have:

- **Full e-commerce**: cart, order tracking (`پیگیری خرید`), wishlist, accounts, a loyalty
  programme (`آی-کلاب / باشگاه مشتریان`), after-sales service (`خدمات پس از فروش`).
- **A custom font named after themselves** - `font-family: IranTimer, Tahoma, Arial`.
- **Original video content**: factory tours of Swiss brands (Cover Watches, Cornavin),
  filmed on location in Switzerland, plus a recorded interview with a brand director.
- **An editorial blog** with real long-form articles (e.g. a Baby-G buying guide).
- **Industry recognition** - a post about being honoured at a watch-trade gathering.
- Published prices with aggressive discounting: 40% and 25% markdowns, items from
  ۱۰٬۱۰۸٬۲۰۰ to ۱۰۸٬۹۷۹٬۰۰۰ تومان.
- Categories beyond watches: `ساعت لاکچری` luxury, `عینک` eyewear, `زیورآلات` jewellery.
- Phone in the header: `tel:02171400010`, shown as ۰۲۱ - ۷۱۴ ۰۰۰ ۱۰.
- Telegram and Instagram linked from the header.

### The strategic conclusion

**Hooman must not try to be a smaller IranTimer.** IranTimer will win on catalogue breadth,
price, content budget, and logistics. Competing there means losing slowly.

What IranTimer structurally cannot offer:

- A **named human** you phone and talk to.
- A **fixed address you can walk into**, in your own neighbourhood, that has been there
  fifteen years.
- **Official-dealer status for Seiko, Citizen and Casio**, stated plainly.

That is Hooman's entire wedge, and it is a good one. The site should feel like *a specific
shop run by a specific person in Ekbatan*, not like a smaller online store. Every design
and copy decision follows from that.

Their discounting also settles the pricing question for good. A 40%-off war is unwinnable
for a neighbourhood dealer. **Do not publish prices** - compete on trust and proximity.

### Two weaknesses worth taking

1. **No `dir` attribute on `<html>`.** They set `lang="fa"` but never `dir="rtl"`, so RTL is
   patched in CSS. Fragile, and it degrades for screen readers and text selection.
2. **Their CSS font stack contains a typo: `Arail`.** A misspelled fallback that silently
   never resolves. Small, but it shows the polish ceiling is lower than the budget suggests.

Also worth noting: their Certum certificate is a **6-month manual** cert expiring
2026-12-23. Someone has to remember to renew it. Let's Encrypt auto-renewal is genuinely
lower-maintenance.

---

## 2. ttbol.ir - force-redirects visitors into a dead end

Probed directly:

```
dig  ttbol.ir        -> 195.28.168.42     (Iranian range)
curl http://ttbol.ir -> 301 https://ttbol.ir/   in 0.46s
curl https://ttbol.ir -> connection timed out after 20s (never connects)
```

The server answers on port 80 quickly, **301-redirects every visitor to HTTPS, and port 443
never accepts a connection.** The redirect sends people somewhere that does not respond.

Caveat, stated honestly: probed from outside Iran. Port 443 may be filtered at the border
or geo-blocked, so the site may work for domestic visitors. But it is unreachable for
anyone outside, including Iranians abroad buying gifts for family - a real segment for a
watch shop.

---

## 3. watchstore.ir and iwatch.ir - self-signed certificates

| Domain | Issuer | Subject |
|---|---|---|
| watchstore.ir | `CN=localhost` | `CN=localhost` |
| iwatch.ir | `CN=moeini` (2021-2031) | `CN=moeini` |

Both produce Chrome's full-page red interstitial: *"Attackers might be trying to steal your
information."* `CN=localhost` is a default development certificate that was never replaced.
`CN=moeini` appears to be a person's name.

---

## The pattern, and what it is worth

**Four of the five watch retail domains checked have a broken or absent HTTPS story.** Only
IranTimer - the largest and best funded - has a certificate that works.

For a buyer already anxious about counterfeits, being told by their own browser that a
watch shop cannot be trusted is fatal. And the fix costs nothing.

> **A correctly configured, auto-renewing Let's Encrypt certificate puts Hooman ahead of
> three of its four direct competitors on the single trust signal every visitor's browser
> checks automatically, before a word of copy is read.**

This is the cheapest competitive advantage in the project. It is also fragile in exactly one
way: **if renewal is manual, it becomes a competitor's weakness instead of ours.** Automatic
renewal is a hard requirement, per `CLAUDE.md` §3.1.

---

## Category taxonomy learned from competitors

Both IranTimer and Torob expose categories that a Western watch site would not predict:

- **`ست` - couple / matching sets.** IranTimer gives this equal billing with `مردانه` and
  `زنانه`. Matching his-and-hers watches are a major gifting category in Iran. **Hooman's
  catalogue needs it**, and it deserves a browse entry, not a tag.
- **`فرم صفحه نمایش` - case shape** (circle, square, rectangle, oval). Iranians filter by
  shape where Westerners filter by diameter.
- **Kids' categories are split by gender**: `دخترانه` girls, `پسرانه` boys, `بچگانه` children.
- **`دریافت حضوری` / `امکان خرید حضوری` - in-person collection.** Both sites surface this.
  Direct evidence that Iranian buyers actively look for a shop they can visit, which is
  Hooman's strongest asset and should be stated loudly rather than buried.

## Persian keyword signal

`اورجینال` (original / authentic) appears in IranTimer's own page title. Authenticity is the
category's core keyword and everyone is fighting for it. Hooman can outrank on the sharper,
lower-competition variants its dealer status actually earns:

- `نمایندگی رسمی سیکو` - official Seiko representative
- `نمایندگی رسمی سیتیزن` - official Citizen representative
- `نمایندگی رسمی کاسیو` - official Casio representative
- `گالری ساعت اکباتان` - watch gallery, Ekbatan
- `خرید ساعت اصل تهران` - buy authentic watches, Tehran

These are dealer-authority and neighbourhood queries. Neither an aggregator nor a national
retailer can answer them credibly.
