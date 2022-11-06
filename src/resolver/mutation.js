import { Data } from '../index.js';

const MutationResolver = {
  Mutation: {
    postTweet(_, { text, userId: id }) {
      const isValidUser = Data.User.find((user) => user.id === id);

      if (isValidUser) {
        const newTweet = {
          id,
          text,
        };
        Data.Tweet.push(newTweet);
        return newTweet;
      }

      throw Error('missing user');
    },
    deleteTweet(_, { id }) {
      const tweet = Data.Tweet.find((tweet) => tweet.id === id);

      if (!tweet) return false;

      Data.Tweet = Data.Tweet.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
};

export default MutationResolver;
