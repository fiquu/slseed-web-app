import Vue from 'vue';

import moment from '@/services/moment';

/**
 * @param {Vue} V The vue instance.
 */
function MomentPlugin(V: typeof Vue): void {
  V.prototype.$moment = moment;
}

declare module 'vue/types/vue' {
  interface Vue {
    $moment: typeof moment;
  }
}

Vue.use(MomentPlugin);

export default moment;
