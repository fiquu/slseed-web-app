/**
 * JQuery plugin module.
 *
 * @module plugins/jquery
 */

import jquery from 'jquery';
import Vue from 'vue';

// Register JQuery on the window
Object.assign(window, {
  $: jquery,
  jquery
});

function JQueryPlugin(V: typeof Vue): void {
  V.prototype.$$ = jquery;
}

declare module 'vue/types/vue' {
  interface Vue {
    $$: JQuery;
  }
}

Vue.use(JQueryPlugin);

export default JQueryPlugin;
