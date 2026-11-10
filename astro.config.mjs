import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cnrobbins.github.io',
  integrations: [sitemap()],
  build: {
    assets: 'assets',
  },
  // Old project URLs that were live on the site.
  redirects: {
    '/projects/actuator-design': '/projects/exoskeleton-hardware-design',
    '/projects/assistive-device-optimization': '/projects',
  },
});
