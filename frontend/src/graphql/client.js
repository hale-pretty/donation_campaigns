import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { getMainDefinition } from '@apollo/client/utilities';

const HTTP_BACKEND_URL = import.meta.env.VITE_HTTP_BACKEND_ENDPOINT || "http://localhost:4000"
const WS_BACKEND_URL = import.meta.env.VITE_WS_BACKEND_ENDPOINT || "ws://localhost:4000"

const uploadLink = createUploadLink({
  uri: `${HTTP_BACKEND_URL}/graphql`,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "apollo-require-preflight": "true",
  },
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(createClient({
  url: `${WS_BACKEND_URL}/graphql`,
  options: {
    reconnect: true,
  },
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export { client };
