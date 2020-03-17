import gql from 'graphql-tag';

export const FETCH_ALL = gql`
  query {
    users {
      name,
      sub
    }
  }
`;
