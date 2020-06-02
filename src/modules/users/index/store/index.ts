import { Module } from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import state from './state';

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state
} as Module<typeof state, unknown>;
