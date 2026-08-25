/**
 * One flat sitemap. Google ignores <priority> and <changefreq>, so neither is
 * emitted. <lastmod> is omitted rather than faked - Google only uses it when
 * it is consistently accurate.
 */
import type { APIRoute } from 'astro';
import { products, brands } from '../lib/catalogue.js';

export const GET: APIRoute = ({ site }) => {
  const paths = [
    '/', '/watches/', '/repairs/', '/about/', '/visit/',
    ...brands.map((b) => `/brand/${b.key}/`),
    ...products.map((p) => `/watch/${p.slug}/`),
  ];
  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
