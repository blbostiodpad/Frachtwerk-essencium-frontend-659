/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig } from 'vite'
import type { ViteSentryPluginOptions } from 'vite-plugin-sentry'
import viteSentry from 'vite-plugin-sentry'

import packageJson from './package.json'

dotenv.config()

const sentryConfig: ViteSentryPluginOptions = {
  url: process.env.SENTRY_URL,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  release: packageJson.version,
  deploy: {
    env: 'production',
  },
  setCommits: {
    auto: true,
  },
  sourceMaps: {
    include: ['./dist/assets'],
    urlPrefix: '~/assets',
  },
}

export default defineConfig({
  plugins: [react(), viteSentry(sentryConfig)],
  server: {
    port: 5500,
    hmr: true,
  },
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: [
      // allow cleaner imports via '@'
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      // this entry enables HMR for the lib development
      {
        find: 'lib',
        replacement: path.resolve(__dirname, '../lib/src/index.ts'),
      },
      {
        find: 'translations',
        replacement: path.resolve(__dirname, '../translations/src/index.ts'),
      },
    ],
  },
  test: {
    environment: 'happy-dom',
  },
})
