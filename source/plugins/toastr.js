/**
 * Toastr plugin module.
 *
 * @module plugins/toastr
 */

import '@/styles/toastr.scss';

import toastr from 'toastr';

export default {
  install: (Vue, options) => {
    toastr.options = {
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
      closeMethod: 'slideUp',
      ...options
    };

    Object.defineProperty(Vue.prototype, '$toastr', {
      value: toastr
    });
  }
};
