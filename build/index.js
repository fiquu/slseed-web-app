/**
 * Build entry module.
 *
 * @module build/index
 */

const inquirer = require('inquirer');

(async () => {
  // Set proper stage ENV
  await require('../utils/stage-select')(true);

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

    const { confirm } = await inquirer.prompt({
      name: 'confirm',
      type: 'confirm',
      message: 'Perform deploy?'
    });

    if (confirm) {
      await deploy();
    }
  } catch (err) {
    if (err) {
      console.error(err.message);
    }

    process.exit(1);
  }
})();
