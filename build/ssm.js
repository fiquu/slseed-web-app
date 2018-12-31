/**
 * SSM build module.
 *
 * @module build/ssm
 */

const AWS = require('aws-sdk');
const ora = require('ora');

const { apiVersions, region } = require('../configs/aws');
const params = require('../configs/ssm.env');
const package = require('../package.json');

AWS.config.update({
  apiVersions,
  region
});

const ssm = new AWS.SSM();

module.exports = async () => {
  const spinner = ora(`Resolving SSM parameters for [${process.env.NODE_ENV}]...`);
  const promises = [];

  spinner.start();

  for (let name of params) {
    const promise = new Promise((resolve, reject) => {
      const params = {
        Name: `/${package.name}/${process.env.NODE_ENV}/${name}`,
        WithDecryption: true
      };

      ssm.getParameter(params, (err, data) => {
        if (err) {
          spinner.fail(`${err.code}: ${params.Name}`);
          reject();
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

  try {
    await Promise.all(promises);
    spinner.succeed('All SSM parameters resolved.');
  } catch (err) {
    process.exit(1);
  }
};
