/**
 * Moment plugin module.
 *
 * @module plugins/moment
 */

import moment from 'moment';

const Moment = {
  install: (Vue, options) => {
    moment.locale((options && options.locale) || 'en');

    Vue.prototype.$moment = moment;
  }
};

export default Moment;
