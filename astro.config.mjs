// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      GITHUB_PROFILE: envField.string({ access: 'public', context: 'client' })
    }
  }
});