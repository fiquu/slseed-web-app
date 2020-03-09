import Vuex from 'vuex';
import Vue from 'vue';

import config from './configs/store';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: config.modules
});

export default store;
