# Phase 08 - Launch and Handover

**Goal:** get it live on a host the shop's own customers can reach, and leave the owner able
to keep it running without a developer.

**The handover is the deliverable.** A beautiful site the owner cannot update is a site that
is wrong within six months. Budget real time for this phase.

---

## 1. Domain

Decide with the owner in Phase 00.

**`.ir`** - registered through IRNIC. Requires Iranian identity documents. Cheap, signals a
domestic business, and eligible for Iran's **preferential-tariff registry**: the Information
Technology Organization of Iran maintains a whitelist of domains on domestic hosting that
are served to visitors at roughly half the international data rate.

**`.com`** - more familiar, but an Iranian buyer needs a registrar that serves Iranian
customers and a payment method that works, both of which are genuine friction.

**Recommendation: `.ir` on domestic hosting**, and register for the preferential tariff. The
site is image-heavy and Iranian mobile data is expensive; domestic traffic is priced at
roughly one third to one half of international. **This makes the site materially cheaper for
the customer to browse**, which is a real conversion factor in this market, not a technical
footnote.

## 2. Hosting

**Primary: Liara (`liara.ir`), inside Iran.** Per `CLAUDE.md` §3.1. Tehran-based, rial
billing, no sanctions exposure for the owner, and its docs include a per-framework Astro
guide. The deploy is literally *zip the `dist/` folder and drag it into the console* - a
step the owner can be taught in five minutes.

**Mirror: GitHub Pages.** GitHub holds an actual OFAC licence for Iran (Jan 2021) covering
commercial use, and appeared on Iran's own 2026 allowlist when most foreign platforms did
not. It is the only foreign static host that is both legal for the owner and reachable.

If the mirror is used, **every asset must be served from the Pages origin.** Never reference
`raw.githubusercontent.com` - it is DNS-poisoned inside Iran and will hang while `github.io`
works.

**Do not use:** Vercel · Netlify · Render · Firebase · Cloudflare in the critical path ·
ArvanCloud (OFAC-designated). Reasons in `CLAUDE.md` §3.1.

## 3. TLS - the competitive advantage, and it must be automatic

Four of five competitor watch domains checked have broken HTTPS: `watchstore.ir` and
`iwatch.ir` ship self-signed certificates, and `ttbol.ir` redirects every visitor to a port
443 that never answers. Only IranTimer has a working certificate, and theirs is a **6-month
manual** cert someone has to remember to renew.

- [ ] **Let's Encrypt with automatic renewal.** `basalam.com` proves Let's Encrypt issues to
      Iranian sites.
- [ ] Verify renewal actually runs. **A manual certificate turns our advantage into our
      weakness in ninety days** - which is exactly what happened to the competitors.
- [ ] HTTP redirects to HTTPS **and HTTPS answers.** Test both, from two networks. This is
      precisely the failure `ttbol.ir` is shipping right now.
- [ ] Set a calendar reminder to check the certificate at 60 days regardless of automation.

## 4. Pre-launch gate

Nothing ships until all of these pass:

- [ ] Phase 07 fully green.
- [ ] **Loads from inside Iran on mobile data, confirmed by a real person.**
- [ ] **Loads from outside Iran** - otherwise Googlebot never indexes it.
- [ ] Certificate valid, chain complete, auto-renewal confirmed.
- [ ] `tel:` dials from a real Iranian handset.
- [ ] WhatsApp and Bale links open the right conversation.
- [ ] Telegram and WhatsApp link previews render, verified by pasting into a real chat.
- [ ] Every fact on the site confirmed by the owner: hours, address, phone, brands,
      dealer wording.
- [ ] Balad listing live and linked as `hasMap`.
- [ ] `sitemap.xml` reachable; `robots.txt` allows everything.

## 5. Owner handover pack

Write in **Persian**. Assume no technical knowledge and no developer available.

### `docs/OWNER-GUIDE-fa.md`

1. **How to add a watch** - one section, with screenshots. Photograph it per the Phase 04
   sheet, drop the file in the folder, copy an existing block in `products.json`, change the
   fields. That is the whole workflow.
2. **How to change hours or phone number** - one file, one line.
3. **How to publish** - one command, then upload. With screenshots.
4. **What not to touch**, and why.
5. **Who to call when it breaks**, with the developer's contact.

### Also hand over

- A **one-page laminated card** for the shop counter with the site address, so staff can
  tell customers where to look.
- The Phase 04 photography sheet.
- Login details for the host and the domain registrar, **in the owner's possession, not
  only the developer's.** This is the most commonly skipped handover item and the one that
  strands a site permanently.

## 6. The one-year test

**The scenario this project is actually designed for: nobody touches this repo for a year,
then something needs to change.** Verify it can survive that.

- [ ] `astro`, `tailwindcss` and `sharp` exact-pinned; `package-lock.json` and `.nvmrc`
      committed.
- [ ] `README.md` carries the Iranian npm mirror config.
- [ ] `passthroughImageService()` documented as the degradation if `sharp` breaks.
- [ ] **No CI.** Build on a laptop, deploy by folder upload. GitHub Actions is restricted
      from Iran and a CI dependency is the most common way a site becomes un-updatable.
- [ ] **The escape hatch is written down.** If Astro breaks and nobody will fix it, the data
      was deliberately kept as plain JSON plus a photos folder, so it ports to a ~150-line
      Node script using only `sharp` in an afternoon. Record this in the README. It is why
      the data format was chosen.
- [ ] A full backup of `src/` and `assets/` given to the owner on physical media. Not a
      cloud link - a USB stick. Cloud services get blocked.

## 7. After launch

- Submit `sitemap.xml` to Google Search Console.
- Check indexing at 2 weeks.
- Put the site link in the Instagram bio. This is the single highest-leverage distribution
  step available: **1,277 posts of existing work currently reaching 1,365 followers.** The
  site is how that effort becomes findable by people who are not already following.
- Recheck the certificate at 60 days.
- Revisit in 3 months: what did customers actually phone about? That is the roadmap.

---

## Definition of done

- [ ] Live on a domain, on domestic hosting, with an auto-renewing certificate.
- [ ] Every pre-launch gate item passed.
- [ ] Owner guide delivered **in Persian** and walked through in person.
- [ ] Owner holds host and registrar credentials.
- [ ] Backup on physical media.
- [ ] Site link in the Instagram bio.
- [ ] One-year test items all confirmed.
