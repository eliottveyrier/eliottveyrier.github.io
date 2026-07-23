// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import preact from '@astrojs/preact';

import expressiveCode from 'astro-expressive-code';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [expressiveCode({
    // Replace the default themes with a custom set of bundled themes:
    // "dracula" (a dark theme) and "solarized-light"
    themes: ['dracula', 'solarized-light'],
  }), mdx(), preact(), icon()],
  site: 'https://eliottveyrier.github.io',
  base: '/'
});