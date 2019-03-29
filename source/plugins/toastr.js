/**
 * Toastr plugin module.
 *
 * @module plugins/toastr
 */

import '@/styles/toastr.sass';

import toastr from 'toastr';
import Vue from 'vue';

const defaults = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-bottom-center',
  onclick: null,
  showDuration: 231,
  hideDuration: 231,
  timeOut: 4630,
  extendedTimeOut: 1157,
  showEasing: 'linear',
  hideEasing: 'linear',
  closeEasing: 'linear',
  showMethod: 'slideDown',
  hideMethod: 'slideUp',
  closeMethod: 'slideUp'
};

const $toastr = {
  install: (Vue, options) => {
    toastr.options = {
      ...defaults,
      ...options
    };

    Object.defineProperty(Vue.prototype, '$toastr', {
      value: toastr
    });
  }
};

Vue.use($toastr);

export default $toastr;
