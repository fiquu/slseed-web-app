import { graphqlOperation } from '@aws-amplify/api';

import { FETCH_ALL } from '../graphql/query';
import api from '@/services/api';

export default {
  async fetchAll({ commit }): Promise<void> {
    const { data }: any = await api.graphql( // eslint-disable-line @typescript-eslint/no-explicit-any
      graphqlOperation(FETCH_ALL)
    );

    commit('setUsers', data.users);
  }
};
