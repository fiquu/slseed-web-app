/**
 * Build entry module.
 *
 * @module build/index
 */

const inquirer = require('inquirer');

(async () => {
  const { profiles } = require('../config/aws');

  let answers = await inquirer.prompt({
    name: 'profile',
    type: 'list',
    message: 'Select build/deployment target profile:',
    choices: Object.keys(profiles)
  });

  /* Set proper NODE_ENV */
  process.env.NODE_ENV = answers.profile || 'development';

  /* Set proper AWS profile */
  process.env.AWS_PROFILE = profiles[answers.profile] || 'default';

  const versions = require('./check-versions');
  const configure = require('./configure');
  const cleanup = require('./cleanup');
  const deploy = require('./deploy');
  const build = require('./build');
  const ssm = require('./ssm');

  try {
    // Check dependencies versions
    await versions();

    // Load SSM parameters
    await ssm();

    // Setup configuration
    await configure();

    // Cleanup output dir
    await cleanup();

    // Start build process
    await build();

    answers = await inquirer.prompt({
      name: 'deploy',
      type: 'confirm',
      message: 'Perform deploy?'
    });

    if (answers.deploy) {
      await deploy();
    }
  } catch (err) {
    if (err) {
      console.error(err.message);
    }

    process.exit(1);
  }
})();
