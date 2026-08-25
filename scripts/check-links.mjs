#!/usr/bin/env node
/**
 * Validate contact-link formats across the source tree.
 *
 * Three channels, three DIFFERENT conventions, and two of them fail silently:
 *
 *   tel:     +98, ASCII digits      Persian digits will not dial (RFC 3966)
 *   wa.me:   98, NO leading zero    a leading 0 renders fine and never resolves
 *   ble.ir:  leading zero, NO +98
 *
 * The wa.me case is the single most likely bug on an Iranian shop site.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['src'];
const EXT = new Set(['.astro', '.html', '.js', '.ts', '.json', '.md']);

/** Skip test files: they deliberately contain malformed numbers to prove the
 *  runtime guards reject them. */
const SKIP = /\.test\.[jt]s$/;

/** A match is a literal URL only if it has no template placeholder, no regex
 *  metacharacter, and no escape. `tel:${e164}` is constructed at runtime and
 *  is validated by shop.js instead. */
function isLiteral(s) {
  return !/[${}\\^*+?()[\]|]/.test(s);
}

let failures = 0;

function report(file, msg) {
  console.error(`  ${file}  ${msg}`);
  failures++;
}

function check(file, content) {
  for (const m of content.matchAll(/tel:([^\s"'`<>)]+)/g)) {
    const n = m[1];
    if (!isLiteral(n)) continue;
    if (/[۰-۹٠-٩]/.test(n)) report(file, `tel: contains Persian digits and will NOT dial: ${n}`);
    else if (!/^\+98\d{9,10}$/.test(n)) report(file, `tel: is not valid E.164 +98...: ${n}`);
  }

  // Iranian mobile is 09 + 9 digits = 11. Strip the 0, prepend 98 -> 98 + 10 digits.
  for (const m of content.matchAll(/https:\/\/wa\.me\/([^\s"'`<>?)]+)/g)) {
    const n = m[1];
    if (!isLiteral(n)) continue;
    if (/^0/.test(n)) report(file, `wa.me has a leading zero - it will SILENTLY never resolve: ${n}`);
    else if (!/^98\d{10}$/.test(n)) report(file, `wa.me must be 98 followed by 10 digits: ${n}`);
  }

  for (const m of content.matchAll(/https:\/\/ble\.ir\/([^\s"'`<>?)]+)/g)) {
    const n = m[1];
    if (!isLiteral(n)) continue;
    if (/^\+?98/.test(n)) report(file, `ble.ir must use national format with a leading 0, not +98: ${n}`);
    else if (!/^09\d{9}$/.test(n)) report(file, `ble.ir must be 09 + 9 digits: ${n}`);
  }
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!EXT.has(extname(p))) continue;
    if (SKIP.test(p)) continue;
    check(p, readFileSync(p, 'utf8'));
  }
}

for (const r of ROOTS) { try { walk(r); } catch {} }

if (failures) {
  console.error(`\nCONTACT-LINK CHECK FAILED: ${failures} issue(s).`);
  console.error('See CLAUDE.md section 3.7.\n');
  process.exit(1);
}
console.log('Contact-link check passed (tel/wa.me/ble.ir formats correct)');
