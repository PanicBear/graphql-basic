import { ApolloServer, gql } from 'apollo-server';

let tweets = [
  {
    id: '1',
    text: 'tweet1',
  },
  {
    id: '2',
    text: 'tweet2',
  },
];

let users = [
  {
    id: '1',
    firstName: 'Clark',
    lastName: 'Ko',
  },
  {
    id: '2',
    firstName: 'first',
    lastName: 'last',
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      // console.log(root);
      console.log(id);
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return users;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const id = tweets.length + 1;
      const newTweet = {
        id,
        text,
      };
      tweets.push(newTweet);
      console.log(tweets);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);

      if (!tweet) return false;

      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }, args) {
      const fullName = `${firstName} ${lastName}`;
      return fullName;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`running on ${url}`);
});
