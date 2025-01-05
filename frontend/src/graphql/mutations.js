import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($request: UserRegisterRequest!) {
    register(request: $request) {
      id
      username
      email
      firstName
      lastName
      avatarUrl
      bio
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      username
      email
      avatarUrl
      bio
    }
  }
`;

export const CREATE_NEW_CAMPAIGN = gql`
  mutation CreateCampaign($request: CreateCampaignRequest!) {
    createCampaign(request: $request) {
      id
      title
      user {
        id
        email
      }
      images {
        id
        imageUrl
      }
    }
  }
`;
