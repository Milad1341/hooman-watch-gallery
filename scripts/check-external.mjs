#!/usr/bin/env node
/**
 * Fail if the built site references ANY third-party origin.
 *
 * Google Cloud blocks Iran at platform level, so a Google Fonts link, an
 * analytics tag, or a Maps embed does not degrade - it HANGS for the actual
 * audience. Cloudflare and raw.githubusercontent.com are DNS-poisoned inside
 * Iran. The rule is simple and absolute: everything is same-origin.
 *
 * Runs over dist/ after the build. See CLAUDE.md section 3.2.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
const EXT = new Set(['.html', '.css', '.js', '.json', '.xml', '.svg']);

// Origins that are allowed to appear as plain TEXT (not as a fetched asset):
// links a human clicks, and identifiers inside structured data.
const TEXT_ONLY_ALLOWED = [
  'https://wa.me/',
  'https://ble.ir/',
  'https://www.instagram.com/',
  'https://t.me/',
  'https://schema.org',
  'http://schema.org',
  'https://www.w3.org/',
  'http://www.w3.org/',
];

// Anything that actually FETCHES a resource is banned outright.
const FETCHING_ATTR = /(?:src|href|action|poster|data|content)\s*=\s*["'](https?:\/\/[^"']+)["']/gi;
const CSS_URL = /url\(\s*["']?(https?:\/\/[^"')]+)["']?\s*\)/gi;
const IMPORT = /@import\s+(?:url\()?["'](https?:\/\/[^"']+)["']/gi;
const FETCH_CALL = /\b(?:fetch|XMLHttpRequest|importScripts)\s*\(\s*["'`](https?:\/\/[^"'`]+)/gi;

let failures = 0;
const seen = new Set();

function isAllowedText(url) {
  return TEXT_ONLY_ALLOWED.some((a) => url.startsWith(a));
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!EXT.has(extname(p))) continue;
    check(p, readFileSync(p, 'utf8'));
  }
}

function check(file, content) {
  for (const re of [CSS_URL, IMPORT, FETCH_CALL]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content))) {
      console.error(`  ${file}  FETCHES external resource: ${m[1]}`);
      failures++;
    }
  }

  FETCHING_ATTR.lastIndex = 0;
  let m;
  while ((m = FETCHING_ATTR.exec(content))) {
    const url = m[1];
    const attr = m[0].split('=')[0].trim().toLowerCase();
    // href on <a> and content on <meta> are references, not fetches.
    const isReference = attr === 'href' || attr === 'content';
    if (isReference && isAllowedText(url)) continue;
    if (isReference && /^https?:\/\/[^/]*hooman/i.test(url)) continue;
    if (!isReference || !isAllowedText(url)) {
      const key = `${file}|${url}`;
      if (seen.has(key)) continue;
      seen.add(key);
      console.error(`  ${file}  external ${attr}: ${url}`);
      failures++;
    }
  }
}

if (!existsSync(DIST)) {
  console.error(`${DIST}/ not found. Run the build first.`);
  process.exit(1);
}

walk(DIST);

if (failures) {
  console.error(`\nEXTERNAL-REQUEST GUARD FAILED: ${failures} reference(s).`);
  console.error('Every asset must be same-origin. See CLAUDE.md section 3.2.\n');
  process.exit(1);
}
console.log('External-request guard passed (zero third-party origins)');
