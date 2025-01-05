import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    "Access-Control-Allow-Origin": "*",
  },
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
});

export default client;