// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import preact from '@astrojs/preact';

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), preact(), expressiveCode()],
  site: 'https://eliottveyrier.github.io',
  base: '/'
});