const chalk = require('chalk');
const AWS = require('aws-sdk');

const mappings = require('../config/env.ssm');

AWS.config.update({
  region: 'us-east-1',
  apiVersions: {
    ssm: '2014-11-06'
  }
});

const ssm = new AWS.SSM();

const promises = [];
const values = {};

Object.keys(mappings).forEach(name => {
  const params = {
    Name: name,
    WithDecryption: true
  };

  promises.push(
    new Promise(resolve => {
      ssm.getParameter(params, (err, data) => {
        if (err) {
          console.error(chalk.red(err.message));
        } else {
          values[mappings[name]] = JSON.stringify(data.Parameter.Value);
        }

        resolve();
      });
    })
  );
});

module.exports = Promise.all(promises).then(() => values);
