import { Campaign } from "../campaign/entity/campaign.js";
import { User } from "../user/entity/user.js";
import { handleResolverError } from "../util/handleResolverError.js";
import { uploadImage } from "../storage/index.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
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
  },
};

export { resolvers };