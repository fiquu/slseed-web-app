/* eslint-disable arrow-body-style, node/no-unpublished-require, node/no-extraneous-require */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  // on('file:preprocessor', webpack({
  //   webpackOptions: require('@vue/cli-service/webpack.config'),
  //   watchOptions: {}
  // }));

  require('@cypress/code-coverage/task')(on, config);

  // include any other plugin code...

  // It's IMPORTANT to return the config object
  // with any changed environment variables
  return {
    ...config
  };
};
