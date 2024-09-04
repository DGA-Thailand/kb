import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// import netlify from "@astrojs/netlify";
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Resource Center',
    logo: {
      src: './src/assets/images/dga-logo.svg'
    },
    customCss: ['@fontsource/ibm-plex-sans-thai'],
    social: {
      github: 'https://github.com/DGA-Thailand/kb'
    },
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
      label: 'Citizen Portal',
      autogenerate: {
        directory: 'czp'
      }
    }, {
      label: 'GDX',
      autogenerate: {
        directory: 'gdx'
      }
    }, {
      label: 'Digital ID',
      autogenerate: {
        directory: 'digital-id'
      }
    }, {
      label: 'SME One ID',
      autogenerate: {
        directory: 'sme'
      }
    }, {
      label: 'e-Document',
      autogenerate: {
        directory: 'edoc'
      }
    }, {
      label: 'Service Request and Tracking (SRAT)',
      autogenerate: {
        directory: 'backend'
      }
    }, {
      label: 'e-Payment',
      autogenerate: {
        directory: 'epayment'
      }
    }, {
      label: 'Law Portal',
      autogenerate: {
        directory: 'law'
      }
    }, {
      label: 'Smart Kiosk',
      autogenerate: {
        directory: 'kiosk'
      }
    }]
  }), 
  tailwind(),
  mdx(), 
  sitemap(),
  partytown({
      config: {
        forward: ["dataLayer.push"],
      },
  }),]
});
