/**
 * Moment plugin module.
 *
 * @module plugins/moment
 */

const Moment = {
  install: Vue => {
    /* eslint no-param-reassign:0 */
    Vue.prototype.$moment = window.moment;
  }
};

export default Moment;
