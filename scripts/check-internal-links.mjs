#!/usr/bin/env node
/**
 * Fail the build on malformed or dead internal links.
 *
 * Written after shipping a preview where every brand and product link read
 * `/hooman-watch-gallerybrand/casio/` - the base path concatenated without a
 * separator. Every page returned 200 when requested directly, so route checks
 * passed; only the rendered links were broken. Nothing caught it.
 *
 * Checks each internal href in dist/ actually resolves to a built file.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
let failures = 0;
const seen = new Set();

function pages(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) pages(p, out);
    else if (extname(p) === '.html') out.push(p);
  }
  return out;
}

/** Map a site-absolute href to the file that should serve it. */
function resolves(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return existsSync(join(DIST, 'index.html'));
  const rel = clean.replace(/^\/+/, '');
  return (
    existsSync(join(DIST, rel)) ||
    existsSync(join(DIST, rel, 'index.html')) ||
    existsSync(join(DIST, rel.replace(/\/$/, '') + '.html'))
  );
}

if (!existsSync(DIST)) {
  console.error('dist/ not found. Build first.');
  process.exit(1);
}

// Strip the configured base before resolving, since dist/ is base-relative.
const cfg = existsSync('astro.config.mjs') ? readFileSync('astro.config.mjs', 'utf8') : '';
const baseMatch = cfg.match(/^\s*base:\s*'([^']+)'/m);
const BASE = baseMatch ? baseMatch[1].replace(/\/$/, '') : '';

for (const file of pages(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const href = m[1];
    if (seen.has(href)) continue;
    seen.add(href);

    // A base-path link that lost its separator: `/basefoo` instead of `/base/foo`
    if (BASE && href.startsWith(BASE) && href !== BASE && !href.startsWith(BASE + '/')) {
      console.error(`  MALFORMED base path: ${href}`);
      failures++;
      continue;
    }

    const stripped = BASE && href.startsWith(BASE) ? href.slice(BASE.length) || '/' : href;
    if (!resolves(stripped)) {
      console.error(`  DEAD LINK: ${href}`);
      failures++;
    }
  }
}

if (failures) {
  console.error(`\nINTERNAL LINK CHECK FAILED: ${failures} broken link(s).\n`);
  process.exit(1);
}
console.log(`Internal link check passed (${seen.size} unique links resolve)`);
