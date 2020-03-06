/**
 * Object Patch plugin module.
 *
 * @module plugins/op
 */

import op from 'object-path';
import Vue from 'vue';

const $op = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$op', {
      value: op
    });
  }
};

Vue.use($op);

export default $op;
