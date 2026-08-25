/**
 * Single source of truth for the shop's own facts.
 *
 * Everything here was confirmed by the owner (see docs/research/CLIENT-PROFILE.md).
 * Nothing in this file may be invented. If a value is unknown, leave it null and
 * let the page omit the section rather than guess.
 */

export const SHOP = {
  nameFa: 'گالری ساعت هومن',
  nameLatin: 'Hooman Watch Gallery',
  descriptionFa:
    'نمایندگی رسمی سیکو، سیتیزن و کاسیو در شهرک اکباتان تهران. بیش از ۱۰۰۰ مدل ساعت مچی اصل، از سال ۱۳۸۹.',

  foundedYear: 2010,
  foundedYearFa: 1389, // TODO: confirm with owner - the Gregorian/Shamsi boundary falls in March
  contactPerson: 'همتی',

  address: {
    fa: 'تهران، شهرک اکباتان، فاز یک، بازارچه شماره ۱۰، پلاک ۳',
    city: 'تهران',
    region: 'تهران',
    country: 'IR',
  },

  geo: { lat: 35.71213, lng: 51.312458 },

  /**
   * Contact channels. Three different link formats, three different
   * conventions. NEVER derive one from another.
   *
   *   tel:      +98 prefix, ASCII digits only     (RFC 3966)
   *   wa.me:    98 prefix, NO leading zero        (a leading 0 fails SILENTLY)
   *   ble.ir:   leading zero, NO +98
   */
  phones: [
    { national: '02144697309', display: '021-44697309', label: 'تلفن مغازه', primary: true },
    { national: '09123470889', display: '0912-347-0889', label: 'موبایل', whatsapp: true },
    { national: '09399141497', display: '0939-914-1497', label: 'موبایل' },
  ],

  /** Must be a MOBILE number. A landline cannot have WhatsApp. */
  whatsapp: '09123470889',

  /** Domestic messenger, works without a VPN. Unconfirmed - ask before publishing. */
  bale: null,

  instagram: 'hooman_watchgallery',

  /**
   * Open all seven days, split shift. This needs TWO entries per day - a single
   * 11:00-22:00 range would send customers to a shop closed for the afternoon.
   */
  hours: [
    { opens: '11:00', closes: '14:00' },
    { opens: '17:00', closes: '22:00' },
  ],

  /** Brands the shop is a CERTIFIED RESELLER for. Not a distributor. */
  certifiedFor: ['seiko', 'citizen', 'casio', 'g-shock'],

  /** Roughly how many models are in the shop, for the "call to see the rest" line. */
  modelsInStore: 1000,

  services: { repairs: true, batteryReplacement: true },
};

/** ASCII E.164 for a tel: href. Persian digits will not dial. */
export function telHref(national) {
  const e164 = '+98' + String(national).replace(/\D/g, '').replace(/^0/, '');
  if (!/^\+98\d{9,10}$/.test(e164)) {
    throw new Error(`telHref: "${national}" is not a valid Iranian number (got "${e164}")`);
  }
  return `tel:${e164}`;
}

/**
 * WhatsApp deep link.
 *
 * The silent failure this guards against: wa.me/09123470889 does NOT error.
 * It renders "Chat with 09123470889" and never resolves, because it has no
 * country code. It must be wa.me/989123470889.
 */
export function whatsappHref(national, text) {
  const digits = String(national).replace(/\D/g, '');
  if (!/^09\d{9}$/.test(digits)) {
    throw new Error(
      `whatsappHref: "${national}" must be an Iranian MOBILE in national format (09XXXXXXXXX). ` +
        `A landline cannot have WhatsApp.`,
    );
  }
  const intl = '98' + digits.slice(1);
  const base = `https://wa.me/${intl}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Bale deep link. Note the OPPOSITE convention: leading zero, no +98. */
export function baleHref(national) {
  const digits = String(national).replace(/\D/g, '');
  if (!/^09\d{9}$/.test(digits)) {
    throw new Error(`baleHref: "${national}" must be an Iranian mobile (09XXXXXXXXX)`);
  }
  return `https://ble.ir/${digits}`;
}

export const primaryPhone = SHOP.phones.find((p) => p.primary) ?? SHOP.phones[0];
