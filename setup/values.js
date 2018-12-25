module.exports = [
  {
    name: 'api-endpoint',
    type: 'input',
    message: `API Endpoint URI:`,
    validate: val => /^(https?):\/\/[-\w\d@:.,%/?&=]+$/.test(val)
  }
];
