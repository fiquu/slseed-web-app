/**
 * Moment plugin module.
 *
 * @module plugins/moment
 */

import moment from 'moment';

export default {
  install: (Vue, options = {}) => {
    moment.locale(options.locale || 'en');

    Object.defineProperty(Vue.prototype, '$moment', {
      value: moment
    });
  }
};
