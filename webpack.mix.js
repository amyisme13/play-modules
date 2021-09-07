const mix = require('laravel-mix');
const path = require('path');

require('vuetifyjs-mix-extension');
require('laravel-mix-bundle-analyzer');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const basePath = process.env.MIX_BASE_PATH;
if (basePath) {
  mix.webpackConfig({ output: { publicPath: basePath + '/' } }).setResourceRoot(basePath);
}

if (mix.inProduction()) {
  mix.version();
}

if (mix.isWatching()) {
  mix.bundleAnalyzer();
}

mix.webpackConfig({
  output: {
    chunkFilename: '[name].[chunkhash:5].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js/'),
    },
  },
});

mix
  .sass('resources/sass/app.scss', 'public/css')
  .ts('resources/js/app.ts', 'public/js')
  .vuetify('vuetify-loader')
  .vue();

mix.extract();
