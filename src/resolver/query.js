import fetch from 'node-fetch';
import { Data } from '../index.js';

const QueryResolver = {
  Query: {
    allMovies() {
      return fetch('https://yts.mx/api/v2/list_movies.json')
        .then((response) => response.json())
        .then((json) => json.data.movies);
    },
    allUsers() {
      return Data.User;
    },
    allTweets() {
      return Data.Tweet;
    },
    tweet(root, { id }) {
      console.log(root);
      console.log(id);
      return Data.Tweet.find((tweet) => tweet.id === id);
    },
    movie(_, { id }) {
      return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        .then((response) => response.json())
        .then((json) => json.data.movie);
    },
  },
};

export default QueryResolver;
