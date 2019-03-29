const path = require('path');

const pkg = require('./package.json');
const cfg = require('./configs');

const { env } = process;

module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  integrity: true,

  outputDir: cfg.outputDir,

  pwa: {
    name: pkg.title,
    themeColor: pkg.app.color,
    msTileColor: pkg.app.color,
    assetsVersion: pkg.version,
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
      app: path.join(cfg.sourceDir, 'main.js')
    },

    resolve: {
      alias: {
        '@': cfg.sourceDir
      }
    }
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
      args[0].package = pkg;
      args[0].env = env;

      return args;
    });
  }
};
