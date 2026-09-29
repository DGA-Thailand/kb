import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import emdash from 'emdash/astro';
import { d1, r2 } from '@emdash-cms/cloudflare';

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap';

// This is set only by `npm run build:authoring`. Wrangler must serve a built
// Worker, while EmDash enables the bypass only for Astro dev builds.
const isLocalAuthoringBuild = process.env.EMDASH_LOCAL_AUTHORING === '1';

// https://astro.build/config
export default defineConfig({
  site: 'https://kb.dga.or.th',
  output: 'server',
  adapter: cloudflare(),
  integrations: [starlight({
    title: 'Resource Center',
    // Cloudflare Workers does not provide Node's WASI runtime during static
    // prerendering. Keep legacy Starlight pages server-rendered during the
    // EmDash content cutover instead.
    prerender: false,
    logo: {
      src: './src/assets/images/dga-logo.svg'
    },
    customCss: ['@fontsource/ibm-plex-sans-thai'],
    social: [
      {
        icon: 'github',
        label: 'GitHub',
        href: 'https://github.com/DGA-Thailand/kb'
      }
    ],
    // Add a script for Google Tag Manager.
    head: [
      {
        tag: 'script',
        // Content truncated for brevity.
        content: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}; gtag('js', new Date()); gtag('config', 'G-0JY4JVH3K5');",
      },
    ],
    // Replace the built-in <SkipLink/> component.
    components: {
      // Relative path to the custom component.
      SkipLink: './src/components/SkipLink.astro',
    },
    sidebar: [{
      label: 'Cloud First Policy',
      items: [{ autogenerate: { directory: 'cloud' } }]
    }, {
      label: 'Citizen Portal',
      items: [{ autogenerate: { directory: 'czp' } }]
    }, {
      label: 'Biz Portal',
      items: [{ autogenerate: { directory: 'biz' } }]
    }, {
      label: 'GDX',
      items: [{ autogenerate: { directory: 'gdx' } }]
    }, {
      label: 'Digital ID',
      items: [{ autogenerate: { directory: 'digital-id' } }]
    }, {
      label: 'SME One ID',
      items: [{ autogenerate: { directory: 'sme' } }]
    }, {
      label: 'e-Document',
      items: [{ autogenerate: { directory: 'edoc' } }]
    }, {
      label: 'Service Request and Tracking (SRAT)',
      items: [{ autogenerate: { directory: 'backend' } }]
    }, {
      label: 'e-Payment',
      items: [{ autogenerate: { directory: 'epayment' } }]
    }, {
      label: 'Law Portal',
      items: [{ autogenerate: { directory: 'law' } }]
    }, {
      label: 'Smart Kiosk',
      items: [{ autogenerate: { directory: 'kiosk' } }]
    }]
  }),
  // EmDash runs alongside Starlight during the content cutover so every
  // existing public documentation URL remains available for review.
  react(),
  emdash({
    database: d1({ binding: 'DB' }),
    storage: r2({ binding: 'MEDIA' }),
  }),
  mdx(), 
  sitemap(),
  partytown({
      config: {
        forward: ["dataLayer.push"],
      },
  }),],
  vite: isLocalAuthoringBuild ? {
    plugins: [{
      name: 'emdash-local-authoring-bypass',
      enforce: 'pre',
      transform(code, id) {
        if (!id.includes('/emdash/dist/astro/routes/api/') || !id.endsWith('dev-bypass.mjs')) {
          return null;
        }

        // Scope this replacement to EmDash’s two local-only bypass endpoints.
        // A global import.meta.env.DEV override would also alter Astro itself.
        return code.replace('import.meta.env.DEV', 'true');
      },
    }],
  } : {},
});
