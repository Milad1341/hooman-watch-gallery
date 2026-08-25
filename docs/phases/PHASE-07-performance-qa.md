# Phase 07 - Performance and QA

**Goal:** prove the site works for its actual audience - an Iranian visitor on a throttled
mobile connection - rather than for a developer on fibre.

**A green build proves nothing.** Runtime errors blank-render despite green builds, and RTL
bugs never appear in a DOM snapshot. Everything here is verified in a real browser.

---

## 1. Budgets - hard limits, not aspirations

Derived from the current global baseline (9 Mbps down, 100ms RTT, Galaxy A24-class device)
and tightened for post-blackout Iran.

| Metric | Limit |
|---|---|
| **JavaScript** | ≤ 150 KB |
| **Total, first load** | ≤ 1.0 MB |
| **Requests** | ≤ 25 |
| **Origins** | **1** |
| **Above the fold** | ≤ 150 KB |
| **LCP image** | ≤ 80 KB AVIF/WebP |
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |

**Context for why these are strict:** Iran ran an ~88-day near-total blackout (8 Jan to
26 May 2026), the longest recorded anywhere. On restoration, traffic reached only ~40% of
prior peak and throttling was heavy enough that users could not reliably move video.
**Page weight is a conversion metric here.**

**The phone number must render in the first paint** - not behind a font, not behind an
image, not behind JavaScript. If everything else fails, the number still has to be there.

### LCP specifics

The LCP element will be the hero or first product image on every template. It must be
**discoverable in the initial HTML** (no JS-injected `src`), have reserved dimensions, and
carry `fetchpriority="high"`. The first 2-4 tiles above the fold at 360px get
`loading="eager"`; everything below gets `loading="lazy" decoding="async"`.

**Never lazy-load the LCP image.** It is the single most common way an image-heavy catalogue
fails LCP.

### Fonts are the biggest non-image line item

For reference, Vazirmatn's Arabic subset alone is ~46KB per weight. Plex Sans Arabic is
comparable. **Two weights maximum**, subset to the glyphs actually used, `woff2` only.
Verify the shipped total.

## 2. RTL audit - computed styles, not DOM snapshots

**A DOM snapshot cannot show what styles actually apply.** Layout bugs must be checked with
`getComputedStyle` and `getBoundingClientRect`.

- [ ] No physical-direction utilities anywhere - lint passes on `src/`.
- [ ] `dir="rtl"` and `lang="fa"` on `<html>`.
- [ ] **No `letter-spacing` on any Persian text.** Verify computed, not authored - an
      inherited value from a Latin rule is the likely failure.
- [ ] Line-height ≥ 1.8 on Persian body.
- [ ] Every phone number and model reference has `direction: ltr; unicode-bidi: isolate`.
      **Check visually:** `۰۲۱ ۴۴۶۹ ۷۳۰۹` must not render reversed inside a Persian sentence.
- [ ] Latin brand names inside Persian sentences wrapped in `<bdi>`.
- [ ] Icons that imply direction (back, next, carousel arrows) mirror correctly. Icons that
      must not mirror (clocks, logos, play buttons) do not.
- [ ] Body never scrolls horizontally at 360px. Wide content scrolls inside its own
      container.
- [ ] ZWNJ preserved in rendered output - build tooling has not stripped `U+200C`.

## 3. Persian search QA

Test each pair returns identical results:

| Query A | Query B | Tests |
|---|---|---|
| `ساعت مچي` | `ساعت مچی` | Arabic vs Persian yeh |
| `كاسيو` | `کاسیو` | Arabic vs Persian kaf |
| `۱۲۳` | `123` | Persian vs Latin digits |
| `نیم‌فاصله` | `نیم فاصله` | ZWNJ |

Also confirm Latin queries work: `seiko`, `SRPB41J1`, `srpb41j1`.

## 4. Accessibility

- [ ] Contrast verified in-browser against Phase 02 tokens. `--control` on every control
      boundary; `--hairline` never load-bearing.
