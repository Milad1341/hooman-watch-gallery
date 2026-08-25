import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SHOP, telHref, whatsappHref, baleHref, primaryPhone } from './shop.js';

test('tel: hrefs are ASCII E.164', () => {
  assert.equal(telHref('02144697309'), 'tel:+982144697309');
  assert.equal(telHref('09123470889'), 'tel:+989123470889');
  assert.equal(telHref('0912-347-0889'), 'tel:+989123470889');
});

test('tel: href never contains Persian digits', () => {
  for (const p of SHOP.phones) {
    const href = telHref(p.national);
    assert.ok(/^tel:\+98\d+$/.test(href), `${href} must be ASCII`);
    assert.ok(!/[۰-۹٠-٩]/.test(href), `${href} must not contain Persian digits`);
  }
});

test('every configured phone produces a valid tel: href', () => {
  for (const p of SHOP.phones) {
    assert.doesNotThrow(() => telHref(p.national), `${p.national} should be valid`);
  }
});

test('wa.me uses the 98 prefix with no leading zero', () => {
  // The exact silent failure this guards: wa.me/0912... renders but never resolves
  assert.equal(whatsappHref('09123470889'), 'https://wa.me/989123470889');
  assert.ok(/^https:\/\/wa\.me\/98\d{9}/.test(whatsappHref(SHOP.whatsapp)));
});

test('wa.me refuses a landline', () => {
  // A landline cannot have WhatsApp. This is the second most likely bug.
  assert.throws(() => whatsappHref('02144697309'), /MOBILE/);
});

test('wa.me refuses an already-internationalised number', () => {
  assert.throws(() => whatsappHref('989123470889'));
  assert.throws(() => whatsappHref('+989123470889'));
});

test('wa.me encodes the pre-filled message', () => {
  const href = whatsappHref('09123470889', 'سلام، درباره SRPB41J1 سوال داشتم');
  assert.ok(href.startsWith('https://wa.me/989123470889?text='));
  assert.ok(!href.includes(' '), 'spaces must be percent-encoded');
});

test('Bale uses the OPPOSITE convention to WhatsApp: leading zero, no 98', () => {
  assert.equal(baleHref('09123470889'), 'https://ble.ir/09123470889');
});

test('the WhatsApp number is one of the shop phones, and is a mobile', () => {
  const match = SHOP.phones.find((p) => p.national === SHOP.whatsapp);
  assert.ok(match, 'WhatsApp number must be one of the published phones');
  assert.ok(/^09/.test(SHOP.whatsapp), 'WhatsApp must be on a mobile');
  assert.ok(match.whatsapp, 'that phone should be flagged whatsapp:true');
});

test('there is exactly one primary phone and it is the landline', () => {
  assert.equal(SHOP.phones.filter((p) => p.primary).length, 1);
  assert.equal(primaryPhone.national, '02144697309');
});

test('hours are a split shift with two entries', () => {
  assert.equal(SHOP.hours.length, 2, 'a single range would send customers to a closed shop');
  assert.equal(SHOP.hours[0].closes, '14:00');
  assert.equal(SHOP.hours[1].opens, '17:00');
});

test('certified brands match what the owner confirmed', () => {
  assert.deepEqual(SHOP.certifiedFor, ['seiko', 'citizen', 'casio', 'g-shock']);
});

test('no shop copy contains an em-dash', () => {
  const strings = [SHOP.nameFa, SHOP.descriptionFa, SHOP.address.fa];
  for (const s of strings) {
    assert.ok(!s.includes('—'), `em-dash found in: ${s}`);
    assert.ok(!s.includes('–'), `en-dash found in: ${s}`);
  }
});
