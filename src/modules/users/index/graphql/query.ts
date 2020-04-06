import gql from 'graphql-tag';

export const QueryUsers = gql`
  query {
    users {
      _id
      sub
      name
    }
  }
`;
