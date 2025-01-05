import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($request: UserRegisterRequest!) {
    register(request: $request) {
      id
      username
      email
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

export const CREATE_DONATION = gql`
  mutation CreateDonation($campaignId: Int!, $amount: Long!) {
    createDonation(campaignId: $campaignId, amount: $amount) {
      id
      userId
      campaignId
      createdAt
      amount
    }
  }
`;

export const ADD_AVATAR = gql`
  mutation AddAvatar($image: Upload!) {
    addAvatar(image: $image) {
      id
    }
  }
`;

export const GET_CAMPAIGNS = gql`
  query getAllCampaigns {
    getAllCampaigns { 
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
  query GetCampaignById($campaignId: Int!) {
    getCampaignById(id: $campaignId) {
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
      user {
        username
        email
        avatarUrl
      }
    }
  }
`;


export const GET_DONATIONS_BY_USER = gql`
  query GetDonationsByUser {
    getDonationsByUser {
      id
      userId
      campaignId
      createdAt
      amount
    }
  }
`;
