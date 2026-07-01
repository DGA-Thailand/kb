import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kb.dga.or.th',
  integrations: [starlight({
    title: 'Resource Center',
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
  mdx(), 
  sitemap(),
  partytown({
      config: {
        forward: ["dataLayer.push"],
      },
  }),]
});
