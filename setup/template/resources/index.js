const cognito = require('./cognito');
const public = require('./public');
const api = require('./api');

module.exports = {
  ...cognito,
  ...public,
  ...api
};
