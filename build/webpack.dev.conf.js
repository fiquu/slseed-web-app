const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(name => {
  const entry = path.join(__dirname, '..', 'server', 'client.js');

  baseWebpackConfig.entry[name] = [entry].concat(baseWebpackConfig.entry[name]);
});

const webpackConfig = {
  devtool: config.devtool,
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new FriendlyErrorsPlugin()]
};

module.exports = merge(baseWebpackConfig, webpackConfig);
