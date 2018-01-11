const config = require('../config');
const utils = require('./utils');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  loaders: Object.assign({}, utils.cssLoaders({
    extract: isProduction,
    sourceMap: isProduction ?
      config.build.productionSourceMap : config.dev.cssSourceMap,
  }), {
    i18n: '@kazupon/vue-i18n-loader',
  }),

  transformToRequire: {
    video: 'source',
    source: 'source',
    img: 'source',
    image: 'xlink:href',
  },
};
