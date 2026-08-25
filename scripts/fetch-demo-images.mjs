#!/usr/bin/env node
/**
 * Fetch DEMO product photography from Openverse (CC-licensed, commercial-use).
 *
 * WHY NOT THE BRAND SITES: manufacturer product photos are copyright and a
 * reseller has no right to republish them. First sale does not touch the
 * reproduction right, and there is no fair-use argument for using a whole
 * professional photo commercially to sell the same product.
 *
 * WHY NOT WIKIMEDIA COMMONS: tried it first. Licences were clean but the
 * photos were wrong - Commons' watch coverage is mostly movements shot through
 * the caseback and disassembled repair shots. Free-licensed is not the same as
 * usable product photography. Openverse aggregates Flickr, which has real
 * face-on watch photos.
 *
 * ONE IMAGE PER PRODUCT, not per brand. Sharing a brand-level image put four
 * identical photos in a row and the grid looked broken.
 *
 * These are DEMO stand-ins. They do NOT depict Hooman's actual stock or the
 * referenced models. Every licence and author is recorded in
 * demo-credits.json; attribution must survive if any of these ship. Replace
 * with the shop's own photography per PHASE-04.
 *
 *   node scripts/fetch-demo-images.mjs
 */
import { mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'src/assets/watches';
const UA = 'HoomanWatchGallery/1.0 (static site demo assets)';
const API = 'https://api.openverse.org/v1/images/';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Search terms per brand. Generic where a brand has no CC coverage. */
const TERMS = {
  seiko: 'seiko watch',
  citizen: 'citizen watch',
  casio: 'casio watch',
  'g-shock': 'g-shock watch',
  timex: 'timex watch',
  qq: 'quartz wristwatch dial',
  obaku: 'minimalist watch white dial',
  'daniel-klein': 'classic wristwatch dial',
  guess: 'chronograph wristwatch',
  esprit: 'ladies wristwatch',
  'tommy-hilfiger': 'steel bracelet watch',
  cat: 'rugged field watch',
  extri: 'sports chronograph watch',
  julius: 'slim gold watch',
};

async function search(q, n = 12) {
  const url = `${API}?${new URLSearchParams({
    q,
    license_type: 'all-cc,commercial',
    size: 'medium',
    page_size: String(n),
    mature: 'false',
  })}`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(String(r.status));
  await sleep(400);
  const d = await r.json();
  // Openverse returns anything tagged with the brand - factory buildings,
  // magazine scans, shop fronts. Drop titles that clearly are not a watch.
  const NOT_A_WATCH =
    /\b(building|factory|headquarters|office|store|shop|museum|advert|advertisement|magazine|poster|catalog|catalogue|logo|sign|billboard|box|packaging|manual|book|stamp|coin|banner|booth|exhibition|showroom|street|city|tower|plant)\b/i;

  return (d.results ?? [])
    .filter((x) => x.url && x.license)
    .filter((x) => !NOT_A_WATCH.test(x.title ?? ''))
    .map((x) => ({
      url: x.url,
      title: (x.title ?? '').slice(0, 90),
      licence: `CC ${String(x.license).toUpperCase()}${x.license_version ? ' ' + x.license_version : ''}`,
      author: x.creator ?? 'Unknown',
      source: x.foreign_landing_url ?? x.url,
    }));
}

const products = JSON.parse(await readFile('src/data/products.json', 'utf8')).products;

// Clear previous demo images so a re-run never leaves stale ones behind.
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const credits = [];
let ok = 0;
let fail = 0;

// Group by brand so each brand's results spread across its own products.
const byBrand = {};
for (const p of products) (byBrand[p.brand] ??= []).push(p);

for (const [brand, list] of Object.entries(byBrand)) {
  let pool = [];
  try {
    pool = await search(TERMS[brand] ?? `${brand} watch`, Math.max(12, list.length + 4));
  } catch (e) {
    console.log(`  ${brand.padEnd(16)} search failed (${e.message})`);
  }
  if (!pool.length) {
    try {
      pool = await search('wristwatch dial', 12);
    } catch {
      /* fall through to the failure count below */
    }
  }

  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    const pick = pool.length ? pool[i % pool.length] : null;
    if (!pick) {
      fail++;
      continue;
    }

    const file = `${p.slug}.jpg`;
    try {
      const res = await fetch(pick.url, { headers: { 'User-Agent': UA } });
      if (!res.ok) throw new Error(String(res.status));
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 5000) throw new Error('too small, probably an error page');
      await writeFile(path.join(OUT, file), buf);
      credits.push({ product: p.slug, brand, file, ...pick });
      ok++;
    } catch (e) {
      console.log(`  ${p.slug.padEnd(28)} failed (${e.message})`);
      fail++;
    }
    await sleep(150);
  }
  console.log(`  ${brand.padEnd(16)} ${String(list.length).padStart(2)} product(s), pool ${pool.length}`);
}

await writeFile(
  path.join(OUT, 'demo-credits.json'),
  JSON.stringify(
    {
      _note:
        'DEMO images from Openverse (CC-licensed, commercial use). These are NOT Hooman ' +
        'Watch Gallery stock and do NOT depict the referenced models. Attribution below ' +
        'must be preserved if any ship. Replace per PHASE-04.',
      images: credits,
    },
    null,
    2,
  ) + '\n',
);

console.log(`\n  ${ok} images, ${fail} failed`);
