const UglifyJS = require('uglify-es');
const fs = require('fs');

module.exports = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf-8');
  const result = UglifyJS.minify(code);

  if (result.error) {
    return '';
  }

  return result.code;
};
