import { Data } from '../index.js';

const TweetResolver = {
  Tweet: {
    author(root, args) {
      const { userId } = root;
      const user = Data.User.find((user) => user.id === userId);

      return user;
    },
  },
};

export default TweetResolver;
