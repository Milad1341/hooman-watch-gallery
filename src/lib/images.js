/**
 * DEMO product imagery, one file per product slug.
 *
 * CC-licensed stand-ins from Openverse. They do NOT depict Hooman's actual
 * stock or the referenced models. Licences and authors are recorded in
 * src/assets/watches/demo-credits.json and must be preserved if any ship.
 *
 * Replace with the shop's own photography per PHASE-04. When real photos
 * arrive, drop them in as <slug>.jpg and nothing else has to change.
 */
const modules = import.meta.glob('../assets/watches/*.{jpg,png}', {
  eager: true,
  import: 'default',
});

const bySlug = {};
for (const [path, img] of Object.entries(modules)) {
  const m = path.match(/([a-z0-9-]+)\.(jpg|png)$/);
  if (m) bySlug[m[1]] = img;
}

/** Image for a product slug, or null if none exists yet. */
export function productImage(slug) {
  return bySlug[slug] ?? null;
}

export const imageCount = Object.keys(bySlug).length;
