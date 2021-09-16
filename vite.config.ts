import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'laravel-vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'resources/js')}/`,
    },
  },
}).withPlugin(vue);
