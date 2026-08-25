/**
 * Build an internal link that respects the deployment base path.
 *
 * Astro rewrites asset URLs for `base`, but NOT links you author yourself.
 * Any hand-written "/watches/" resolves to the domain root and 404s on a
 * subpath deploy - which is exactly what happened on the GitHub Pages preview:
 * the header nav dropped the base and every page went missing.
 *
 *   url('/watches/')  ->  /hooman-watch-gallery/watches/   (preview)
 *                     ->  /watches/                        (real domain)
 *
 * Use this for every internal href. It is a no-op when base is '/'.
 */
export function url(pathname = '/') {
  const base = import.meta.env.BASE_URL || '/';
  return (base.endsWith('/') ? base : base + '/') + String(pathname).replace(/^\/+/, '');
}
