import Vuex from 'vuex';
import Vue from 'vue';

import { modules } from '@/configs/store';

Vue.use(Vuex);

const $store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules
});

export default $store;
