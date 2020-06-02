import Vue from 'vue';

import session from '@/services/session';

/**
 * @param {Vue} V The vue instance
 */
function SessionPlugin(V: typeof Vue): void {
  V.prototype.$session = session;
}

declare module 'vue/types/vue' {
  interface Vue {
    $session: typeof session;
  }
}

Vue.use(SessionPlugin);

export default SessionPlugin;
