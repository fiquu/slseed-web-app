/**
 * Moment plugin module.
 *
 * @module plugins/moment
 */

import moment from 'moment';

export default {
  install: (Vue, options) => {
    const { locale } = options || {};

    moment.locale(locale || 'en');

    Object.defineProperty(Vue.prototype, '$moment', {
      value: moment
    });
  }
};
