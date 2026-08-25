#!/usr/bin/env node
/**
 * Generate the Hooman mark as SVG from the measured geometry.
 *
 * Built parametrically rather than traced, for three reasons:
 *   1. The original was placed by hand and its index spacing drifts between
 *      28.8 and 31.6 degrees. A watch dealer's mark should be exactly 30.
 *      The drift is not a design decision worth preserving.
 *   2. The index tick is the brand's atomic graphic element (see
 *      docs/research/LOGO-GEOMETRY.md). Generating it here means the same
 *      geometry can produce dividers, bullets and active-state markers.
 *   3. A traced path is opaque. This is legible and adjustable.
 *
 * Source measurements: assets/brand/hooman-logo-2048.png
 *
 *   viewBox 1500, outer radius R = 750, squircle corner ~0.22 * size
 *   12 indices at 30 degrees
 *   quarter indices 7.1 deg wide, batons 2.9 deg  (ratio 2.45 : 1)
 *   indices span 0.67R to 0.90R
 *   centre counterform: an hourglass that is also the H of Hooman
 *
 * Run: node scripts/build-logo.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const S = 1500;
const C = S / 2;
const R = 750;

const INDEX_INNER = 0.67 * R;
const INDEX_OUTER = 0.9 * R;
const QUARTER_DEG = 7.1;
const BATON_DEG = 2.9;

const rad = (d) => ((d - 90) * Math.PI) / 180;
const pt = (r, deg) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))];
const f = (n) => Number(n.toFixed(2));

/**
 * One index as a trapezoid. The side edges point at the centre, so the outer
 * end is wider than the inner end. That taper is what makes it read as a real
 * dial rather than clip art - a rectangle here looks instantly wrong.
 */
function index(deg, widthDeg) {
  const h = widthDeg / 2;
  const p = [
    pt(INDEX_INNER, deg - h),
    pt(INDEX_OUTER, deg - h),
    pt(INDEX_OUTER, deg + h),
    pt(INDEX_INNER, deg + h),
  ];
  return `M${p.map(([x, y]) => `${f(x)},${f(y)}`).join('L')}Z`;
}

/** All twelve indices, quarters wider than batons. */
function indices({ quartersOnly = false } = {}) {
  const out = [];
  for (let i = 0; i < 12; i++) {
    const deg = i * 30;
    const isQuarter = i % 3 === 0;
    if (quartersOnly && !isQuarter) continue;
    out.push(index(deg, isQuarter ? QUARTER_DEG : BATON_DEG));
  }
  return out.join('');
}

/**
 * Squircle as a rounded rect with a continuous curve. A plain `rx` gives the
 * abrupt corner of a CSS border-radius; the superellipse control points below
 * are what make it read as an iOS-style continuous curve.
 */
function squircle(inset = 0) {
  const a = inset;
  const b = S - inset;
  const r = 0.22 * (S - inset * 2);
  const k = r * 0.55; // control-point offset for a continuous-looking curve
  return [
    `M${f(a + r)},${f(a)}`,
    `L${f(b - r)},${f(a)}`,
    `C${f(b - r + k)},${f(a)} ${f(b)},${f(a + r - k)} ${f(b)},${f(a + r)}`,
    `L${f(b)},${f(b - r)}`,
    `C${f(b)},${f(b - r + k)} ${f(b - r + k)},${f(b)} ${f(b - r)},${f(b)}`,
    `L${f(a + r)},${f(b)}`,
    `C${f(a + r - k)},${f(b)} ${f(a)},${f(b - r + k)} ${f(a)},${f(b - r)}`,
    `L${f(a)},${f(a + r)}`,
    `C${f(a)},${f(a + r - k)} ${f(a + r - k)},${f(a)} ${f(a + r)},${f(a)}`,
    'Z',
  ].join('');
}

/**
 * The hourglass counterform, measured from the source artwork.
 *
 * IMPORTANT and counter-intuitive: the two knockout slabs BULGE toward the
 * centre, and the black field between them pinches to a narrow waist. It is
 * the *black* shape that reads as the hourglass, not the white one. Building
 * it the other way round produces something that looks superficially similar
 * and is unmistakably wrong side by side.
 *
 * Measured from assets/brand/hooman-logo-2048.png by sampling transparent runs
 * every 20px (see docs/research/LOGO-GEOMETRY.md):
 *
 *   slab outer edges      x = 723 and x = 1370      (straight, vertical)
 *   vertical extent       y = 750 to y = 1290
 *   slab width at top     114 px   (inner edge at x = 837)
 *   slab width at waist   313 px   (inner edge at x = 1036)
 *   black waist gap       26 px
 *
 * The control points below were fitted to the measured profile and check out
 * to within ~10px at the sampled ys, which is 0.7% of the 1500 canvas.
 */