- [ ] Tap targets ≥ 48px on the call CTA; ≥ 24px everywhere (WCAG 2.2 SC 2.5.8 AA floor).
- [ ] Visible focus states on every interactive element, keyboard-reachable in RTL order.
- [ ] Every image has meaningful Persian `alt`. Product images: brand, model, reference.
- [ ] **`prefers-reduced-motion` verified by toggling the OS setting**, not by reading code.
- [ ] **The seconds-hand animation stops within five seconds or is hover-triggered.** WCAG
      2.2.2 is Level A and has no decoration exemption. A perpetual animation is a
      straightforward failure.
- [ ] Heading hierarchy sound; one `<h1>` per page.
- [ ] Screen-reader pass on one product page with Persian output.

## 5. The reachability checks - both directions

Two failure modes, opposite causes, both invisible from a developer's desk.

### From outside Iran

**Googlebot crawls from US addresses.** If the Iranian host geo-blocks foreign IPs, the site
never gets indexed and Phase 06 was wasted. Test from a non-Iranian vantage point.

### From inside Iran

**Uptime monitoring from outside Iran is meaningless.** Iran blocks by DNS poisoning
(returning `10.10.34.35/36`) and SNI-based DPI while routes stay globally visible - so the
site can look perfectly up from London and be unreachable in Tehran.

**Have someone inside Iran load the site on mobile data** and confirm: it loads, the phone
number is visible, `tel:` dials, and the Bale link opens. There is no substitute for this
test and no tool that simulates it.

## 6. Cross-cutting

- [ ] Renders at 360, 390, 768, 1024, 1440.
- [ ] Works with JavaScript disabled: all products reachable, phone number present,
      `tel:` works.
- [ ] Zero console errors, zero failed requests.
- [ ] Zero external origins.
- [ ] Zero em-dashes in rendered output.
- [ ] Every `wa.me` href matches `/^https:\/\/wa\.me\/98\d{9}/`.
- [ ] Every `tel:` href is ASCII E.164.
- [ ] Bale links use the leading-`0` national format.
- [ ] `dist/` opens correctly from `file://` - proves no server dependency.

---

## Verification script

```bash
browser-harness <<'PY'
new_tab("http://localhost:4321/"); wait_for_load(); wait_for_network_idle()
print(js("""JSON.stringify({
  external: performance.getEntriesByType('resource').map(r=>r.name).filter(n=>!n.startsWith(location.origin)),
  requests: performance.getEntriesByType('resource').length,
  bytes: Math.round(performance.getEntriesByType('resource').reduce((n,r)=>n+(r.transferSize||0),0)/1024)+'KB',
  js: Math.round(performance.getEntriesByType('resource').filter(r=>r.name.endsWith('.js')).reduce((n,r)=>n+(r.transferSize||0),0)/1024)+'KB',
  dir: document.documentElement.dir,
  bodyLS: getComputedStyle(document.body).letterSpacing,
  bodyLH: getComputedStyle(document.body).lineHeight,
  overflow: document.documentElement.scrollWidth > window.innerWidth,
  emdash: (document.body.innerText.match(/-/g)||[]).length,
  tel: [...document.querySelectorAll('a[href^="tel:"]')].map(a=>a.getAttribute('href')),
  wa: [...document.querySelectorAll('a[href*="wa.me"]')].map(a=>a.getAttribute('href').slice(0,30)),
  zwnj: document.body.innerText.includes('\\u200c')
}, null, 1)"""))
PY
```

**Pass criteria:** `external` is `[]` · `requests` ≤ 25 · `bytes` ≤ 1024KB · `js` ≤ 150KB ·
`dir` is `rtl` · `bodyLS` is `normal` or `0px` · `overflow` is `false` · `emdash` is `0` ·
every `tel` starts `tel:+98` · every `wa` starts `https://wa.me/98`.

Run the same script at 360px width and on a product page, not just the homepage.

## Definition of done

- [ ] Every budget met, measured not estimated.
- [ ] Every checklist item above ticked from real browser output.
- [ ] **Confirmed loading from inside Iran by a real person on mobile data.**
- [ ] Confirmed reachable from outside Iran.
