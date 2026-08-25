# Phase 00 - Owner Intake

> ## STATUS: MOSTLY ANSWERED (2026-08-24)
>
> The owner answered 19 of 21 questions. Answers are recorded in
> `docs/research/CLIENT-PROFILE.md` and propagated into `CLAUDE.md`.
>
> **Four gaps remain, none blocking Phase 01:**
> 1. **Directions from a landmark** (Q18, left blank). One sentence, and it is the
>    difference between a customer arriving and giving up in Ekbatan. Ask again.
> 2. **Bale / Telegram** - used or not? Do not publish a dead messenger link.
> 3. **Q&Q** - own brand like G-Shock, or nested under Citizen?
> 4. **Photography** - what exists, at what resolution, covering how many models.
>
> **The answer that changed the plan: ~1,000 models in stock**, not 50-300. See
> `docs/research/CATALOGUE-SCALE.md`. Phase 01 may proceed; Phase 03 must not start until
> the catalogue scope is agreed.

**Goal:** get the facts only the shop owner has, before any of them can block a later phase.

**Why this is first:** every later phase has at least one dependency here. Discovering in
Phase 05 that OBAKU is discontinued means rebuilding a brand page. Discovering at launch
that there is no domain means the site sits on a laptop. This phase costs one phone call
and removes most of the project's rework risk.

**Nothing here needs the owner to be technical.** These are all questions about his own shop.

---

## The questions

Ask in Persian, in one sitting. Record answers directly into
`docs/research/CLIENT-PROFILE.md`, replacing each `NEEDS CONFIRMATION` marker.

### A. Trading facts

1. **Opening hours**, per day, including the weekly closing day and any afternoon break.
   Needed verbatim for `openingHoursSpecification` JSON-LD, and because "are you open now"
   is the most common reason a call is wasted.
2. **Exactly how long trading?** The bio says 15+ years. A specific founding year is a
   stronger claim than "over 15 years" and reads as checkable rather than rounded.
3. **Do they service, repair, or change batteries?** `تعمیر ساعت` is a high-intent Persian
   search term with far less competition than `خرید ساعت`. If yes, it earns its own page
   and may become the highest-converting page on the site.
4. **What warranty is offered**, and by whom - the shop, or the brand's Iranian
   distributor? Trust copy must name a mechanism and an actor, never an adjective.

### B. The dealer claim - highest priority

5. **What exactly does نمایندگی رسمی mean here?** A formal distribution agreement, or
   authorised-retailer status? The English wording must be accurate; overclaiming a
   trademark relationship is a real legal risk and the wrong risk to take on a trust site.
6. **Is there a certificate, dealer card, or letter that can be photographed?** A
   photograph of a real document is worth more than any amount of design.
7. **Which brands does the official status cover?** Bio says Seiko, Citizen, Casio. Confirm
   whether it extends to G-Shock separately, or to any others.

### C. Catalogue scope

8. **Confirm the brand list.** From their Instagram highlights: SEIKO, CITIZEN, CASIO,
   G-SHOCK, TIMEX, EXTRI, JULIUS, GUESS, ESPRIT, TOMMY HILFIGER, CAT, DANIEL KLEIN.
   - **Is OBAKU still stocked?** It was in the original brief but appears nowhere on the
     profile.
   - Anything else carried that is not listed?
9. **Roughly how many distinct models are in stock at once?** This sets the catalogue
   architecture. Under ~60 is one page with filters; 300 needs per-brand pages and a
   different navigation model.
10. **Do they stock `ست` (matching couple sets)?** IranTimer gives this equal billing with
    men's and women's, and it is a major gifting category in Iran.
11. **Do they stock kids' watches** (`دخترانه` / `پسرانه` / `بچگانه`)?
12. **Which watches are the ones they most want to sell?** The site should merchandise the
    shop's actual priorities, not an arbitrary alphabetical dump.

### D. Contact

13. **Which of the three numbers is the one to call?** The site should have one obvious
    primary, not three equal options.
14. **Which number takes WhatsApp, and which takes Telegram?** The 📲 emoji on
    ۰۹۳۹-۹۱۴-۱۴۹۷ conventionally signals a messaging app.
15. **Is there an email address?** Optional, but needed for `LocalBusiness` JSON-LD.
16. **Who answers the phone, and what is their name?** A named human on the page converts
    better than an anonymous shop, and this is the one thing no competitor can copy.

### E. Practical

17. **Is a domain already registered?** If not, decide `.ir` vs `.com` in Phase 08.
18. **Landmark directions.** Ekbatan is a maze of phases and numbered bazaarchehs. A pin is
    not enough. Ask how he tells a customer to find the shop on the phone, and write that
    down verbatim - that sentence is better than anything we would compose.
19. **Is there parking, and where?**
20. **Do they have original product photos** at higher resolution than Instagram, or does
    everything need reshooting? This determines the whole of Phase 04.

---

## Also do in this phase

- **Register the business on Neshan and Balad.** Verified: no Neshan listing exists, and
  the Google Maps link is a bare dropped pin with no business attached. Both registrations
  are free, need no code, and start their indexing delay running now rather than at launch.

---

## Definition of done

- [ ] Every `NEEDS CONFIRMATION` in `docs/research/CLIENT-PROFILE.md` is resolved or
      explicitly marked "owner does not know / not applicable".
- [ ] Final brand list agreed and written down.
- [ ] Opening hours captured in a form that can go straight into JSON-LD.
- [ ] The dealer-status wording is agreed **in both Persian and English**, and the owner has
      approved the English.
- [ ] Landmark directions captured verbatim in Persian.
- [ ] Primary phone number chosen; WhatsApp and Telegram numbers identified.
- [ ] Neshan and Balad listings submitted.
- [ ] A decision recorded on whether existing photography is usable.

## Do not

- Do not start Phase 01 before the brand list is final. It determines the routing.
- Do not write any dealer-status copy in English until question 5 is answered.
