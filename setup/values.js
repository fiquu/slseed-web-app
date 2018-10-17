/**
 * Main Stack Values.
 *
 * @module setup/values
 */

const inquirer = require('inquirer');

module.exports = inquirer.prompt([
  {
    name: 'api-endpoint',
    type: 'input',
    message: `API Endpoint URI:`,
    validate: val => /^(https?):\/\/[-\w\d@:.,%/?&=]+$/.test(val)
  }
]);
