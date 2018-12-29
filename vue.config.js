const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const externals = require('./externals.json');
const pkg = require('./package.json');
const config = require('./config');

const { env } = process;

module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  integrity: true,

  outputDir: path.join(__dirname, 'dist'),

  configureWebpack: {
    devServer: config.devServer,
    devtool: false,

    resolve: {
      alias: {
        '@': path.join(__dirname, 'source')
      }
    },

    entry: {
      app: path.join(__dirname, 'source', 'main.js')
    },

    plugins: [
      new FaviconsWebpackPlugin({
        logo: config.appIconPath,
        prefix: path.join(config.assetsSubDirectory, 'icons', '[hash].', ''),
        background: pkg.app.background,
        version: pkg.version,
        title: pkg.app.name,
        icons: {
          appleStartup: false,
          appleIcon: false,
          opengraph: false,
          favicons: true,
          android: false,
          twitter: false,
          windows: false,
          yandex: false,
          coast: false
        }
      }),

      new WebpackPwaManifest({
        background_color: pkg.app.background,
        description: pkg.app.description,
        theme_color: pkg.app.color,
        short_name: pkg.app.short,
        display: pkg.app.display,
        version: pkg.version,
        name: pkg.app.name,
        start_url: '/',
        ios: true,
        icons: [
          {
            src: config.appIconPath,
            destination: config.assetsSubDirectory,
            sizes: [36, 48, 72, 96, 144, 192, 512]
          },
          {
            src: config.appIconPath,
            destination: config.assetsSubDirectory,
            sizes: [120, 152, 167, 180, 1024],
            ios: true
          }
        ]
      })
    ]
  },

  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader');

    // Load index.pug instead of index.html
    config.plugin('html').tap(args => {
      args[0].template = `!!pug-loader!${path.join(__dirname, 'source', 'index.pug')}`;
      args[0].externals = externals;
      args[0].package = pkg;
      args[0].env = env;

      return args;
    });
  }
};
