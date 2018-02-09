/**
 * Router index module.
 *
 * @module router/index
 */

import VueRouter from 'vue-router';
import Vue from 'vue';

import pages from './pages';
import users from './users';

Vue.use(VueRouter);

export default new VueRouter({
  routes: pages.concat(users)
});
