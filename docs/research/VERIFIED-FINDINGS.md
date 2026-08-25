# Verified Findings - checked directly, not from search snippets

The research agents hit heavy bot protection (107 × `403`, 41 Cloudflare interstitials,
53 × `429`). Everything in this file was instead verified **first-hand** on 2026-08-24
using real Chrome via `browser-harness` and direct `openssl` handshakes, so it is
higher-confidence than anything reconstructed from search results.

---

## 1. Two major Iranian watch retailers have broken TLS

Checked with `openssl s_client`:

| Domain | Certificate issuer | Verdict |
|---|---|---|
| `watchstore.ir` | `CN=localhost` (self-signed) | **BROKEN** - browser blocks with `NET::ERR_CERT_AUTHORITY_INVALID` |
| `iwatch.ir` | `CN=moeini` (self-signed, 2021-2031) | **BROKEN** - same interstitial |
| `digikala.com` | Certum DV TLS G2 R39 CA (Poland) | valid |
| `torob.com` | Certum DV TLS G2 R39 CA (Poland) | valid |
| `basalam.com` | **Let's Encrypt** | valid |

Both watch retailers were confirmed a second way - loading them in real Chrome produced the
full-page red "Your connection is not private" warning, not a soft indicator.

**Why this matters more than it looks.** A shopper researching a several-million-toman
Seiko hits a browser warning that says, in effect, *attackers might be trying to steal your
information from this site*. In a market where the buyer's main anxiety is already
counterfeits and being cheated, that is the worst possible first impression.

**The wedge:** Hooman can beat the two best-known competitor domains on trust for **zero
ongoing cost**, simply by having a certificate that validates. This is not a marginal SEO
nicety, it is the cheapest competitive advantage available in this project, and it
reinforces the authenticity positioning that the shop's official-dealer status already
gives them.

**Actionable:** `basalam.com` proves **Let's Encrypt issues certificates to Iranian
sites** - free, auto-renewing, no maintenance. Certum (a Polish CA) is what the large
Iranian players buy when they want a paid cert. Either works; Let's Encrypt is correct here
because it renews itself and this site must survive a year of neglect. **Whatever host is
chosen, automatic Let's Encrypt renewal is a hard requirement, not a preference.**

---

## 2. Persian web typography convention, observed live

Read off `digikala.com`, Iran's largest e-commerce site:

```
<html lang="fa" dir="rtl">
body { font-family: IRANYekan, sans-serif; }
```

Confirms three things the site must copy: `lang="fa"`, `dir="rtl"`, and a **Persian-first
font stack with a generic fallback**, not a Latin font with Persian bolted on.

Caveat worth carrying into the design phase: IRANYekan is the de-facto commercial standard
in Iran but its licensing is not clearly free for commercial reuse. Vazirmatn and Estedad
are the open, properly-licensed alternatives and should be preferred unless the shop buys a
licence. This is flagged for the design phase, not settled here.

---

## 3. The shop has no Google Business Profile

`maps.app.goo.gl/gRk3BzGpNemNfN6S9` resolves to
`google.com/maps/place/35.712130,51.312458` - **raw coordinates with no business entity
attached.** It is a dropped pin, not a listing.

So there is no record on the open web carrying the shop's name, hours, photos, or reviews.
The website will be the only such record, which makes `LocalBusiness` structured data
genuinely load-bearing here rather than SEO decoration.

---

## 4. Instagram profile data is reachable without login

Profile metadata (bio, follower count, brand highlights, contact numbers) is served in
`og:` meta tags and the initial HTML **before** the login wall. Post grid content is not.

Practical consequence: the shop's own 1,277 posts cannot be programmatically pulled for the
catalogue. **Product imagery has to come from the shop directly** - either their original
files or a fresh photo session. Plan the content phase around that constraint rather than
discovering it late.

---

## 5. Bot protection blocks automated research, real Chrome does not

`WebFetch` returned `403` or a Cloudflare interstitial on the majority of brand and
retailer domains. Plain `curl` with a real user-agent was inconsistent - `seikowatches.com`
returned `200`, `citizenwatch.com` returned `403`.

Real Chrome through `browser-harness` reached every target that was actually online.

**Method note for later phases:** any remaining competitor or brand research should be run
through `browser-harness`, sequentially. It drives one shared browser, so parallel agents
collide - this was observed directly, with two processes fighting over the same tab. Drive
it from the main thread, one page at a time.

---

## 6. Domain reachability note

`obaku.com` returns `DNS_PROBE_FINISHED_NXDOMAIN` - it is not Obaku's domain. Any Obaku
research must start by finding the correct domain (the brand is Danish; `obaku.dk` and
regional variants are the likely candidates). Minor, but it means one brand lane started
from a bad URL and its Obaku findings should be treated as unverified.
