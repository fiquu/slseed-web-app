/**
 * Main build module.
 *
 * @module build/build
 */

const webpack = require('webpack');
const ora = require('ora');

const spinner = ora(`Building for [${process.env.NODE_ENV}]...`);

module.exports = () => {
  spinner.start();

  return new Promise((resolve, reject) =>
    webpack(require('./webpack.build.conf'), (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(stats);
    })
  ).then(stats => {
    process.stdout.write(
      `${stats.toString({
        chunkModules: false,
        children: false,
        modules: false,
        chunks: false,
        colors: true
      })}`
    );

    spinner.succeed('Build complete.');

    spinner.info(
      "Built files are meant to be served over an HTTP server. Opening index.html over `file://` won't work."
    );
  });
};
