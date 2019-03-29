/**
 * API plugin module.
 *
 * @module plugins/api
 */

import Vue from 'vue';

import api from '@/services/api';

const $api = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$api', {
      value: api
    });
  }
};

Vue.use($api);

export default $api;
