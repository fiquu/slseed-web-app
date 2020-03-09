/**
 * Object Patch plugin module.
 *
 * @module plugins/op
 */

import op, { ObjectPathStatic } from 'object-path'
import Vue from 'vue';

function ObjectPathPlugin(V: typeof Vue): void {
  V.prototype.$op = op;
}

declare module 'vue/types/vue' {
  interface Vue {
    $op: ObjectPathStatic;
  }
}

Vue.use(ObjectPathPlugin);

export default ObjectPathPlugin;
