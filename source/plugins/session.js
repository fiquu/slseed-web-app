/**
 * Session plugin module.
 *
 * @module plugins/session
 */

import Vue from 'vue';

import session from '@/services/session';

const $session = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$session', {
      value: session
    });
  }
};

Vue.use($session);

export default $session;
