import { ApolloServer, gql } from 'apollo-server';

let tweets = [
  {
    id: '1',
    text: 'tweet1',
    userId: '2',
  },
  {
    id: '2',
    text: 'tweet2',
    userId: '1',
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
      console.log(root);
      console.log(id);
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return users;
    },
  },
  Mutation: {
    postTweet(_, { text, userId: id }) {
      const isValidUser = users.find((user) => user.id === id);

      if (isValidUser) {
        const newTweet = {
          id,
          text,
        };
        tweets.push(newTweet);
        return newTweet;
      }

      throw Error('missing user');
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
  Tweet: {
    author(root, args) {
      const { userId } = root;
      const user = users.find((user) => user.id === userId);

      return user;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`running on ${url}`);
});
