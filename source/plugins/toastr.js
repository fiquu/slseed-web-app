/**
 * Toastr plugin module.
 *
 * @module plugins/toastr
 */

const Toastr = {
  install: (Vue, options) => {
    window.toastr.options = {
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

    /* eslint no-param-reassign:0 */
    Vue.prototype.$toastr = window.toastr;
  }
};

export default Toastr;
