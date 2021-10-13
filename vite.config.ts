import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'laravel-vite';
import path from 'path';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'resources/js')}/`,
      '@user/': `${path.resolve(__dirname, 'modules/User/Resources/js')}/`,
    },
  },
}).withPlugins(
  Vue(),
  ...WindiCSS(),
  Components({
    resolvers: IconsResolver(),
  }),
  Icons({ compiler: 'vue3' })
);
