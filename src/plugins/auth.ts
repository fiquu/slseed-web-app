/**
 * Auth plugin module.
 *
 * @module plugins/auth
 */

import Vue from 'vue';

import { AuthService } from '@/services/auth.d';
import auth from '@/services/auth';

/**
 * @param {Vue} V The vue instance.
 */
function AuthPlugin(V: typeof Vue): void {
  V.prototype.$auth = auth;
}

declare module 'vue/types/vue' {
  interface Vue { // eslint-disable-line
    $auth: AuthService;
  }
}


Vue.use(AuthPlugin);

export default AuthPlugin;
