import { gql } from 'apollo-server';

const Tweet = gql`
  """
  Tweet object represents a resource for a Tweet
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
`;

export default Tweet;
