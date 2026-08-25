import { test } from 'node:test';
import assert from 'node:assert/strict';
import { norm, matches, searchBlob, toPersianDigits } from './normalize.js';

// The four hazards that make Persian catalogue search fail silently.
// Each pair below is two spellings a real user might type for the same thing.

test('Arabic yeh and Persian yeh normalise to the same string', () => {
  // ي U+064A vs ی U+06CC - visually identical, different codepoints
  assert.equal(norm('ساعت مچي'), norm('ساعت مچی'));
  assert.equal(norm('سيکو'), norm('سیکو'));
});

test('Arabic kaf and Persian keheh normalise to the same string', () => {
  // ك U+0643 vs ک U+06A9
  assert.equal(norm('كاسيو'), norm('کاسیو'));
  assert.equal(norm('كیو اند كیو'), norm('کیو اند کیو'));
});

test('alef maqsura folds to Persian yeh', () => {
  assert.equal(norm('مچى'), norm('مچی'));
});

test('Persian digits normalise to Latin', () => {
  assert.equal(norm('۱۲۳'), '123');
  assert.equal(norm('۰۹۱۲۳۴۷۰۸۸۹'), '09123470889');
});

test('Arabic-Indic digits normalise to Latin', () => {
  // The shop's own Instagram bio mixes both systems
  assert.equal(norm('٤٤٦٩٧٣٠٩'), '44697309');
  assert.equal(norm('٤٤٦٩٧٣٠٩'), norm('۴۴۶۹۷۳۰۹'));
});

test('ZWNJ is treated as a space', () => {
  // نیم‌فاصله U+200C
  assert.equal(norm('نیم‌فاصله'), norm('نیم فاصله'));
});

test('diacritics are stripped', () => {
  assert.equal(norm('سَاعَت'), norm('ساعت'));
});

test('case and whitespace are folded', () => {
  assert.equal(norm('  SEIKO   Presage  '), 'seiko presage');
  assert.equal(norm('SRPB41J1'), 'srpb41j1');
});

test('punctuation does not block a match', () => {
  assert.equal(norm('Q&Q'), norm('Q Q'));
  assert.equal(norm('GA-2100'), norm('GA 2100'));
});

test('null and undefined are safe', () => {
  assert.equal(norm(null), '');
  assert.equal(norm(undefined), '');
  assert.equal(norm(''), '');
});

test('reference numbers stay findable after normalisation', () => {
  // Model references are ASCII on the caseback and that is how people type them
  const blob = searchBlob({ brand: 'Seiko', reference: 'SRPB41J1', model: 'Presage' });
  assert.ok(matches(blob, 'SRPB41J1'));
  assert.ok(matches(blob, 'srpb41j1'));
});

test('matches() requires every token, so queries narrow', () => {
  const blob = searchBlob({
    brand: 'Seiko',
    brandFa: 'سیکو',
    model: 'Presage Cocktail Time',
    reference: 'SRPB41J1',
    dialColour: 'blue',
  });
  assert.ok(matches(blob, 'seiko'));
  assert.ok(matches(blob, 'seiko blue'));
  assert.ok(matches(blob, 'سیکو'), 'Persian brand name must match');
  assert.ok(matches(blob, 'سيکو'), 'Arabic-yeh spelling must match too');
  assert.ok(!matches(blob, 'seiko green'), 'a non-matching token must exclude');
});

test('empty query matches everything', () => {
  assert.ok(matches(searchBlob({ brand: 'Casio' }), ''));
  assert.ok(matches(searchBlob({ brand: 'Casio' }), '   '));
});

test('toPersianDigits is display-only and reversible by norm()', () => {
  assert.equal(toPersianDigits('021'), '۰۲۱');
  assert.equal(norm(toPersianDigits('44697309')), '44697309');
});

test('the real-world case: Q&Q typed four different ways', () => {
  const blob = searchBlob({
    brand: 'Q&Q',
    brandFa: 'کیو اند کیو',
    model: 'Superior',
    reference: 'S21A-00',
  });
  assert.ok(matches(blob, 'Q&Q'));
  assert.ok(matches(blob, 'q q'));
  assert.ok(matches(blob, 'کیو اند کیو'), 'Persian keheh spelling');
  assert.ok(matches(blob, 'كیو اند كیو'), 'Arabic kaf spelling');
  assert.ok(matches(blob, 'S21A-00'));
});
