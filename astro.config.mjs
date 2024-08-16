import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'DGA Docs',
    customCss: ['@fontsource/noto-sans-thai/400.css', '@fontsource/noto-sans-thai/600.css'],
    social: {
      github: 'https://github.com/DGA-Thailand/kb'
    },
    editLink: {
      baseUrl: "https://github.com/DGA-Thailand/kb/edit/main/docs/"
    },
    sidebar: [{
      label: 'Citizen Portal',
      autogenerate: {
        directory: 'czp'
      }
    }, 
    {
      label: 'GDX',
      autogenerate: {
        directory: 'gdx'
      }
    }, 
    {
      label: 'Digital ID',
      autogenerate: {
        directory: 'digital-id'
      }
    }, 
    {
      label: 'SME One ID',
      autogenerate: {
        directory: 'sme'
      }
    }, 
    {
      label: 'e-Document',
      autogenerate: {
        directory: 'edoc'
      }
    }, 
    {
      label: 'e-Payment',
      autogenerate: {
        directory: 'epayment'
      }
    }, 
    {
      label: 'Law Portal',
      autogenerate: {
        directory: 'law'
      }
    }, 
    {
      label: 'Smart Kiosk',
      autogenerate: {
        directory: 'kiosk'
      }
    }]
  })]
 // ,
 // experimental: {
//	serverIslands: true	
//  }
//  output: "server",
//  adapter: netlify({
//	edgeMiddleware: true 
//  })
});