import { MutationTree } from 'vuex';

import { UsersState, UserModel } from './state';

export default {
  setUsers(state, payload: UserModel[]): void {
    state.users.length = 0;
    state.users.push(...payload);
  }
} as MutationTree<UsersState>;
