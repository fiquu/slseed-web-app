/**
 * Router service module.
 *
 * @module services/router
 */

import VueRouter from 'vue-router';

import config from '../configs/router';

console.info(config);

const router = new VueRouter(config);

export default router;
