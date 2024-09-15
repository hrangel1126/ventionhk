import { defineConfig } from 'astro/config';

// https://astro.build/config
import analogjsangular from '@analogjs/astro-angular';

import node from '@astrojs/node';
import vercel from '@astrojs/vercel/serverless';

import react from '@astrojs/react';

//import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [//db()
  analogjsangular(), react()],
  output: 'server',
  prefetch: true,

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});