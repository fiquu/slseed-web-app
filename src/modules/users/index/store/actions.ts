import { graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import { ActionTree } from 'vuex';

import api from '@/services/api';

import { UsersState, UserModel } from './state';

import { USERS } from '@/modules/users/core/graphql/queries';

interface FetchResult {
  users: UserModel[];
}

export default {
  async fetchAll({ commit }): Promise<void> {
    const { data }: GraphQLResult<FetchResult> = await api.graphql(graphqlOperation(USERS));

    commit('setUsers', data?.users);
  }
} as ActionTree<UsersState, unknown>;
