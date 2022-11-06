import { ApolloServer } from 'apollo-server';
import { Resolver, Schema } from './src/index.js';

const server = new ApolloServer({
  typeDefs: [Schema.Query, Schema.Mutation, Schema.User, Schema.Tweet],
  resolvers: {
    ...Resolver.Query,
    ...Resolver.Mutation,
    ...Resolver.User,
    ...Resolver.Tweet,
  },
});

server.listen().then(({ url }) => {
  console.log(`running on ${url}`);
});
