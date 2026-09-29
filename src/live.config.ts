import { defineLiveCollection } from 'astro:content';
import { emdashLoader } from 'emdash/runtime';

// File-based Starlight docs remain in src/content.config.ts during the staged
// migration. This collection makes EmDash data available to Astro routes.
export const collections = {
  _emdash: defineLiveCollection({ loader: emdashLoader() }),
};
