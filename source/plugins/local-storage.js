/**
 * Local Storage plugin module.
 *
 * @module plugins/local-storage
 */

import Vue from 'vue';

import localStorage from '@/services/local-storage';

const $localStorage = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$localStorage', {
      value: localStorage
    });
  }
};

Vue.use($localStorage);

export default $localStorage;
