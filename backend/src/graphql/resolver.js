import { Campaign } from "../campaign/entity/campaign.js";
import { User } from "../user/entity/user.js";

const resolvers = {
  Query: {
    campaigns: async () => {
      return await Campaign.findAll({ include: { model: User, as: 'user' } });
    },
    campaign: async (_, { id }) => {
      return await Campaign.findByPk(id, { include: { model: User, as: 'user' } });
    },
  },
  Mutation: {
    createCampaign: async (_, args) => {
      return await Campaign.create(args);
    },
    updateCampaign: async (_, { id, ...updateFields }) => {
      const campaign = await Campaign.findByPk(id);
      if (!campaign) throw new Error('Campaign not found');
      return await campaign.update(updateFields);
    },
    deleteCampaign: async (_, { id }) => {
      const campaign = await Campaign.findByPk(id);
      if (!campaign) throw new Error('Campaign not found');
      await campaign.destroy();
      return true;
    },
  },
};

export { resolvers };