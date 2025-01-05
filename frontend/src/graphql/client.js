import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "apollo-require-preflight": "true",
  },
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
});

export default client;