import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [
        { browser: 'chromium' },
      ],
      provider: 'playwright',
    },
  },
})
