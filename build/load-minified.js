/**
 * Load minified build module.
 *
 * @module build/load-minified
 */

const uglify = require('uglify-es');
const fs = require('fs');

module.exports = file => {
  const code = fs.readFileSync(file, 'utf-8');
  const result = uglify.minify(code);

  if (result.error) {
    return '';
  }

  return result.code;
};
