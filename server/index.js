/**
 * Development server main module.
 *
 * @module server/index
 */

const { profiles } = require('../config/aws');

/* Ensure a valid NODE_ENV */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

/* Set proper AWS profile */
process.env.AWS_PROFILE = profiles[process.env.NODE_ENV] || 'default';

const versions = require('../build/check-versions');
const configure = require('../build/configure');
const cleanup = require('../build/cleanup');
const ssm = require('../build/ssm');
const server = require('./server');

(async () => {
  // Check dependencies versions
  await versions();
  // Load SSM parameters
  await ssm();

  // Setup configuration
  await configure();

  // Cleanup output dir
  await cleanup();

  // Start server
  await server();
})();
