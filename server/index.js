/**
 * Development server main module.
 *
 * @module server/index
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const versions = require('../build/check-versions');
const configure = require('../build/configure');
const cleanup = require('../build/cleanup');
const ssm = require('../build/ssm');
const server = require('./server');

// Check dependencies versions
versions()
  // Load SSM parameters
  .then(() => ssm())

  // Setup configuration
  .then(() => configure())

  // Cleanup output dir
  .then(() => cleanup())

  .then(() => server());
