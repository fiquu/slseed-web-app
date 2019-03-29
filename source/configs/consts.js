/**
 * Routes module.
 *
 * @module routes
 */

import op from 'object-path';

const consts = {};

/* Import all const values dynamically */
const req = require.context('../consts', true, /\/.+\/.+\.js$/);

for (let path of req.keys()) {
  const key = path
    .replace(/\.js|\.\//g, '')
    .toUpperCase()
    .replace(/[^\w]/g, '.');

  op.set(consts, key, req(path));
}

export default consts;
