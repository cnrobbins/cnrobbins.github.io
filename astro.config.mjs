import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cnrobbins.github.io',
  base: '/',
  integrations: [sitemap()],
  build: {
    assets: 'assets'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/styles/variables.scss";'
        }
      }
    }
  }
}); 