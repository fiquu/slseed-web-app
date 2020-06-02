import { GetterTree } from 'vuex';

import { UsersState } from './state';

export default {
  users: ({ users }) => {
    return users;
  }
} as GetterTree<UsersState, unknown>;
