// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Hooman Watch Gallery
// Static output only. No adapter, no islands, no CI. See CLAUDE.md.
export default defineConfig({
  // PREVIEW deployment on GitHub Pages. `base` is required because Pages
  // serves the repo at a subpath, and every asset href has to carry it.
  //
  // For the real launch on an Iranian host (Phase 08) this becomes
  // site: 'https://hoomanwatch.ir' and `base` is removed entirely.
  site: 'https://milad1341.github.io',
  base: '/hooman-watch-gallery',

  output: 'static',

  // Single locale. A neighbourhood shop in Tehran serves Persian-speaking
  // walk-in customers; a second locale doubles the authoring burden for
  // near-zero conversion gain. See CLAUDE.md section 4.
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa'],
  },

  image: {
    // AVIF effort 4 trades a little file size for a build that finishes.
    // Measure with the Phase 04 probe before changing this.
    experimentalDefaultStyles: false,
  },

  build: {
    // 'auto', not 'always'. Inlining looked right for a single page, but the
    // stylesheet is ~25KB and there are 61 pages - 'always' duplicated 1.5MB
    // across the build and made the CSS uncacheable. A visitor browsing four
    // watches downloaded it four times.
    //
    // 'auto' inlines only small sheets and links the rest, so the CSS is
    // fetched once and cached for every subsequent page. Costs one round trip
    // on first load, saves 25KB on every page after it.
    inlineStylesheets: 'auto',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep the JS budget honest. See CLAUDE.md section 3.3.
      assetsInlineLimit: 2048,
    },
  },
});
