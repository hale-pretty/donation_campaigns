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
import { authMiddleware } from './auth/middleware.js';
import './cronJob.js';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { pubsub } from './realtime/pubsub.js';
import http from 'http'; // Import the http module
import { makeExecutableSchema } from '@graphql-tools/schema'; // Import makeExecutableSchema


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const typeDefs = readFileSync(join(__dirname, 'graphql', 'schema.graphql'), 'utf-8');

const app = express();

app.use(graphqlUploadExpress({ maxFileSize: 50 * 1024 * 1024, maxFiles: 10 }));


const httpServer = http.createServer(app);

const port = Number.parseInt(process.env.PORT) || 4000;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({ schema, uploads: true });

// Start the server
(async () => {
  try {
    await sequelize.authenticate();
    await configContainer();
    console.log('Database connected successfully.');
    await server.start();
    app.use(
      '/graphql',
      cors({
        origin: process.env.REACT_CLIENT_URL,
        credentials: true,
      }), // Enable CORS
      bodyParser.json(), // Parse JSON
      expressMiddleware(server, {
        context: authMiddleware,
      }) // Apollo middleware for Express
    );
    httpServer.listen({ port }, () =>
      console.log(`Server ready at http://localhost:${port}/graphql`)
    );
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/graphql',
    })
    useServer({ schema, pubsub }, wsServer);  // GraphQL subscriptions
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

