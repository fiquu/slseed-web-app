/**
 * Router plugin module.
 *
 * @module plugins/router
 */

import VueRouter from 'vue-router';
import Vue from 'vue';

import config from '@/configs/router';

const $router = new VueRouter(config);

Vue.use(VueRouter);
Vue.use($router);

export default $router;
