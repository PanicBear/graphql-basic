import { gql } from 'apollo-server';

const Mutation = gql`
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

export default Mutation;
