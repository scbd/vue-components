import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const headed = process.argv.includes('--browser.headless=false')

export default defineConfig({
  plugins: [vue()],
  test: {
    setupFiles: headed ? ['./tests/setup/headed.ts'] : [],
    browser: {
      enabled: true,
      headless: true,
      instances: [
        {
          browser: 'chromium',
          ...headed && { providerOptions: { launch: { slowMo: 250 } } },
        },
      ],
      provider: 'playwright',
    },
  },
})
