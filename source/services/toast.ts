/**
 * Toast plugin module.
 *
 * @module plugins/toast
 */

import { TranslateResult } from 'vue-i18n';
import Vue from 'vue';

export interface ToastPluginOptions {
  position?: string;
  icons?: {
    info?: string;
    success?: string;
    warning?: string;
    error?: string;
  }
}

export interface ToastOptions {

}

export interface ToastPlugin {
  /**
   * Sets the default options.
   *
   * @param {object} options The options to set as default.
   *
   * @see https://fomantic-ui.com/modules/toast.html#/settings
   */
  setDefaults(options: ToastPluginOptions): void;

  /**
   * Shows a toast.
   */
  show(type: string | TranslateResult, message: string, title?: string, options?: ToastPluginOptions): void;

  /**
   * Shows an info toast.
   */
  info(message: string | TranslateResult, title?: string, options?: ToastPluginOptions): void;

  /**
   * Shows a success toast.
   */
  success(message: string | TranslateResult, title?: string, options?: ToastPluginOptions): void;

  /**
   * Shows a warning toast.
   */
  warning(message: string | TranslateResult, title?: string, options?: ToastPluginOptions): void;

  /**
   * Shows an error toast.
   */
  error(message: string | TranslateResult, title?: string, options?: ToastPluginOptions): void;
}

interface JQueryToast extends JQuery {
  toast(options: ToastOptions): void;
}

const ToastComponent = new Vue({
  data() {
    const defaults: ToastPluginOptions = {
      position: 'bottom center',
      icons: {
        info: 'fad fa-info-circle',
        success: 'fad fa-check-circle',
        warning: 'fad fa-exclamation-circle',
        error: 'fad fa-exclamation-triangle'
      }
    };

    return { defaults };
  },

  methods: {
    setDefaults(options: ToastPluginOptions): void {
      this.defaults = {
        ...this.defaults,
        ...options
      }
    },

    show(type: string, message: string | TranslateResult, title?: string, options?: ToastPluginOptions): void {
      (this.$$('body') as JQueryToast).toast({
        ...this.defaults,
        class: type,
        message,
        title,
        ...(options || {})
      });
    },

    info(message: string | TranslateResult, title?: string, options?: ToastPluginOptions) {
      this.show('info', message, title, options);
    },

    success(message: string | TranslateResult, title?: string, options?: ToastPluginOptions) {
      this.show('success', message, title, options);
    },

    warning(message: string | TranslateResult, title?: string, options?: ToastPluginOptions) {
      this.show('warning', message, title, options);
    },

    error(message: string | TranslateResult, title?: string, options?: ToastPluginOptions) {
      this.show('error', message, title, options);
    }
  }
});

export default ToastComponent;
