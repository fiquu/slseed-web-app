const headers = require('../../functions/headers.js');

/**
 *
 */
async function run () {
  console.dir(await headers.handler({
    Records: [{
      cf: {
        response: {
          body: 'testing the lambda',
          code: 200,
          headers: {
            'some-other-header': [{
              key: 'Some-Other-Header',
              value: 'none'
            }]
          }
        }
      }
    }]
  }), {
    depth: 6
  });
}

run();
