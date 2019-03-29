/**
 * Moment plugin module.
 *
 * @module plugins/moment
 */

import Vue from 'vue';

import moment from '@/services/moment';

const $moment = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$moment', {
      value: moment
    });
  }
};

Vue.use($moment);

export default $moment;
