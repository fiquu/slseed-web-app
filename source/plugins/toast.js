/**
 * Toast plugin module.
 *
 * @module plugins/toast
 */

import Vue from 'vue';

Vue.use({
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$toast', {
      value: new Vue({
        data () {
          return {
            defaults: {
              position: 'bottom center',
              icons: {
                info: 'fad fa-info-circle',
                success: 'fad fa-check-circle',
                warning: 'fad fa-exclamation-circle',
                error: 'fad fa-exclamation-triangle'
              },
              ...options
            }
          };
        },

        methods: {
          _show (type, message, title, options = {}) {
            this.$$('body').toast({
              ...this.defaults,
              class: type,
              message,
              title,
              ...options
            });
          },

          info (message, title, options) {
            this._show('info', message, title, options);
          },

          success (message, title, options) {
            this._show('success', message, title, options);
          },

          warning (message, title, options) {
            this._show('warning', message, title, options);
          },

          error (message, title, options) {
            this._show('error', message, title, options);
          }
        }
      })
    });
  }
});
