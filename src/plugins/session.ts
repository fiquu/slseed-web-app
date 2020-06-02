import Vue from 'vue';

import session from '@/services/session';

/**
 * @param {Vue} V The vue instance
 */
function SessionPlugin(V: typeof Vue): void {
  V.prototype.$session = session;
}

declare module 'vue/types/vue' {
  type SessionType = typeof session;

  interface Vue {
    $session: SessionType;
  }
}

Vue.use(SessionPlugin);

export default SessionPlugin;