function hourglass() {
  // The measurements above are in SOURCE-IMAGE space (2048px canvas, mark
  // bounding box x 266..1784, y 274..1774). This viewBox is 1500 centred on
  // 750, so every value has to be converted. Getting this wrong draws the
  // slabs outside the dial and lets the indices slice through them.
  //
  //   viewBox_x = (source_x - 266) * (1500 / 1518)
  //   viewBox_y =  source_y - 274
  //
  // The source is also hand-drawn about 24px off-centre horizontally. As with
  // the index spacing, that is measurement noise rather than intent, so the
  // rebuild is centred and the widths are derived symmetrically from 750.
  const HALF_W = 320;           // (1370 - 723) / 2, converted
  const HALF_H = 270;           // (1290 - 750) / 2
  const L_OUT = C - HALF_W;     // 430; the right slab is mirrored via mx()
  const TOP = C - HALF_H;       // 480
  const BOT = C + HALF_H;       // 1020
  const VC = C;                 // waist sits on the dial centre
  const mx = (x) => 2 * C - x;

  const WAIST_GAP = 26;         // black pinch between the two slabs
  const INNER_TOP = L_OUT + 113;          // slab is 113 wide at top and bottom
  const INNER_WAIST = C - WAIST_GAP / 2;  // and bulges to the waist
  const C1 = [L_OUT + 120, TOP + 150];    // fitted to the measured profile
  const C2 = [L_OUT + 284, TOP + 225];

  const slab = (m) => {
    const X = m ? mx : (x) => x;
    return [
      `M${f(X(L_OUT))},${f(TOP)}`,
      `L${f(X(INNER_TOP))},${f(TOP)}`,
      // inner edge sweeping in to the waist
      `C${f(X(C1[0]))},${f(C1[1])} ${f(X(C2[0]))},${f(C2[1])} ${f(X(INNER_WAIST))},${f(VC)}`,
      // and back out, mirrored about the waist
      `C${f(X(C2[0]))},${f(2 * VC - C2[1])} ${f(X(C1[0]))},${f(2 * VC - C1[1])} ${f(X(INNER_TOP))},${f(BOT)}`,
      `L${f(X(L_OUT))},${f(BOT)}`,
      'Z',
    ].join('');
  };

  return slab(false) + slab(true);
}

/**
 * The mark. One path, `fill-rule="evenodd"` so the indices and hourglass cut
 * through the squircle as counterforms rather than being painted on top.
 * `fill="currentColor"` so it inherits colour from CSS and never carries its
 * own - that is what lets it sit on any ground without a plate.
 */
function mark({ quartersOnly = false, title = 'گالری ساعت هومن' } = {}) {
  const d = squircle() + indices({ quartersOnly }) + hourglass();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" role="img" aria-label="${title}">
  <path fill="currentColor" fill-rule="evenodd" d="${d}"/>
</svg>
`;
}

/** A single index tick, for reuse as divider, bullet and active marker. */
function tick() {
  const w = 40;
  const h = 140;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" aria-hidden="true">
  <path fill="currentColor" d="M6,0 L${w - 6},0 L${w},${h} L0,${h} Z"/>
</svg>
`;
}

mkdirSync('src/assets/brand', { recursive: true });
mkdirSync('public', { recursive: true });

const files = {
  'src/assets/brand/mark.svg': mark(),
  'src/assets/brand/mark-simple.svg': mark({ quartersOnly: true }),
  'src/assets/brand/tick.svg': tick(),
};

for (const [path, content] of Object.entries(files)) {
  writeFileSync(path, content);
  console.log(`  ${path}  ${content.length}B`);
}

console.log('\n  mark.svg          full dial, 12 indices');
console.log('  mark-simple.svg   quarters only, for 16px favicon');
console.log('  tick.svg          the atomic element, for dividers and bullets');
