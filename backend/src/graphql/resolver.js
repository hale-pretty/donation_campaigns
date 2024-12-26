import { createDonation, getDonationsByUser, getDonationsByCampaign } from "../donation/service/index.js"

const resolvers = {
  Query: {

    getDonationsByUser: async () => {
      try {
        return await getDonationsByUser(1);
      } catch (error) {
        console.error('Error fetching donations by user:', error);
        throw new Error('Unable to fetch donations');
      }
    },

    getDonationsByCampaign: async (_, { campaignId }) => {
      try {
        return await getDonationsByCampaign(campaignId);
      } catch (error) {
        console.error('Error fetching donations by campaign:', error);
        throw new Error('Unable to fetch donations');
      }
    },
  },
  Mutation: {
    createDonation: async (_, { campaignId, amount }) => {
      try {
        const donation = await createDonation(1, campaignId, amount);
        return donation;
      } catch (error) {
        console.error('Error creating donation:', error);
        throw new Error('Unable to create donation');
      }
    },
  },
};

export { resolvers };