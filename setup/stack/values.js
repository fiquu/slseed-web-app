module.exports = [
  {
    name: 'ApiEndpoint',
    type: 'input',
    message: 'API Endpoint URI',
    default: 'http://localhost:8080',
    validate: val => /^(https?):\/\/[-\w\d@:.,%/?&=]+$/.test(val)
  }
];
