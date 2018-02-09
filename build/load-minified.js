/**
 * Load minified build helper module.
 *
 * @module build/load-minified
 */

const babel = require('babel-core');
const uglify = require('uglify-es');

const options = {
  comments: false,
  minified: true,
  ast: false
};

module.exports = file => {
  const code = babel.transformFileSync(file, options).code;
  const result = uglify.minify(code);

  if (result.error) {
    return '';
  }

  return result.code;
};
