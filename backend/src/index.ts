import express, { Application } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import * as dotenv from 'dotenv';

// env loading
dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const DATABASE_URL: string = process.env.DATABASE_URL || '';

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

console.log(`Server is running on port ${PORT}`);
console.log(`Server is running on port ${DATABASE_URL}`);


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app: Application = express();

// Apply Apollo middleware
server.start().then(() => {
  server.applyMiddleware({ app: app as any });

  // Start Express server
  app.listen(4000, () => {
    console.log('Server ready at http://localhost:4000/graphql');
  });
});