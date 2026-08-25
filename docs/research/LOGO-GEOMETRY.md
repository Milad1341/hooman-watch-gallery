# Hooman Watch Gallery - Logo Geometry (measured)

Source file: `assets/brand/hooman-logo-2048.png` (2048×2048, RGBA, single colour + alpha knockouts).

## What the mark actually is

A **watch dial rendered as a squircle**. The mark is one solid black shape; every white
element you see is a **transparent knockout**, not a painted white shape. That matters:
the logo recolours by changing one fill, and it sits on any background without a plate.

The centre counterform is an **hourglass** built from two facing trapezoids that meet at a
point - it simultaneously reads as an hourglass (time) and as the counter of an **H**
(Hooman). This is the strongest idea in the identity and the site should lean on it.

## Measured values

| Property | Measured | Normalised |
|---|---|---|
| Mark bounding box | 1518 × 1500 px | treat as 1500 square |
| Optical centre | (1025, 1024) | (0.5, 0.5) |
| Outer radius `R` (flat edge to centre) | 750 px | 0.5 × size |
| Squircle corner radius | ≈ 330 px | ≈ 0.22 × size (iOS-style continuous curve) |
| Index count | 12, at 30° intervals | - |
| Quarter indices (12 / 3 / 6 / 9) angular width | ≈ 7.1° | - |
| Baton indices (all others) angular width | ≈ 2.9° | - |
| Quarter : baton width ratio | ≈ 2.45 : 1 | - |
| Index inner radius | ≈ 503 px | 0.67 R |
| Index outer radius | ≈ 674 px | 0.90 R |
| Index track (rim margin outside indices) | ≈ 76 px | 0.10 R |

Measured index mid-angles (0° = 12 o'clock, clockwise):
`2.6, 32.0, 60.9, 90.2, 119.4, 148.2, 177.6, 207.7, 238.4, 270.0, 301.5, 332.3`

Spacing drifts between 28.8° and 31.6°, so the original was placed by hand rather than
generated. **The rebuild should use exact 30° spacing** - the drift is not a design
decision worth preserving, and a mathematically clean dial reads as more precise, which is
the correct signal for a watch retailer.

## Rebuild rules

1. Author as **SVG**, `viewBox="0 0 1500 1500"`, one `<path>` or a `<g>` with
   `fill="currentColor"` so it inherits colour from CSS. No embedded fill values.
2. Indices are **trapezoids, not rectangles** - each side edge points at the centre, so
   the outer end is wider than the inner end. This is what makes it read as a real dial
   rather than a clip-art clock.
3. Ship three lockups:
   - `mark` - the squircle alone (favicon, app icon, avatar, sticky call button)
   - `horizontal` - mark + wordmark, for the desktop header
   - `stacked` - mark over wordmark, for the footer and share cards
4. Minimum legible size for the mark is **24 px**; below that the batons fill in. Provide a
   simplified 16 px favicon variant with the 8 batons removed and only the 4 quarter
   indices kept.

## The design-system consequence

The **index tick** is the atomic graphic element of this brand. It is already load-bearing
in the logo, so reusing it costs nothing and buys instant coherence. Reuse it as:

- section dividers (a row of batons instead of a rule)
- list bullets and spec-row markers
- the active-state indicator in navigation and filters
- the loading / skeleton motif (indices illuminating clockwise)
- a large, low-contrast background watermark behind the hero

This gives the site a signature that no competitor can copy without copying the logo, and
it means the visual language is derived from the client's own mark rather than imposed.

## Colour

The supplied artwork is pure monochrome with alpha. There is **no brand colour in the
logo**, which means the palette is a free decision - see the design phase. The correct
move is to keep the mark monochrome (black on light, white on dark) and let a single
accent live everywhere *except* the logo, so the mark always reads as the most
authoritative element on the page.
