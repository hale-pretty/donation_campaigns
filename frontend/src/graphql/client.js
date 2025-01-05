import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
});


const wsClient = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

export { client, wsClient };

// // Subscribe to the donation updates
// wsClient.subscribe({
//   query: DONATION_ADDED,
//   variables: { campaignId: 1 },
// }).subscribe({
//   next(data) {
//     console.log('New donation update:', data);
//   },
//   error(err) {
//     console.error('Subscription error:', err);
//   },
// });
