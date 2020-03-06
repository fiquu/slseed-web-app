/**
 * Cognito service.
 *
 * @module services/cognito
 */

import Vue from 'vue';

import cognito from '../services/cognito';

function CognitoPlugin(V: typeof Vue): void {
  V.prototype.$cognito = cognito;
}

declare module 'vue/types/vue' {
  interface Vue {
    $cognito: Vue;
  }
}

Vue.use(CognitoPlugin);

export default CognitoPlugin;
