/**
 * Build entry module.
 *
 * @module build/index
 */

const { profiles } = require('../config/aws');

/* Ensure a valid NODE_ENV */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

/* Set proper AWS profile */
process.env.AWS_PROFILE = profiles[process.env.NODE_ENV] || 'default';

const versions = require('./check-versions');
const configure = require('./configure');
const cleanup = require('./cleanup');
const build = require('./build');
const ssm = require('./ssm');

// Check dependencies versions
versions()
  // Load SSM parameters
  .then(() => ssm())

  // Setup configuration
  .then(() => configure())

  // Cleanup output dir
  .then(() => cleanup())

  // Start build process
  .then(() => build())

  // Handle build error
  .catch(err => {
    if (err) {
      console.error(err);
    }

    process.exit(1);
  });
