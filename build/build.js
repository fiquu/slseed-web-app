/**
 * Main build module.
 *
 * @module build/build
 */

const webpack = require('webpack');
const ora = require('ora');

module.exports = async () => {
  const spinner = ora(`Building for [${process.env.NODE_ENV}]...`).start();

  const stats = await new Promise((resolve, reject) => {
    const config = require('./webpack.build.conf');

    webpack(config, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(stats);
    });
  });

  process.stdout.write(
    stats.toString({
      chunkModules: false,
      children: false,
      modules: false,
      chunks: false,
      colors: true
    })
  );

  spinner.succeed('Build complete.');

  spinner.info("Built files are meant to be served over an HTTP server. Opening index.html over `file://` won't work.");
};
