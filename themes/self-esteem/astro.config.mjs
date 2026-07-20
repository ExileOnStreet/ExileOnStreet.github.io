import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://exileonstreet.github.io',
  base: '/self-esteem',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
});
