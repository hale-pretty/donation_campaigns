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

export const GET_CAMPAIGNS = gql`
  query Campaigns {
    campaigns {
      id
      title
      description
      goalAmount
      raisedAmount
      startDate
      endDate
      status
      images {
        imageUrl
      }
    }
  }
`;

export const GET_CAMPAIGN_BY_ID = gql`
  query Campaign($campaignId: Int!) {
    campaign(id: $campaignId) {
      id
      title
      description
      goalAmount
      raisedAmount
      startDate
      endDate
      status
      images {
        imageUrl
      }
    }
  }
`