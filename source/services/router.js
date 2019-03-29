/**
 * Router service module.
 *
 * @module services/router
 */

import VueRouter from 'vue-router';
import Vue from 'vue';

import config from '@/configs/router';

Vue.use(VueRouter);

const router = new VueRouter(config);

export default router;
