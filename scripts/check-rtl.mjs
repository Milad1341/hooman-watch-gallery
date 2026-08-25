#!/usr/bin/env node
/**
 * Fail the build on physical-direction CSS utilities.
 *
 * Tailwind v4 supports logical properties natively, so RTL is nearly free -
 * but ONE physical-direction utility is what breaks an RTL layout, and it
 * will be added by accident by someone who does not read Persian. The bug is
 * invisible in a DOM snapshot and often invisible to the author.
 *
 * Also catches letter-spacing on Persian text, which breaks Arabic-script
 * joining and turns connected words into loose letters.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['src'];
const EXT = new Set(['.astro', '.css', '.html', '.js', '.ts', '.jsx', '.tsx']);

const BANNED = [
  // Tailwind physical-direction utilities. Word-boundary anchored so that
  // logical utilities (ms-, me-, ps-, pe-) and unrelated words do not match.
  { re: /(?<![\w-])(ml|mr|pl|pr)-(\d+|px|auto|\[)/g, fix: 'use ms-/me-/ps-/pe-' },
  { re: /(?<![\w-])(left|right)-(\d+|px|auto|full|\[)/g, fix: 'use start-/end- or inset-inline-*' },
  { re: /(?<![\w-])text-(left|right)(?![\w-])/g, fix: 'use text-start / text-end' },
  { re: /(?<![\w-])(border|rounded)-(l|r)(?![\w-])/g, fix: 'use -s / -e (inline start/end)' },
  { re: /(?<![\w-])float-(left|right)(?![\w-])/g, fix: 'use float-start / float-end' },
  // Raw CSS
  { re: /(?<![-\w])(margin|padding)-(left|right)\s*:/g, fix: 'use -inline-start / -inline-end' },
  { re: /(?<![-\w])text-align\s*:\s*(left|right)/g, fix: 'use start / end' },
];

// letter-spacing is only legal on explicitly-Latin label classes.
// Capture the VALUE rather than using a lookahead: `\s*` can backtrack to
// match zero characters, which makes a naive `(?!0)` test the whitespace
// instead of the value and pass everything.
const LETTER_SPACING = /letter-spacing\s*:\s*([^;}\n]+)/g;
const TRACKING = /(?<![\w-])tracking-([\w[\]./-]+)/g;

/** A declaration is allowed if its enclosing rule is explicitly Latin. */
function inLatinContext(content, index) {
  const before = content.slice(Math.max(0, index - 400), index);
  const lines = before.split('\n').slice(-8).join('\n');
  return /\.label|\.reference|--font-mono|font-mono|latin|\bltr\b/i.test(lines);
}

let failures = 0;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!EXT.has(extname(p))) continue;
    check(p, readFileSync(p, 'utf8'));
  }
}

function report(file, content, index, msg) {
  const line = content.slice(0, index).split('\n').length;
  console.error(`  ${file}:${line}  ${msg}`);
  failures++;
}

function check(file, content) {
  for (const { re, fix } of BANNED) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content))) {
      report(file, content, m.index, `physical direction "${m[0]}" - ${fix}`);
    }
  }

  // Tracking is legal only inside an explicitly-Latin rule, and only when
  // the value is actually non-zero.
  for (const re of [LETTER_SPACING, TRACKING]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content))) {
      const value = (m[1] ?? '').trim();
      if (value === '0' || value === 'normal' || /^0[a-z%]*$/.test(value)) continue;
      if (inLatinContext(content, m.index)) continue;
      report(
        file,
        content,
        m.index,
        `letter-spacing "${value}" outside a Latin label - it breaks Persian script joining`,
      );
    }
  }
}

for (const r of ROOTS) {
  try { walk(r); } catch { /* directory may not exist yet */ }
}

if (failures) {
  console.error(`\nRTL check FAILED: ${failures} issue(s).`);
  console.error('See CLAUDE.md section 3.4.\n');
  process.exit(1);
}
console.log('RTL check passed (logical properties only, no Persian tracking)');
