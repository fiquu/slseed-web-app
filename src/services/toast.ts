import { TranslateResult } from 'vue-i18n';
import Vue from 'vue';

export interface ToastPluginOptions {
  position?: string;
  icons?: {
    info?: string;
    success?: string;
    warning?: string;
    error?: string;
  };
}

export interface ToastShowParams {
  options?: ToastPluginOptions;
  message: TranslateResult;
  title?: TranslateResult;
}

export interface ToastOptions {
  title?: TranslateResult;
  message: TranslateResult;
  showProgress?: string;
  showIcon?: boolean;
  progressUp?: boolean;
  class?: string;
  className?: Record<string, string>;
  transition?: Record<string, string>;
}

interface Toast extends JQuery {
  toast(options: ToastOptions): void;
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
  show(params: ToastShowParams): void;

  /**
   * Shows an info toast.
   */
  info(message: TranslateResult, title?: TranslateResult, options?: ToastPluginOptions): void;

  /**
   * Shows a success toast.
   */
  success(message: TranslateResult, title?: TranslateResult, options?: ToastPluginOptions): void;

  /**
   * Shows a warning toast.
   */
  warning(message: TranslateResult, title?: TranslateResult, options?: ToastPluginOptions): void;

  /**
   * Shows an error toast.
   */
  error(message: TranslateResult, title?: TranslateResult, options?: ToastPluginOptions): void;
}

const ToastComponent = new Vue({
  data(): { defaults: ToastPluginOptions } {
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
      };
    },

    show(type: string, { message, title, options }: ToastShowParams): void {
      const $body = this.$$('body') as Toast;

      $body.toast({
        ...this.defaults,
        class: type,
        message,
        title,
        ...(options || {})
      });
    },

    info(message: TranslateResult, title?: TranslateResult, options?: ToastPluginOptions): void {
      this.show('info', { message, title, options });
    },

    success(message: TranslateResult, title?: TranslateResult, options?: ToastPluginOptions): void {
      this.show('success', { message, title, options });
    },

    warning(message: TranslateResult, title?: TranslateResult, options?: ToastPluginOptions): void {
      this.show('warning', { message, title, options });
    },

    error(message: TranslateResult, title?: TranslateResult, options?: ToastPluginOptions): void {
      this.show('error', { message, title, options });
    }
  }
});

export default ToastComponent;
