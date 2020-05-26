import { graphqlOperation } from '@aws-amplify/api';
import { ActionTree } from 'vuex';

import api from '@/services/api';

import { UsersState, UserModel } from './state';
import { QueryUsers } from '../graphql/query';

export default {
  async fetchAll({ commit }): Promise<void> {
    const { data } = await api.graphql(graphqlOperation(QueryUsers)) as {
      data: {
        users: UserModel[];
      };
    };

    commit('setUsers', data.users);
  }
} as ActionTree<UsersState, {}>;
