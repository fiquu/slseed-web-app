import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import state from './state';

const store = {
  namespaced: true,
  mutations,
  actions,
  getters,
  state
};

export default store;
