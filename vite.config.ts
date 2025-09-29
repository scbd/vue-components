// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // Your library entry point
      fileName: (format) => `index.${format}.js`,
      formats: ['es'], // Output formats
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue'], // Externalize Vue
    },
    sourcemap: true
  },
});