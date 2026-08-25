/**
 * robots.txt. Follows Torob's minimal pattern, not Digikala's.
 * There are no carts or accounts to hide, so nothing is disallowed.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\nDisallow:\n\nSitemap: ${new URL('sitemap.xml', site).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
