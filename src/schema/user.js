import { gql } from 'apollo-server';

const User = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    """
    Is sum of firstName + lastName
    """
    fullName: String!
  }
`;

export default User;
