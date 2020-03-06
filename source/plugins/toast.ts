/**
 * Toast plugin module.
 *
 * @module plugins/toast
 */

import Vue from 'vue';

import toast, { ToastPlugin } from '../services/toast';

function ToastPlugin(V: typeof Vue): void {
  V.prototype.$toast = toast;
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: ToastPlugin;
  }
}

Vue.use(ToastPlugin);

export default ToastPlugin;
