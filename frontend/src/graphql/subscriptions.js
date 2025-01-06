import { gql } from '@apollo/client';

export const DONATION_ADDED = gql`
  subscription donationAdded($campaignId: Int!) {
    donationAdded(campaignId: $campaignId) {
      newDonation {
        id
        amount
        createdAt
        user {
          username
          avatarUrl
        }
      }
      totalRaised
      campaignUpdatedDonations {
        amount
        createdAt
        user {
          username
          avatarUrl
        }
      }
    }
  }
`;