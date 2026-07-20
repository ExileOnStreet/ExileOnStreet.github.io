import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from "@astrojs/sitemap";
export default defineConfig({
   base: '/swissfolio',
   vite: {
    plugins: [tailwindcss()],
  },
  // add yur domain name here
  site: 'https://exileonstreet.github.io',
  compressHTML: true,
  integrations: [sitemap()]
});
