import Vue from 'vue';

import localStorage from '../services/local-storage';

/**
 * @param {Vue} V The vue instance.
 */
function LocalStoragePlugin(V: typeof Vue): void {
  V.prototype.$storage = localStorage;
}

declare module 'vue/types/vue' {
  interface Vue {
    $storage: typeof localStorage;
  }
}

Vue.use(LocalStoragePlugin);

export default LocalStoragePlugin;
