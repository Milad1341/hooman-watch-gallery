# Documentation index

## Start here

**[`../CLAUDE.md`](../CLAUDE.md)** - the decisions. Read before touching anything.

## Phases - work through in order

Each phase has a definition of done. Do not start one before the previous is closed.

| | Phase | Blocks |
|---|---|---|
| [00](phases/PHASE-00-owner-intake.md) | **Owner intake** | everything |
| [01](phases/PHASE-01-foundation.md) | Foundation - repo, Astro, pins, fonts, RTL | 02+ |
| [02](phases/PHASE-02-brand-system.md) | Brand system - logo SVG, tokens, type, motion | 05 |
| [03](phases/PHASE-03-content-model.md) | Content model - schema, brands, Persian copy | 04, 05 |
| [04](phases/PHASE-04-imagery.md) | Imagery - legal position, shooting, pipeline | 05 |
| [05](phases/PHASE-05-build.md) | Build - pages, catalogue, contact surfaces | 06, 07 |
| [06](phases/PHASE-06-trust-and-seo.md) | Trust and SEO - JSON-LD, Persian SEO, previews | 08 |
| [07](phases/PHASE-07-performance-qa.md) | Performance and QA - budgets, RTL, a11y | 08 |
| [08](phases/PHASE-08-launch-handover.md) | Launch and handover | - |

## Research

| File | What it settles |
|---|---|
| [`CLIENT-PROFILE.md`](research/CLIENT-PROFILE.md) | Who the shop is. Address, phones, brands, the dealer claim. **Open questions for the owner live here.** |
| [`COMPETITORS.md`](research/COMPETITORS.md) | IranTimer, ttbol, watchstore, iwatch. What we compete on, and what we do not. |
| [`VERIFIED-FINDINGS.md`](research/VERIFIED-FINDINGS.md) | Checked by hand rather than from search snippets. TLS, Persian typography, the Maps gap. |
| [`PERSIAN-MARKET-INTEL.md`](research/PERSIAN-MARKET-INTEL.md) | Persian brand spellings, how Iranians filter, real price bands, SEO strategy. |
| [`LOGO-GEOMETRY.md`](research/LOGO-GEOMETRY.md) | Measured logo geometry and the design-system consequence. |
| [`BRANDS.md`](research/BRANDS.md) | **Persian spellings and collision traps for all 14 brands.** Read before writing any catalogue copy. |
| [`CATALOGUE-SCALE.md`](research/CATALOGUE-SCALE.md) | Why the catalogue is ~175 curated models and not 1,000. |
| [`RESEARCH-DOSSIER.md`](research/RESEARCH-DOSSIER.md) | Full 17-lane dossier, adversarially verified. 22 of 22 claims corrected. |

## The five things most likely to break this project

1. **Hosting the site somewhere Iranians cannot reach it.** Vercel, Netlify, Render and
   Firebase all fail for Iranian visitors. See `CLAUDE.md` §3.1.
2. **Any Google dependency.** Fonts, Analytics, Maps, reCAPTCHA all hang for the actual
   audience. Zero third-party requests. See §3.2.
3. **A `wa.me` link built from a `09…` number.** It does not error - it renders and silently
   never resolves. See §3.7.
4. **Persian search returning nothing** because Arabic and Persian yeh/kaf were not
   normalised. See §3.5.
5. **An Iranian host that geo-blocks foreign IPs**, so Googlebot never crawls and the site
   is never indexed. See Phase 06 §4.
6. **Targeting bare `کاسیو` or matching on the `کاتر` prefix.** The first sells calculators
   and cameras; the second returns cutting plotters and cosmetics. See `BRANDS.md` traps 1-2.

## Conventions

- No em-dashes in any user-facing string. Hyphens only.
- Persian digits ۰-۹ in visible text; ASCII in `tel:` hrefs.
- Logical CSS properties only. Never `ml-` `mr-` `pl-` `pr-` `left-` `right-`.
- No prices. `تماس بگیرید`.
- Verify in a real browser before claiming done.
