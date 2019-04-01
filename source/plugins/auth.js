/**
 * Auth plugin module.
 *
 * @module plugins/auth
 */

import Vue from 'vue';

import auth from '@/services/auth';

const $auth = {
  install(Vue) {
    /* eslint no-param-reassign:0 */
    Object.defineProperty(Vue.prototype, '$auth', {
      value: auth
    });
  }
};

Vue.use($auth);

export default $auth;
