import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers } from './graphql/resolver.js';
import { sequelize } from './db/sequelize.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { configContainer } from './storage';
import context from './contexts/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const typeDefs = readFileSync(join(__dirname, 'graphql', 'schema.graphql'), 'utf-8');

const app = express();
const port = Number.parseInt(process.env.PORT) || 4000;

const server = new ApolloServer({ typeDefs, resolvers });

// Start the server



(async () => {
  try {
    await sequelize.authenticate();
    await configContainer();
    console.log('Database connected successfully.');
    await server.start();
    server.applyMiddleware({ app });
    app.use("/graphql", expressMiddleware(server, { context }));
    app.listen({ port }, () =>
      console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

