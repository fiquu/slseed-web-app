/**
 * SSM build module.
 *
 * @module build/ssm
 */

const AWS = require('aws-sdk');
const ora = require('ora');

const spinner = ora(`Resolving SSM parameters for [${process.env.NODE_ENV}]...`);

spinner.start();

const { profiles, region, params } = require('../config/ssm.env');
const package = require('../package.json');

process.env.AWS_PROFILE = profiles[process.env.NODE_ENV];

AWS.config.update({
  region,
  apiVersions: {
    ssm: '2014-11-06'
  }
});

const ssm = new AWS.SSM();

const promises = [];
const errors = [];

params.forEach(name => {
  const params = {
    Name: `/${package.group.name}/${process.env.NODE_ENV}/${name}`,
    WithDecryption: true
  };

  promises.push(
    new Promise(resolve => {
      ssm.getParameter(params, (err, data) => {
        if (err) {
          spinner.warn(err.message);
          errors.push(err);

          resolve();
          return;
        }

        const env = name.toUpperCase().replace(/[^A-Z]+/g, '_');

        spinner.info(`${data.Parameter.Name} --> process.env.${env}`);

        process.env[env] = data.Parameter.Value;

        resolve();
      });
    })
  );
});

module.exports = () =>
  Promise.all(promises).then(() => {
    if (errors.length > 1) {
      spinner.fail('Some parameters could not be resolved!');
      throw new Error();
    }

    spinner.succeed('All SSM parameters resolved!');
  });
