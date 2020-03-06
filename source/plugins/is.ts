/**
 * Is plugin module.
 *
 * @module plugins/is
 */

import Vue from 'vue';

import is from 'fi-is';

const $is = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$is', {
      value: is
    });
  }
};

Vue.use($is);

export default $is;
