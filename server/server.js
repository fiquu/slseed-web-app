/**
 * Development server module.
 *
 * @module server/server
 */

const connectHistoryAPIFallback = require('connect-history-api-fallback');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxyMiddleware = require('http-proxy-middleware');
const express = require('express');
const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const ora = require('ora');

const config = require('../config');

module.exports = async () => {
  const webpackConfig =
    process.env.NODE_ENV === 'testing' ? require('../build/webpack.build.conf') : require('../build/webpack.dev.conf');

  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
  const { proxyTable } = config;

  const compiler = webpack(webpackConfig);
  const app = express();

  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    headers: config.headers,
    logLevel: 'silent'
  });

  const hotMiddleware = webpackHotMiddleware(compiler, {
    log: false
  });

  // Force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, done) => {
      hotMiddleware.publish({ action: 'reload' });
      done();
    });
  });

  // Enable hot-reload and state-preserving compilation error display
  app.use(hotMiddleware);

  // Proxy api requests
  for (let context of Object.keys(proxyTable)) {
    let options = proxyTable[context];

    if (typeof options === 'string') {
      options = {
        target: options
      };
    }

    app.use(proxyMiddleware(options.filter || context, options));
  }

  // Handle fallback for HTML5 history API
  app.use(connectHistoryAPIFallback());

  // Serve webpack bundle output
  app.use(devMiddleware);

  // Serve pure static assets
  const staticPath = path.posix.join(config.assetsPublicPath, config.assetsSubDirectory);

  app.use(staticPath, express.static('./static'));

  const uri = `http://localhost:${config.port}`;

  let ready;

  const readyPromise = new Promise(resolve => {
    ready = resolve;
  });

  const spinner = ora(`[${process.env.NODE_ENV}] Starting development server...`).start();

  devMiddleware.waitUntilValid(() => {
    spinner.info(`[${process.env.NODE_ENV}] Development server listening at ${chalk.bold(uri)}\n`);
    ready();
  });

  const server = app.listen(config.port);

  return {
    close: () => server.close(),
    ready: readyPromise
  };
};
