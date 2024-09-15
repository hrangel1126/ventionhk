import { defineConfig } from 'astro/config';

// https://astro.build/config
import analogjsangular from '@analogjs/astro-angular';

import node from '@astrojs/node';
import vercel from '@astrojs/vercel/serverless';

import react from '@astrojs/react';
const reactConfig = {
  babel: {
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "classic"
        }
      ]
    ],
    plugins: [
      [
        "@babel/plugin-proposal-decorators", { legacy: true }
      ]
    ]
  }
}

//import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [
    //db()
    analogjsangular(),
    react(reactConfig)
  ],
  output: 'server',
  prefetch: true,

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});