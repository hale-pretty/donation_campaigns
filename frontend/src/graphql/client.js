import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const wsClient = new ApolloClient({
  wsLink,
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