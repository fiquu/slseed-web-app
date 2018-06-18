/**
 * Vue loader config build module.
 *
 * @module build/vue-loader.conf
 */

const config = require('../config');
const utils = require('./utils');

module.exports = {
  loaders: {
    i18n: '@kazupon/vue-i18n-loader',
    ...utils.cssLoaders({
      sourceMap: config.sourceMaps,
      extract: config.extractCss
    })
  },

  transformToRequire: {
    image: 'xlink:href',
    source: 'source',
    video: 'source',
    img: 'source'
  }
};
