// import { Campaign } from '../campaign/entity/campaign.js'
// import { User } from '../user/entity/user.js'
// import { handleResolverError } from '../util/handleResolverError.js'
// import { uploadImage } from '../storage/index.js'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
// import { CampaignImage } from '../campaign/entity/campaign_image.js'
// import {
// 	createDonation,
// 	getDonationsByUser,
// 	getDonationsByCampaign,
// } from '../donation/service/index.js'
// import {
// 	createUser,
// 	login,
// 	uploadAvatar,
// 	updateUser,
// } from '../user/service/index.js'
import { models } from '../db/models.js'

const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		campaigns: async () => {
      console.log(models)
			console.log(models.Campaign.associations)
			console.log(models.User.associations)
			console.log(models.CampaignImage.associations)
			return await models.Campaign.findAll({
				// include: [
				// 	{ model: 'User', as: 'user' },
				// 	{ model: 'CampaignImage', as: 'images' },
				// ],
			})
		},
		// campaign: handleResolverError(async (_, { id }) => {
		// 	const campaign = await Campaign.findByPk(id, {
		// 		include: [
		// 			{ model: User, as: 'user' },
		// 			{ model: CampaignImage, as: 'images' },
		// 		],
		// 	})
		// 	if (!campaign) throw new Error('Campaign not found')
		// 	return campaign
		// }),

		// getDonationsByUser: async () => {
		//   try {
		//     return await getDonationsByUser(1);
		//   } catch (error) {
		//     console.error('Error fetching donations by user:', error);
		//     throw new Error('Unable to fetch donations');
		//   }
		// },

		// getDonationsByCampaign: async (_, { campaignId }) => {
		//   try {
		//     return await getDonationsByCampaign(campaignId);
		//   } catch (error) {
		//     console.error('Error fetching donations by campaign:', error);
		//     throw new Error('Unable to fetch donations');
		//   }
		// },
		// getCurrentUser: handleResolverError(async (_, __, { auth }) => {
		//   if (!auth) throw new Error('User not found');
		//   return await User.findByPk(auth.id);
		// }),
	},
	Mutation: {
		// createCampaign: handleResolverError(async (_, args, { auth }) => {
		//   if (!auth) throw new Error('Unauthorized');
		//   // const imageUrl = await uploadImage(args.image);
		//   // args.image = imageUrl;
		//   args.userId = auth.id;
		//   args.status = 'open';
		//   return await Campaign.create(args);
		// }),
		// updateCampaign: handleResolverError(async (_, { id, ...updateFields }, { auth }) => {
		//   if (!auth) throw new Error('Unauthorized');
		//   const campaign = await Campaign.findByPk(id);
		//   if (!campaign) throw new Error('Campaign not found');
		//   if (campaign.userId !== auth?.id) throw new Error('Unauthorized');
		//   if (updateFields.image) {
		//     const imageUrl = await uploadImage(updateFields.image);
		//     updateFields.image = imageUrl;
		//   }
		//   return await campaign.update(updateFields);
		// }),
		// deleteCampaign: handleResolverError(async (_, { id }) => {
		//   if (!auth) throw new Error('Unauthorized');
		//   const campaign = await Campaign.findByPk(id);
		//   if (!campaign) throw new Error('Campaign not found');
		//   return await campaign.destroy();
		// }),
		// createDonation: async (_, { campaignId, amount }, {auth}) => {
		//   if (!auth) throw new Error('User not found');
		//   try {
		//     const donation = await createDonation(auth.id, campaignId, amount);
		//     return donation;
		//   } catch (error) {
		//     console.error('Error creating donation:', error);
		//     throw new Error('Unable to create donation');
		//   }
		// },
		// register: handleResolverError(async (_, { request }) => {
		//   return await createUser(request);
		// }),
		// login: handleResolverError(async (_, { username, password }) => {
		//   return await login(username, password);
		// }),
		// addAvatar: handleResolverError(async (_, { image }, { auth }) => {
		//   if (!auth) throw new Error('User not found');
		//   return await uploadAvatar(auth.id, image);
		// }),
		// updateUser: handleResolverError(async (_, { request }, { auth }) => {
		//   if (!auth) throw new Error('User not found');
		//   return await updateUser(auth.id, request);
		// }),
		// 	createCampaign: handleResolverError(
		// 		async (_, { images, ...createFields }) => {
		// 			const campaign = await Campaign.create({
		// 				...createFields,
		// 			})
		// 			if (images) {
		// 				for (const image of images) {
		// 					const imageUrl = await uploadImage(image)
		// 					await CampaignImage.create({
		// 						campaignId: campaign.id,
		// 						imageUrl,
		// 					})
		// 				}
		// 			}
		// 			return campaign
		// 		}
		// 	),
		// 	updateCampaign: handleResolverError(
		// 		async (_, { id, ...updateFields }) => {
		// 			const campaign = await Campaign.findByPk(id)
		// 			if (!campaign) throw new Error('Campaign not found')
		// 			if (updateFields.image) {
		// 				const imageUrl = await uploadImage(updateFields.image)
		// 				updateFields.image = imageUrl
		// 			}
		// 			return await campaign.update(updateFields)
		// 		}
		// 	),
		// 	deleteCampaign: handleResolverError(async (_, { id }) => {
		// 		const campaign = await Campaign.findByPk(id)
		// 		if (!campaign) throw new Error('Campaign not found')
		// 		return await campaign.destroy()
		// 	}),
	},
}

export { resolvers }
