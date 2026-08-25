/**
 * Persian text normalisation.
 *
 * This is the single most important function in the catalogue, and the failure
 * mode is silent: Persian search that "randomly" returns nothing.
 *
 * The problem is not the search algorithm, it is the encoding. Arabic yeh and
 * kaf are VISUALLY IDENTICAL to their Persian counterparts but are different
 * codepoints, and Iranian users type both depending on their keyboard:
 *
 *   ي U+064A  ARABIC YEH   vs  ی U+06CC  FARSI YEH
 *   ك U+0643  ARABIC KAF   vs  ک U+06A9  ARABIC LETTER KEHEH (the Persian one)
 *
 * Add ZWNJ (نیم‌فاصله U+200C), which splits words unpredictably, and three
 * separate digit systems, and a naive `includes()` misses most real queries.
 *
 * The SAME function must run over the build-time index and the runtime query.
 * Two copies will drift and the drift is invisible until a customer cannot
 * find a watch. Import it, never inline it.
 */

/** Persian digits ۰-۹ -> 0-9 */
const PERSIAN_DIGITS = /[۰-۹]/g;
/** Arabic-Indic digits ٠-٩ -> 0-9 (the shop's own Instagram bio mixes both) */
const ARABIC_DIGITS = /[٠-٩]/g;
/** Arabic yeh and alef maqsura -> Persian yeh */
const YEH = /[يى]/g;
/** Arabic kaf -> Persian keheh */
const KAF = /ك/g;
/** ZWNJ and other zero-width joiners -> space */
const ZERO_WIDTH = /[​-‍﻿]/g;
/** Arabic diacritics, which users almost never type but text sometimes carries */
const DIACRITICS = /[ً-ْٰ]/g;
/** Arabic/Persian punctuation that should not affect matching */
const PUNCT = /[،؛؟٪-٭‐-―.,;:!?'"()[\]{}\/\\_+*&-]/g;

/**
 * Normalise a Persian or Latin string for search comparison.
 * @param {string | null | undefined} input
 * @returns {string}
 */
export function norm(input) {
  if (input === null || input === undefined) return '';

  return String(input)
    .replace(YEH, 'ی')
    .replace(KAF, 'ک')
    .replace(DIACRITICS, '')
    .replace(ZERO_WIDTH, ' ')
    .replace(PERSIAN_DIGITS, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(ARABIC_DIGITS, (d) => String(d.charCodeAt(0) - 0x0660))
    .toLowerCase()
    .replace(PUNCT, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Build the searchable blob for one product. Used at build time to generate
 * the index, so the fields included here are the fields that are searchable.
 * @param {Record<string, unknown>} product
 * @returns {string}
 */
export function searchBlob(product) {
  const parts = [
    product.brand,
    product.brandFa,
    product.model,
    product.modelFa,
    product.reference,
    product.gender,
    product.movement,
    product.strap,
    product.dialColour,
    product.caseShape,
  ];
  return norm(parts.filter(Boolean).join(' '));
}

/**
 * Does a normalised blob match a raw user query?
 * Every whitespace-separated token must appear, so "seiko blue" narrows.
 * @param {string} blob already normalised
 * @param {string} query raw user input
 * @returns {boolean}
 */
export function matches(blob, query) {
  const q = norm(query);
  if (!q) return true;
  return q.split(' ').every((token) => blob.includes(token));
}

/** Latin digits -> Persian ۰-۹, for DISPLAY ONLY. Never use inside a tel: href. */
export function toPersianDigits(input) {
  return String(input ?? '').replace(/[0-9]/g, (d) =>
    String.fromCharCode(0x06f0 + Number(d)),
  );
}
