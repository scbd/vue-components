// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        lstring: resolve(__dirname, 'src/utils/lstring.ts')
      },
      fileName: (format, name) => `${name}.${format}.js`,
      formats: ['es'], // Output formats
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue'], // Externalize Vue
    },
    sourcemap: true
  },
});