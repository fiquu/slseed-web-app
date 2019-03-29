/**
 * JQuery plugin module.
 *
 * @module plugins/jquery
 */

import jquery from 'jquery';
import Vue from 'vue';

window.jQuery = jquery; // Make available for other libraries

const $jquery = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$$', {
      value: jquery
    });
  }
};

Vue.use($jquery);

export default $jquery;
