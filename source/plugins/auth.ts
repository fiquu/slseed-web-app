/**
 * Auth plugin module.
 *
 * @module plugins/auth
 */

import Vue from 'vue';

import auth from '@/services/auth';

function AuthPlugin(V: typeof Vue): void {
  V.prototype.$auth = auth;
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Vue;
  }
}

Vue.use(AuthPlugin);

export default AuthPlugin;
