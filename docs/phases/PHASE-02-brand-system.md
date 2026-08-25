# Phase 02 - Brand System

> ## STATUS: COMPLETE (2026-08-25)
>
> **Delivered:** logo rebuilt as parametric SVG (`scripts/build-logo.mjs`), three lockups
> plus a 16px simplified favicon, `Mark` and `TickRule` components, full token set in
> `global.css`, and a design preview page at `/design-preview/`.
>
> **Verified in browser:** every product card computes to `0px` radius, `none` shadow,
> `0px` border. Zero third-party origins, zero scripts, zero em-dashes.
>
> **Three things found by looking rather than assuming:**
>
> 1. **The hourglass is inverted from what it looks like.** The white slabs BULGE toward the
>    centre and the black field between them pinches to a 26px waist. It is the *black*
>    shape that reads as the hourglass. Building it the intuitive way produced something
>    superficially similar and unmistakably wrong side by side.
> 2. **A coordinate-space bug.** The hourglass measurements are in source-image space
>    (2048px canvas, bbox origin 266,274) but the viewBox is 1500 centred on 750. Using the
>    raw numbers drew the slabs outside the dial and let the indices slice through them.
>    The conversion is now documented in the script.
> 3. **`.label` / `.reference` / `.ltr-num` flip BLOCK alignment.** `direction: ltr` on a
>    `<p>` inside an RTL parent aligns it left, so card lines zigzagged against their
>    Persian neighbours. They must be applied to an inline `<span>` inside a normal block.
>    Documented in `global.css`, with `display: inline-block` as a safety net.
>
> The original artwork is hand-drawn: index spacing drifts 28.8-31.6 degrees and the
> hourglass sits ~24px off-centre. The rebuild regularises both, on the same reasoning -
> a mathematically exact dial is the correct signal for a watch dealer.

**Goal:** the logo rebuilt as clean SVG, a token set, and a rendered preview page proving
the system before a single feature is built.

**Concept: dark room, lit case.** The site shell is a dark gallery interior; product images
sit on a light plate, exactly like an illuminated vitrine in a dark shop. This keeps the
drama the client chose while solving the constraint that killed pure dark: a mixed-brand
reseller photographing twelve brands cannot hold consistent rim-light and shadow direction
on a dark ground, but can trivially hold a light neutral.

---

## 1. Rebuild the logo as SVG

Source measurements in `docs/research/LOGO-GEOMETRY.md`. Build parametrically rather than
tracing, so it stays clean and the tick motif is reusable.

- `viewBox="0 0 1500 1500"`, `fill="currentColor"`, **no hard-coded colour**.
- Squircle, corner radius ≈ 0.22 × size, continuous curve.
- 12 indices at **exact 30°** spacing. The original drifts between 28.8° and 31.6° because
  it was placed by hand; a mathematically clean dial reads as more precise, which is the
  right signal for a watch dealer.
- Quarter indices ~7.1° wide, batons ~2.9° - a 2.45:1 ratio.
- Indices span 0.67R to 0.90R.
- **Indices are trapezoids, not rectangles.** Side edges point at the centre. This is what
  makes it read as a real dial instead of clip art.
- Centre hourglass counterform preserved exactly - it is the H of Hooman and the best idea
  in the identity.

**Deliverables:** `mark.svg`, `logo-horizontal.svg`, `logo-stacked.svg`, plus a **16px
favicon variant with the 8 batons removed**, keeping only the 4 quarter indices. Below 24px
the batons fill in and the mark turns to mud.

## 2. The index tick is the design system

The tick is already load-bearing in the logo, so reusing it costs nothing and gives the site
a signature no competitor can copy without copying the mark. Build these primitives:

- `<TickRule>` - a row of batons as a section divider, instead of a plain `<hr>`.
- `<TickBullet>` - list and spec-row marker.
- Active-state indicator for nav and filter chips.
- Loading skeleton: indices illuminating clockwise.
- A large, very low-contrast dial watermark behind the hero.

## 3. Tokens

All contrast ratios below were **computed, not estimated**.

```css
:root {
  /* shell - the dark gallery */
  --shell:      #0B0C0D;
  --panel:      #15171A;
  --ink:        #E9EAEC;   /* 16.26:1 on shell   AAA */
  --muted:      #8B9095;   /*  6.08:1 on shell   AA  */

  /* plate - the lit vitrine */
  --plate:      #F7F7F5;   /* 18.25:1 vs shell       */
  --plate-ink:  #12161C;   /* 16.92:1 on plate   AAA */
  --plate-muted:#5C636D;   /*  5.66:1 on plate   AA  */

  /* accent - lume */
  --accent:     #A8D94A;   /* 11.83:1 on shell   AAA */
  --on-accent:  #0B0C0D;   /* 11.83:1 on accent  AAA */

  /* lines */
  --hairline:   #24272B;   /* decorative only, 1.31:1 */
  --control:    #6B7178;   /*  3.97:1 on shell - required for control borders */
}
```

**The accent is lume**, the luminous compound on a watch dial. It is the only glow a watch
legitimately owns, and it is the precise opposite of the black-and-gold palette that replica
sites cluster around - which matters when authenticity is the entire positioning.

**It is also a knife-edge.** At 1-2% coverage it is a signature; used as a fill, a glow, or a
gradient it collapses into gaming-peripheral aesthetics. Therefore:

> **The accent appears on the call CTA and active states. Nowhere else.**
> The only coloured thing on any page is the action we want. No accent text, no accent
> borders, no accent backgrounds, no glow effects.

