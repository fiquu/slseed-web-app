import gql from 'graphql-tag';

import { SessionConfig } from '@/services/session';

const config: SessionConfig = {
  signIn: '/users/sign-in',
  query: gql`
    query Session {
      session {
        _id
        name
      }
    }
  `
};

export default config;
