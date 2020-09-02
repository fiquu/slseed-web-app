import type { APIClass } from '@aws-amplify/api';
import Vue from 'vue';

import api from '@/services/api';

/**
 * @param {Vue} V The vue instance.
 */
function APIPlugin(V: typeof Vue): void {
  V.prototype.$api = api;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: APIClass;
  }
}

Vue.use(APIPlugin);

export default APIPlugin;
