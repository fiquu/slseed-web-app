module.exports = [
  {
    name: 'ApiEndpoint',
    type: 'input',
    message: 'API Endpoint URI',
    validate: val => /^(https?):\/\/[-\w\d@:.,%/?&=]+$/.test(val)
  }
];
