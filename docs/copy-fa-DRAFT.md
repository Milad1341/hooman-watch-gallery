# Persian Copy - first draft of the strings that carry the positioning

**Status: draft for the owner to approve.** This is not the full Phase 03 copy deck. It
covers only the highest-stakes strings - the ones where the positioning either lands or does
not. Everything else can be written once these are agreed.

**Rules applied throughout:**
- Trust copy names a mechanism and an actor, never an adjective. No `۱۰۰٪ اورجینال`.
- Headlines are countable facts, not slogans. Numbers are checkable; adjectives are not.
- Persian digits ۰-۹ everywhere. Zero em-dashes. ZWNJ (نیم‌فاصله) preserved.
- Latin brand names go in `<bdi>` when they sit inside a Persian sentence.

---

## 1. Hero

**Headline** (2 lines max)

```
۱۶ سال در اکباتان.
نمایندگی رسمی سیکو، سیتیزن و کاسیو.
```
*16 years in Ekbatan. Certified reseller of Seiko, Citizen and Casio.*

Two checkable facts, no adjectives. The years and the dealer status are the only two things
a competitor cannot copy, so they go first.

**Subtext** (≤ 20 words)

```
بیش از ۱۰۰۰ مدل ساعت در مغازه موجود است.
برای قیمت و موجودی تماس بگیرید یا حضوری تشریف بیاورید.
```
*Over 1,000 watch models in the shop. Call for price and availability, or visit us.*

Does three jobs at once: signals range, sets the no-price expectation before anyone hunts
for a cart, and makes both the call and the visit feel like the intended next step.

**Primary CTA**

```
تماس با گالری  ۰۲۱-۴۴۶۹۷۳۰۹
```

Number printed in the button, not hidden behind a label. `href="tel:+982144697309"`, ASCII.

**Secondary CTA**

```
دیدن مجموعه
```

---

## 2. The "how buying works" strip

Sits directly under the hero. Its job is to stop people looking for a cart and bouncing.

```
خرید حضوری است

قیمت‌ها روی سایت نیست، چون بازار روزانه تغییر می‌کند.
مدلی که می‌پسندید را ببینید، بعد زنگ بزنید تا قیمت و موجودی امروز را بگوییم.
```
*Buying is in person. Prices are not on the site, because the market changes daily. Find a
model you like, then call and we will tell you today's price and availability.*

**This paragraph is doing more work than any other on the site.** It converts the biggest
weakness of the no-price decision into a reason to trust the shop: the price is missing
because it is honest, not because it is hidden. Get the owner to approve this wording
specifically.

**Hours block, beside it:**

```
هر روز هفته
۱۱:۰۰ تا ۱۴:۰۰  و  ۱۷:۰۰ تا ۲۲:۰۰
```

Hours are the single most common reason someone phones a shop. Answering before they ask
saves the call for a real question.

---

## 3. Trust block

```
چرا از ما بخرید

نمایندگی رسمی سیکو، سیتیزن، کاسیو و جی‌شاک
ما فروشنده‌ی مجاز این برندها هستیم. ساعتی که می‌خرید از مسیر رسمی وارد شده است.

گارانتی از طرف برند
گارانتی هر ساعت از سوی نمایندگی همان برند در ایران ارائه می‌شود، نه از طرف مغازه.

از سال ۱۳۸۹ در یک آدرس
شانزده سال است در همین بازارچه هستیم. اگر مشکلی پیش بیاید، می‌دانید کجا پیدایمان کنید.

تعمیر و تعویض باتری
ساعت را همین‌جا تعمیر می‌کنیم. برای ساعت‌هایی که از ما نخریده‌اید هم انجام می‌دهیم.
```

*Why buy from us. Certified reseller of Seiko, Citizen, Casio and G-Shock - we are an
authorised seller for these brands; the watch you buy came through the official channel.
Warranty from the brand - each watch's warranty is provided by that brand's representative
in Iran, not by the shop. At one address since 1389 - sixteen years in this same bazaarcheh;
if something goes wrong, you know where to find us. Repairs and battery replacement - we
repair here, including watches you did not buy from us.*

Every line names a mechanism and an actor. None of them is an adjective.

**«اگر مشکلی پیش بیاید، می‌دانید کجا پیدایمان کنید»** *(if something goes wrong, you know
where to find us)* is the strongest sentence available to this business. It is the exact
thing an online seller cannot say, and it speaks directly to the counterfeit anxiety without
ever using the word.

**«برای ساعت‌هایی که از ما نخریده‌اید هم انجام می‌دهیم»** *(we also repair watches you did
not buy from us)* is generous, cheap, and brings strangers through the door. Repairs are how
a first-time visitor becomes a customer.

⚠️ Confirm ۱۳۸۹ is the right Shamsi year for 2010, and that the owner is comfortable stating
it.

---

## 4. Per-brand page opener

Template, with Seiko as the example:

```
ساعت سیکو اصل
نمایندگی رسمی

مدل‌های سیکو موجود در گالری را اینجا می‌بینید.
بیش از ۱۰۰۰ مدل از برندهای مختلف در مغازه داریم؛ برای دیدن همه تماس بگیرید یا حضوری بیایید.
```

The second line is the one that must appear on **every** brand page. It reframes a curated
catalogue from an omission into an invitation, and it is true.

For brands where the shop is **not** a certified reseller, drop the `نمایندگی رسمی` line
entirely. Never imply it.

---

## 5. Product page

```
موجود در مغازه            in stock
تماس برای قیمت            call for price
کد محصال: SRPB41J1        reference
نگه‌داشتن برای من          hold this for me
```

⚠️ Typo to fix before use: `کد محصال` should be **`کد محصول`**.

**Pre-filled message for the call and WhatsApp CTA:**

```
سلام، از سایت گالری ساعت هومن تماس می‌گیرم.
درباره‌ی {model} با کد {reference} سوال داشتم.
موجوده؟ قیمتش چنده؟
```

Carries both questions an Iranian buyer actually has, and opens the conversation on a
specific watch rather than a general enquiry.

---

## 6. Words to avoid

| Do not write | Why |
|---|---|
| ۱۰۰٪ اورجینال / تضمین اصالت | Unbacked superlatives are what counterfeit sellers write, so they now signal the opposite |
| بهترین قیمت | Cannot be substantiated, and the site has no prices |
| فروشگاه معتبر | An adjective with no mechanism behind it |
| نماینده انحصاری / وارد کننده | **Factually wrong.** They are a certified reseller, not a distributor |

---

## Open questions for the owner

1. Approve the `خرید حضوری است` paragraph. It is the most important wording on the site.
2. Confirm ۱۳۸۹ as the founding year in the Shamsi calendar.
3. Is he comfortable with **Hemmati** named on the page? A named person converts better and
   no competitor can copy it.
4. Confirm the repairs line, including repairing watches bought elsewhere.
