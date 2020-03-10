/**
 * Session plugin module.
 *
 * @module plugins/session
 */

import Vue from 'vue';

import session, { SessionService } from '@/services/session';

/**
 * @param {Vue} V The vue instance
 */
function SessionPlugin(V: typeof Vue): void {
  V.prototype.$session = session;
}

declare module 'vue/types/vue' {
  interface Vue {
    $session: SessionService;
  }
}

Vue.use(SessionPlugin);

export default SessionPlugin;
