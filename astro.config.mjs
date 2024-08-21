import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// import netlify from "@astrojs/netlify";

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
  }), tailwind()]
});