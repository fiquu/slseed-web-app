/**
 * JQuery plugin module.
 *
 * @module plugins/jquery
 */

const JQuery = {
  install: Vue => {
    /* eslint no-param-reassign:0 */
    Vue.prototype.$$ = window.$;
  }
};

export default JQuery;
