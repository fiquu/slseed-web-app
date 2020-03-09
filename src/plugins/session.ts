/**
 * Session plugin module.
 *
 * @module plugins/session
 */


import Vue from 'vue';

import session from '@/services/session';

function SessionPlugin(V: typeof Vue): void {
  V.prototype.$session = session;
}

declare module 'vue/types/vue' {
  interface Vue {
    $session: Vue;
  }
}

Vue.use(SessionPlugin);

export default SessionPlugin;

// import Vue from 'vue';

// import session from '@/services/session';

// const $session = {
//   install(Vue) {
//     Object.defineProperty(Vue.prototype, '$session', {
//       value: session
//     });
//   }
// };

// Vue.use($session);

// export default $session;
