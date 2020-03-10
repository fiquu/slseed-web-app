/**
 * Moment plugin module.
 *
 * @module plugins/moment
 */

import { Moment, MomentInput, MomentFormatSpecification } from 'moment';
import Vue from 'vue';

import moment from '../services/moment';

interface MomentInterface extends Moment {
  // Copied from the types because it gets dizzy for some reazon
  (inp?: MomentInput, format?: MomentFormatSpecification, strict?: boolean): Moment;
  (inp?: MomentInput, format?: MomentFormatSpecification, language?: string, strict?: boolean): Moment;
}

/**
 * @param {Vue} V The vue instance.
 */
function MomentPlugin(V: typeof Vue): void {
  V.prototype.$moment = moment;
}

declare module 'vue/types/vue' {
  interface Vue {
    $moment: MomentInterface;
  }
}

Vue.use(MomentPlugin);

export default MomentInterface;
