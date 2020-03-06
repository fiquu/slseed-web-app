/**
 * Moment plugin module.
 *
 * @module plugins/moment
 */

import { Moment } from 'moment';
import Vue from 'vue';

import moment from '../services/moment';

function MomentPlugin(V: typeof Vue): void {
  V.prototype.$moment = moment;
}

declare module 'vue/types/vue' {
  interface Vue {
    $moment: Moment;
  }
}

Vue.use(MomentPlugin);

export default MomentPlugin;
