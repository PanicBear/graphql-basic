import { Data } from '../index.js';

const QueryResolver = {
  Query: {
    allTweets() {
      return Data.Tweet;
    },
    tweet(root, { id }) {
      console.log(root);
      console.log(id);
      return Data.Tweet.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return Data.User;
    },
  },
};

export default QueryResolver;
