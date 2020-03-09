const { DefinePlugin } = require('webpack');
const { join } = require('path');

const { sourceDir, outputDir, devServer } = require('./configs/vue');
const { version } = require('./package.json');
const app = require('./app.json');

module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  integrity: true,
  // outputDir,

  pwa: {
    name: app.name,
    themeColor: app.color,
    msTileColor: app.color,
    assetsVersion: version,
    appleMobileWebAppCapable: 'yes',

    workboxPluginMode: 'InjectManifest',

    iconPaths: {
      appleTouchIcon: 'icons/apple-touch-icon.png',
      maskIcon: 'icons/safari-pinned-tab.svg',
      msTileImage: 'icons/mstile-310x310.png',
      favicon32: 'icons/favicon-32x32.png',
      favicon16: 'icons/favicon-16x16.png'
    }
  },

  configureWebpack: {
    devtool: false,
    devServer,

    // entry: {
    //   app: join(sourceDir, 'main.ts')
    // },

    // resolve: {
    //   alias: {
    //     '@': sourceDir
    //   }
    // },

    plugins: [
      new DefinePlugin({
        'process.env': {
          VUE_APP_VERSION: `"${version}"`,
          VUE_APP_SHORT: `"${app.short}"`,
          VUE_APP_NAME: `"${app.name}"`
        }
      })
    ]
  },

  chainWebpack: config => {
    // Configure i18n loader
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')

      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()

      .use('yaml')
      .loader('yaml-loader')
      .end();

    // Load index.pug instead of index.html
    config.plugin('html').tap(args => {
      args[0].template = `!!pug-loader!${join(sourceDir, 'index.pug')}`;
      args[0].version = version;
      args[0].env = process.env;
      args[0].app = app;

      return args;
    });
  }
};
