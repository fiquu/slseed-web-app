import is from '@fiquu/is';
import Vue from 'vue';

/**
 * @param {Vue} V The Vue instance.
 */
function IsPlugin(V: typeof Vue): void {
  V.prototype.$is = is;
}

declare module 'vue/types/vue' {
  interface Vue {
    $is: typeof is;
  }
}

Vue.use(IsPlugin);

export default IsPlugin;
