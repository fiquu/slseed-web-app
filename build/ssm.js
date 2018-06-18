/**
 * SSM build module.
 *
 * @module build/ssm
 */

const AWS = require('aws-sdk');
const ora = require('ora');

const { apiVersions, region } = require('../config/aws');
const params = require('../config/ssm.env');
const package = require('../package.json');

AWS.config.update({
  apiVersions,
  region
});

const ssm = new AWS.SSM();

const errors = [];

module.exports = async () => {
  const spinner = ora(`Resolving SSM parameters for [${process.env.NODE_ENV}]...`);
  const promises = [];

  spinner.start();

  for (let name of params) {
    const promise = new Promise(resolve => {
      const params = {
        Name: `/${package.group.name}/${process.env.NODE_ENV}/${name}`,
        WithDecryption: true
      };

      ssm.getParameter(params, (err, data) => {
        if (err) {
          spinner.warn(err.message);
          errors.push(err.message);

          resolve();

          return;
        }

        const env = name.toUpperCase().replace(/[^A-Z]+/g, '_');

        spinner.info(`${data.Parameter.Name} --> process.env.${env}`);

        process.env[env] = data.Parameter.Value;

        resolve();
      });
    });

    promises.push(promise);
  }

  await Promise.all(promises);

  if (errors.length > 1) {
    spinner.fail('Some parameters could not be resolved');

    for (let err of errors) {
      spinner.warn(err.message);
    }

    throw new Error('Some parameters could not be resolved');
  }

  spinner.succeed('All SSM parameters resolved.');
};
