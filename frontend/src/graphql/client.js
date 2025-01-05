import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { getMainDefinition } from '@apollo/client/utilities';


const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "apollo-require-preflight": "true",
  },
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(createClient({
  url: `ws://localhost:4000/graphql`,
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
