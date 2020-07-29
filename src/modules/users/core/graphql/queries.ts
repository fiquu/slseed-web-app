import gql from 'graphql-tag';

export const USERS = gql`
  query {
    users {
      _id
      sub
      name
      createdAt
      updatedAt
    }
  }
`;
