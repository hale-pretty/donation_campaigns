import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import { resolvers } from './graphql/resolver.js';
import { sequelize } from './db/sequelize.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { configContainer } from './storage/index.js';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { authMiddleware } from './user/auth/middleware.js';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { pubsub } from './realtime/pubsub.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const typeDefs = readFileSync(join(__dirname, 'graphql', 'schema.graphql'), 'utf-8');

const app = express();
app.use(graphqlUploadExpress());

const port = Number.parseInt(process.env.PORT) || 4000;

const server = new ApolloServer({ typeDefs, resolvers, uploads: true });

// Start the server
(async () => {
  try {
    await sequelize.authenticate();
    await configContainer();
    console.log('Database connected successfully.');
    await server.start();
    app.use(
      '/graphql',
      cors(), // Enable CORS
      bodyParser.json(), // Parse JSON
      expressMiddleware(server, {
        context: authMiddleware,
      }) // Apollo middleware for Express
    );
    app.listen({ port }, () =>
      console.log(`Server ready at http://localhost:${port}/graphql`)
    );
    const wsServer = new WebSocketServer({
      server: app,
      path: '/graphql',
    })
    useServer({ schema: { typeDefs, resolvers }, pubsub }, wsServer);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

