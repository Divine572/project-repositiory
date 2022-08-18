import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import cookieParser from 'cookie-parser';

import { resolvers } from './resolvers';
import connectDB from './utils/mongo';

async function bootstrap() {
  // build schema
  const schema = buildSchema({
    resolvers,
    // authChecker
  });

  // initialize express
  const app = express();
  app.use(cookieParser());

  // create apollo server
  const server = new ApolloServer({
    schema,
    context: () => {
      return 'user';
    },
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  });

  await server.start();

  // apply middleware to server
  server.applyMiddleware({ app });

  app.listen({ port: 5000 }, () => {
    console.log('Graphql server running on http://localhost:5000/graphql');
  });

  // connect to DATABASE
  connectDB();
}

bootstrap();
