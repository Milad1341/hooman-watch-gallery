# Project status

One page: what is planned, what is built, and what happens next.

Last updated 2026-08-25.

---

## The brief said planning mode. Some code exists. Here is why.

The original brief said *"im not asking you to create the site right now this is planning
mode."* Planning was delivered in full: `CLAUDE.md`, nine phase documents, eight research
documents.

Then came two explicit instructions - **"start phase 1"**, and after it finished,
**"continue exactly where we left off"** - and Phases 01 and 02 were executed against them.

**That is the entire discrepancy.** It is recorded here rather than buried, so nobody
reading this repo later has to reconstruct it.

**The product constraint was never broken.** The brief said *"we will not want to upload any
product, I will just tell you the watches we have."* Verified:

| | |
|---|---|
| `src/data/products.json` | does not exist |
| `src/data/brands.json` | does not exist |
| watch photographs in repo | 0 |

The four cards on `/design-preview/` are **typographic specimens**, not a catalogue. They
show how a card composes: brand line, model line, mono reference. They get deleted the
moment real watches arrive.

---

## State

| | | |
|---|---|---|
| **Planning** | done | `CLAUDE.md`, `docs/phases/`, `docs/research/` |
| **Phase 00** Owner intake | answered | 3 minor gaps remain |
| **Phase 01** Foundation | built, **parked** | Astro, fonts, RTL, guards, 28 tests |
| **Phase 02** Brand system | built, **parked** | logo SVG, tokens, `/design-preview/` |
| **Phase 03** Content model | **blocked** | needs the watch list |
| Phases 04 to 08 | planned only | |

---

## The repo is now plan-only, as the brief asked

The Phase 01 and 02 build has been **moved to `.parked-build/`**, not deleted. The working
tree now contains exactly what the brief asked for: the plan, the research, and the logo.

```
CLAUDE.md            the decisions
docs/phases/         9 phase files, in order
docs/research/       8 research files
assets/brand/        the original logo
PROJECT-STATUS.md    this file
```

### To put the build back

```bash
bash RESTORE-BUILD.sh
```

One command, instant, no reinstall - `node_modules` was parked too. Nothing was lost.

### What is in there

Font subsetting (193KB to 55KB, Persian coverage verified glyph by glyph), the Persian
search normaliser with 28 passing tests, four build guards, the parametric logo rebuild,
and the design preview page.

---

## What unblocks Phase 03

**The watch list.** Per brand, ideally:

```
Brand · Model · Reference · Gender · Case size · Movement · Strap · Dial colour
SEIKO · Presage Cocktail Time · SRPB41J1 · men · 40.5mm · automatic · leather · blue
```

**The reference number matters most.** It is the highest-density authenticity signal
available and costs one field. Counterfeit and dropship listings never carry them, because
they scrape marketing names instead of reading the caseback.

Everything else can be filled in or looked up. A brand and a reference is enough to start.

## Worth reviewing first

```bash
npm run dev     # then open localhost:4321/design-preview/
```

Rejecting the palette or the card composition now costs minutes. After fifty components it
costs a rebuild. That is the whole reason the preview page exists.
