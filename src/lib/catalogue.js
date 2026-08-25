/**
 * Catalogue helpers. One place that knows how products and brands join up,
 * so no page has to re-derive it.
 */
import { searchBlob } from './normalize.js';
import productData from '../data/products.json';
import brandData from '../data/brands.json';

export const brands = brandData.brands;
export const brandByKey = Object.fromEntries(brands.map((b) => [b.key, b]));

/** Products, each enriched with its brand and a prebuilt normalised blob. */
export const products = productData.products.map((p) => {
  const brand = brandByKey[p.brand];
  if (!brand) throw new Error(`products.json: unknown brand "${p.brand}" on ${p.slug}`);
  return {
    ...p,
    brandLatin: brand.latin,
    brandFa: brand.fa,
    // Brand variants go into the blob so a search for سیتی زن finds سیتیزن watches.
    blob: searchBlob({ ...p, brandFa: [brand.fa, ...(brand.variants ?? [])].join(' ') }),
  };
});

export const catalogueUpdated = productData._updated;

export function byBrand(key) {
  return products.filter((p) => p.brand === key);
}

/** Gender labels. Iranian retail splits kids by gender; `set` is couple watches. */
export const GENDERS = {
  men: 'مردانه',
  women: 'زنانه',
  unisex: 'اسپرت و یونیسکس',
  set: 'ست',
  girls: 'دخترانه',
  boys: 'پسرانه',
  kids: 'بچگانه',
};

/** Case shape is a first-class filter in Iran, unlike most Western sites. */
export const SHAPES = {
  round: 'دایره',
  square: 'مربع',
  rectangle: 'مستطیل',
  oval: 'بیضی',
};

export const MOVEMENTS = {
  quartz: 'کوارتز',
  automatic: 'اتوماتیک',
  'eco-drive': 'اکو درایو',
  solar: 'خورشیدی',
  kinetic: 'کینتیک',
};

export const STRAPS = {
  steel: 'استیل',
  leather: 'چرم',
  resin: 'رزین',
  mesh: 'حصیری',
  fabric: 'پارچه',
};

export const CRYSTALS = { mineral: 'معدنی', hardlex: 'هاردلکس', sapphire: 'سافایر' };

export const MATERIALS = {
  'stainless-steel': 'استیل ضدزنگ',
  resin: 'رزین',
  brass: 'برنج',
  titanium: 'تیتانیوم',
};

/** Facet counts, so a filter never offers an option that returns nothing. */
export function facets(list = products) {
  const count = (key) =>
    list.reduce((acc, p) => {
      const v = p[key];
      if (v) acc[v] = (acc[v] ?? 0) + 1;
      return acc;
    }, {});
  return {
    brand: count('brand'),
    gender: count('gender'),
    caseShape: count('caseShape'),
    movement: count('movement'),
    strap: count('strap'),
  };
}
