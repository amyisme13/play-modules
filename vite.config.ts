import path from 'path';
import { defineConfig } from 'laravel-vite';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'resources/js')}/`,
    },
  },
}).withPlugins(createVuePlugin());
