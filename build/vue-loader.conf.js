/**
 * Vue loader config build module.
 *
 * @module build/vue-loader
 */

const config = require('../config');
const utils = require('./utils');

module.exports = {
  loaders: Object.assign(
    utils.cssLoaders({
      sourceMap: config.sourceMaps,
      extract: config.extractCss
    }),
    {
      i18n: '@kazupon/vue-i18n-loader'
    }
  ),

  transformToRequire: {
    image: 'xlink:href',
    source: 'source',
    video: 'source',
    img: 'source'
  }
};
