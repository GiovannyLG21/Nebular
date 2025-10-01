// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      GITHUB_PROFILE: envField.string({ access: 'public', context: 'client' })
    }
  },
  markdown: {
    syntaxHighlight: 'shiki',   
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'one-dark-pro',
      },
      wrap: true,        
    },
  }
});