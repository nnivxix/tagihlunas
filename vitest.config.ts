import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path' ;

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: () => true,
      },
    },
  })],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});