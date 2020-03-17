import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex); // Must be called before loading stores

import config from '@/configs/store';

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: config.modules
});

export default store;