**Two line tokens, and they are not interchangeable.** `--hairline` is 1.31:1 and is fine for
decorative rules and card edges, which are exempt from contrast rules. The moment a line is
the *only* thing marking a control boundary - a filter chip, a bordered button, an input -
it must use `--control` at 3.97:1. WCAG 1.4.11 requires 3:1 for meaningful UI boundaries and
a reused hairline fails it.

## 4. Type

**IBM Plex**, self-hosted per Phase 01.

| Role | Face | Notes |
|---|---|---|
| Persian display | Plex Sans Arabic 700 | `letter-spacing: 0` |
| Persian body | Plex Sans Arabic 400 | `line-height: 1.8` |
| Latin labels | Plex Sans 600 | uppercase, `0.1em` tracking |
| Latin display | Plex Sans 600 | uppercase, `0.18em` tracking |
| **Specs and references** | **Plex Mono 400** | reference numbers, case sizes, calibres |

**Persian has no serif/sans axis.** Do not build the Persian side as "the Latin system with
Persian fonts swapped in" - that is the most common way bilingual Persian sites look wrong.
Build Persian as **one family at two weights** and let the Latin side carry any
serif/sans contrast.

**Plex Mono for spec data is doing real work.** Setting reference numbers, case diameters,
and movement calibres in mono makes a spec table read like a technical document, which is
exactly the register a watch buyer trusts.

**Tracking is doing most of the perceived-luxury work, and it is free.** Seiko's production
stylesheet uses `letter-spacing: .1em` 46 times - its dominant value. But **only on Latin**;
tracking breaks Arabic-script joining.

**Uppercase is surgical, not global.** Seiko uses `text-transform: none` 83 times against
`uppercase` 7 times. Uppercase the brand line, section labels, and buttons. Leave model
names and all Persian body copy alone. All-caps everywhere is a costume.

## 5. Product cards - zero chrome

Verified across Seiko, G-Shock, and Goldsmiths: product cards compute to **no border, no
border-radius, no shadow, transparent background**. Seiko's stylesheet sets
`border-radius: 0` as its dominant value and contains almost no shadows.

> **Rounded, shadowed cards are the single loudest dropshipper tell.**

Here the card is the **light plate** - that is the only chrome it gets. Square corners, no
shadow, grid gap as the separator.

**Card content is three lines, maximum:**

```
SEIKO                 <- brand, uppercase, tracked, small
Presage Cocktail Time <- model, sentence case
SRPB41J1              <- reference, Plex Mono
```

No marketing adjectives. Strings like "Luxury Elegant Fashion Quartz" read as counterfeit
listing copy, because that is where they come from.

**Print the manufacturer reference under every watch.** It is the highest-density
authenticity signal available and costs one JSON field. Counterfeit and dropship listings
never carry them, because they scrape marketing names rather than reading the caseback.

## 6. Motion budget

**`MOTION_INTENSITY: 4`.** Two durations sitewide: **200ms ease** for all hover and tap
feedback, and one slow crossfade reserved for the hero. Seiko uses `transition: .2s ease`
112 times - one duration for essentially every interaction.

**At most two animated ideas on the whole site, both tied to the physical object.**

**The one craft detail worth building:** a mechanical watch at 28,800 vph advances its
seconds hand in **exactly 8 discrete steps per second**. Animate any seconds hand with
`steps(8)` at 125ms. Smooth rotation reads as a render; a 1-second tick reads as cheap
quartz; 8 steps reads as a movement, and watch people notice within two seconds.

**But it must stop.** WCAG 2.2.2 (Level A) applies to anything that auto-starts, runs over
five seconds, and sits alongside other content - with no decoration exemption. Run it for
under five seconds on load and stop, or start it on hover only.

**Banned outright** - these are precisely the three the spec calls out under SC 2.3.3, plus
the category's own clichés: parallax heroes · elements flying in on scroll · page-transition
wipes · gold shimmer sweeps · count-up numbers · auto-scrolling logo marquees · 3D watches
spinning on scroll · cursor-following bezels · any tick sound.

Wrap everything that survives in `@media (prefers-reduced-motion: reduce)`.

## 7. Preview page

Build `design-preview.html` rendering every token, both grounds, all type roles, the card,
the tick primitives, and the CTA. Review it **before** building features. Cheaper to reject
a palette here than after fifty components exist.

---

## Definition of done

- [ ] SVG logo in three lockups plus the 16px favicon variant; legible at 24px.
- [ ] Tick primitives built and used in the preview.
- [ ] Tokens defined; **every contrast ratio verified in-browser**, not assumed.
- [ ] Type scale rendering correctly in Persian and Latin, no fallback glyphs.
- [ ] Card component: no border, no radius, no shadow, three lines, mono reference.
- [ ] `--control` used on every control boundary; `--hairline` never load-bearing.
- [ ] Accent appears **only** on the call CTA and active states - grep to confirm.
- [ ] Reduced-motion path verified by toggling the OS setting.
- [ ] Preview page reviewed and approved.

## Verification

```bash
browser-harness <<'PY'
new_tab("http://localhost:4321/design-preview.html"); wait_for_load()
print(js("""JSON.stringify([...document.querySelectorAll('[data-card]')].map(c=>{
  const s=getComputedStyle(c);
  return {radius:s.borderRadius, shadow:s.boxShadow, border:s.borderWidth};
}))"""))
PY
```

Every card must report `0px` radius, `none` shadow, `0px` border.
