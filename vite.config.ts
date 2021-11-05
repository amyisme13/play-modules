import Vue from '@vitejs/plugin-vue';
import hq from 'alias-hq';
import { defineConfig } from 'laravel-vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  resolve: {
    alias: hq.get('rollup'),
  },
}).withPlugins(
  Vue(),
  ...WindiCSS(),
  Components({
    resolvers: IconsResolver(),
  }),
  Icons({ compiler: 'vue3' })
);
