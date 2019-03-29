/**
 * Consts plugin module.
 *
 * @module plugins/consts
 */

import Vue from 'vue';

import consts from '@/services/consts';

const $consts = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$consts', {
      value: consts
    });
  }
};

Vue.use($consts);

export default $consts;
