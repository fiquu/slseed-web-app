/**
 * HTTP plugin module.
 *
 * @module plugins/http
 */

import { AxiosInstance } from 'axios';
import Vue from 'vue';

import http from '../services/http';

/**
 * @param {Vue} V The vue instance.
 */
function HTTPPlugin(V: typeof Vue): void {
  V.prototype.$http = http;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: AxiosInstance;
  }
}

Vue.use(HTTPPlugin);

export default HTTPPlugin;
