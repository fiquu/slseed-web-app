/**
 * Auth plugin module.
 *
 * @module plugins/auth
 */

import Vue from 'vue';

import { AuthClass } from '@aws-amplify/auth';
import auth from '@/services/auth';

/**
 * @param {Vue} V The vue instance.
 */
function AuthPlugin(V: typeof Vue): void {
  V.prototype.$auth = auth;
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: AuthClass;
  }
}

Vue.use(AuthPlugin);

export default AuthPlugin;
