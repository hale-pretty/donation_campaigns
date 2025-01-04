import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

const wsLink = new GraphQLWsLink(createClient({
  url: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
}));

const wsClient = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

const DONATION_ADDED = gql`
  subscription donationAdded($campaignId: Int!) {
    donationAdded(campaignId: $campaignId) {
      newDonation {
        id
        amount
        createdAt
      }
      totalRaised
    }
  }
`;

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

export { client, wsClient };