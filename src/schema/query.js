import { gql } from 'apollo-server';

const Query = gql`
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
`;

export default Query;
