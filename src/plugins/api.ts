/**
 * API plugin module.
 *
 * @module plugins/api
 */

import { AxiosInstance } from 'axios';
import Vue from 'vue';

import api from '../services/api';

/**
 * @param {Vue} V The vue instance.
 */
function APIPlugin(V: typeof Vue): void {
  V.prototype.$api = api;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: AxiosInstance;
  }
}

Vue.use(APIPlugin);

export default APIPlugin;
