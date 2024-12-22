import { Campaign } from "../campaign/entity/campaign.js";
import { User } from "../user/entity/user.js";
import { handleResolverError } from "../util/handleResolverError.js";

const resolvers = {
  Query: {
    campaigns: handleResolverError(async () => {
      return await Campaign.findAll({ include: { model: User, as: 'user' } });
    }),
    campaign: handleResolverError(async (_, { id }) => {
      const campaign = await Campaign.findByPk(id, { include: { model: User, as: 'user' } });
      if (!campaign) throw new Error('Campaign not found', );
      return campaign;
    }),
  },
  Mutation: {
    createCampaign: handleResolverError(async (_, args) => {
      return await Campaign.create(args);
    }),
    updateCampaign: handleResolverError(async (_, { id, ...updateFields }) => {
      const campaign = await Campaign.findByPk(id);
      if (!campaign) throw new Error('Campaign not found');
      return await campaign.update(updateFields);
    }),
    deleteCampaign: handleResolverError(async (_, { id }) => {
      const campaign = await Campaign.findByPk(id);
      if (!campaign) throw new Error('Campaign not found');
      return await campaign.destroy();
    }),
  },
};

export { resolvers };