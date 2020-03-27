const { join } = require('path');

const { name, version } = require('./package.json');
const app = require('./app.json');

module.exports = {
  configureWebpack: require('./configs/webpack'),
  pwa: require('./configs/pwa'),
  productionSourceMap: false,
  lintOnSave: true,
  integrity: true,

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

    // Add ENV values
    config.plugin('define')
      .tap(args => {
        args[0]['process.env'] = {
          ...args[0]['process.env'],
          VUE_APP_PROJECT_NAME: `"${name}"`,
          VUE_APP_VERSION: `"${version}"`,
          VUE_APP_SHORT: `"${app.short}"`,
          VUE_APP_NAME: `"${app.name}"`
        };

        return args;
      });

    // Load index.pug instead of index.html
    // You could also pass your Facebook App id or any other per-stage head tag
    config.plugin('html').tap(args => {
      args[0].template = `!!pug-loader!${join('src', 'index.pug')}`;
      args[0].version = version;
      args[0].env = process.env;
      args[0].app = app;

      return args;
    });
  }
};
