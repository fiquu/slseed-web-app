const { DefinePlugin } = require('webpack');
const path = require('path');

const { version } = require('./package.json');
const app = require('./app.json');
const cfg = require('./configs');

const { env } = process;

module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  integrity: true,

  outputDir: cfg.outputDir,

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
    devServer: cfg.devServer,
    devtool: false,

    entry: {
      app: path.join(cfg.sourceDir, 'main.ts')
    },

    resolve: {
      alias: {
        '@': cfg.sourceDir
      }
    },

    plugins: [
      new DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: `"${version}"`,
          SHORT: `"${app.short}"`,
          NAME: `"${app.name}"`
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
      args[0].template = `!!pug-loader!${path.join(cfg.sourceDir, 'index.pug')}`;
      args[0].version = version;
      args[0].app = app;
      args[0].env = env;

      return args;
    });
  }
};
