/**
 * JQuery plugin module.
 *
 * @module plugins/jquery
 */

import jquery from 'jquery';

window.jQuery = jquery; // Make available for other libraries

export default {
  install: Vue => {
    Object.defineProperty(Vue.prototype, '$$', {
      value: jquery
    });
  }
};
