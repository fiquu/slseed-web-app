require('./check-versions')();

const config = require('../config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const proxyMiddleware = require('http-proxy-middleware');
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const opn = require('opn');

const env = require('./env');

const webpackConfig =
  process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const { proxyTable } = config.dev;

env.then(values => {
  // Fetch SSM parameters and assign
  Object.assign(config.dev.env, values);

  const app = express();
  const compiler = webpack(webpackConfig);

  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    logLevel: 'silent',
    headers: {
      'strict-transport-security': ['max-age=31536000', 'includeSubDomains', 'preload'].join(';'),
      'x-xss-protection': ['1', 'mode=block'].join(';'),
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'same-origin',
      'x-frame-options': 'DENY',
      'content-security-policy': [
        "script-src 'self' 'unsafe-eval' https://cdnjs.cloudflare.com https://*.googleapis.com https://*.facebook.net https://*.facebook.com",
        "img-src 'self' data: https://*.cloudfront.net https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.facebook.com",
        "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://*.googleapis.com",
        'font-src data: https://cdnjs.cloudflare.com https://*.gstatic.com',
        "connect-src 'self' http://localhost:* https://*.amazonaws.com",
        'frame-src http://*.facebook.com',
        "manifest-src 'self'",
        "default-src 'self'",
        "object-src 'none'"
      ].join(';')
    }
  });

  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false
  });

  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
      hotMiddleware.publish({ action: 'reload' });
      cb();
    });
  });

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);

  // proxy api requests
  Object.keys(proxyTable).forEach(context => {
    let options = proxyTable[context];

    if (typeof options === 'string') {
      options = {
        target: options
      };
    }

    app.use(proxyMiddleware(options.filter || context, options));
  });

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')());

  // serve webpack bundle output
  app.use(devMiddleware);

  // serve pure static assets
  const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
  app.use(staticPath, express.static('./static'));

  const uri = `http://localhost:${port}`;

  let ready;

  const readyPromise = new Promise(resolve => {
    ready = resolve;
  });

  console.log('> Starting dev server...');

  devMiddleware.waitUntilValid(() => {
    console.log(`> Listening at ${uri}\n`);
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri);
    }

    ready();
  });

  const server = app.listen(port);

  module.exports = {
    ready: readyPromise,
    close: () => {
      server.close();
    }
  };
});
