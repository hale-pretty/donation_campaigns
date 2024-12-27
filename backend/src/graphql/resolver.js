import { createDonation, getDonationsByUser, getDonationsByCampaign } from "../donation/service/index.js"
import { Campaign } from "../campaign/entity/campaign.js";
import { User } from "../user/entity/user.js";
import { handleResolverError } from "../util/handleResolverError.js";
import { uploadImage } from "../storage/index.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const resolvers = {
  Upload: GraphQLUpload,
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
    campaigns: handleResolverError(async () => {
      return await Campaign.findAll({ include: { model: User, as: 'user' } });
    }),
    campaign: handleResolverError(async (_, { id }) => {
      const campaign = await Campaign.findByPk(id, { include: { model: User, as: 'user' } });
      if (!campaign) throw new Error('Campaign not found');
      return campaign;
    }),
  },
  Mutation: {
    createCampaign: handleResolverError(async (_, args) => {
      const imageUrl = await uploadImage(args.image);
      args.image = imageUrl;
      return await Campaign.create(args);
    }),
    updateCampaign: handleResolverError(async (_, { id, ...updateFields }) => {
      const campaign = await Campaign.findByPk(id);
      if (!campaign) throw new Error('Campaign not found');

      if (updateFields.image) {
        const imageUrl = await uploadImage(updateFields.image);
        updateFields.image = imageUrl;
      }
      return await campaign.update(updateFields);
    }),
    deleteCampaign: handleResolverError(async (_, { id }) => {
      const campaign = await Campaign.findByPk(id);
      if (!campaign) throw new Error('Campaign not found');
      return await campaign.destroy();
    }),
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