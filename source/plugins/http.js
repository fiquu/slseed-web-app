/**
 * HTTP plugin module.
 *
 * @module plugins/http
 */

import Vue from 'vue';

import http from '@/services/http';

const $http = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: http
    });
  }
};

Vue.use($http);

export default $http;
