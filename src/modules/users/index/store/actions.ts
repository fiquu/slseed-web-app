import { graphqlOperation } from '@aws-amplify/api';

import { QueryUsers } from '../graphql/query';
import api from '@/services/api';

interface FetchAllResult {
  data: {
    users: {
      _id?: string;
      sub?: string;
      name?: string;
    };
  };
}

export default {
  async fetchAll({ commit }): Promise<void> {
    const { data }: FetchAllResult = await api.graphql(
      graphqlOperation(QueryUsers)
    ) as unknown as FetchAllResult;

    commit('setUsers', data.users);
  }
};
