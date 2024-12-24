import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolver.js';
import { sequelize } from './db/sequelize.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { configContainer } from './storage/index.js';
import { createDonation } from './donation/service/index.js';
import { createUser } from './user/service/index.js';

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

    const campaign = {
      id: 1,
      status: "open",
      endDate: new Date("2024-12-25"),
  }

    createDonation(1, campaign, 20000)
      .then((donation) => console.log("Donation created:", donation))
      .catch((error) => console.error("Failed to create donation:", error));


    app.listen({ port }, () =>
      console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

