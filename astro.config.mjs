import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'DGA Docs',
    customCss: ['@fontsource/noto-sans-thai/400.css', '@fontsource/noto-sans-thai/600.css'],
    social: {
      github: 'https://github.com/withastro/starlight'
    },
    sidebar: [{
      label: 'Citizen Portal',
      autogenerate: {
        directory: 'czp'
      }
    }, {
      label: 'GDX',
      autogenerate: {
        directory: 'gdx'
      }
    }]
  })],
  output: "server",
  adapter: netlify({
	edgeMiddleware: true 
  })
});