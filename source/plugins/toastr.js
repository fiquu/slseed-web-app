/**
 * Toastr plugin module.
 *
 * @module plugins/toastr
 */

import toastr from 'toastr';

const Toastr = {
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

    Vue.prototype.$toastr = toastr;
  }
};

export default Toastr;
