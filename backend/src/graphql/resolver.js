import { uploadImage, deleteImage } from '../storage/index.js'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { createDonation, getDonationsByUser, getDonationsByCampaign } from "../donation/donationService.js"
import { createUser, login, uploadAvatar, updateUser } from "../user/userService.js";
import { pubsub } from '../realtime/pubsub.js'
import { withFilter } from "graphql-subscriptions";
import { models } from '../db/models.js'

const User = models.User
const Campaign = models.Campaign
const CampaignImage = models.CampaignImage

const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		campaigns: async () => {
			return await Campaign.findAll({
				include: [
					{ model: User, as: 'user' },
					{ model: CampaignImage, as: 'images' },
				],
			})
		},
		campaign: async (_, { id }) => {
			const campaign = await Campaign.findByPk(id, {
				include: [
					{ model: User, as: 'user' },
					{ model: CampaignImage, as: 'images' },
				],
			})
			if (!campaign) throw new Error('Campaign not found')
			return campaign
		},

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
		getCurrentUser: async (_, __, { auth }) => {
		  if (!auth) throw new Error('User not found');
		  return await User.findByPk(auth.id, {
        include: [
					{ model: Campaign, as: 'campaigns' },
				],
      });
		},
	},
	Mutation: {
		register: async (_, { request }) => {
		  return await createUser(request);
		},
		login: async (_, { username, password }) => {
		  return await login(username, password);
		},
		addAvatar: async (_, { image }, { auth }) => {
		  if (!auth) throw new Error('User not found');
		  return await uploadAvatar(auth.id, image);
		},
		updateUser: async (_, { request }, { auth }) => {
		  if (!auth) throw new Error('User not found');
		  return await updateUser(auth.id, request);
		},

		createCampaign: async (_, { request }, { auth }) => {
			if (!auth) throw new Error('Unauthorized')

			const { images, ...createFields } = request
			const campaign = await Campaign.create({
				...createFields,
        userId: auth.id,
			})

			if (images) {
				for (const image of images) {
					const imageUrl = await uploadImage(image)
					await CampaignImage.create({
						campaignId: campaign.id,
						imageUrl,
					})
				}
			}

			return await Campaign.findByPk(campaign.id, {
				include: [
					{ model: User, as: 'user' },
					{ model: CampaignImage, as: 'images' },
				],
			})
		},
		updateCampaign: async (_, { request }, { auth }) => {
			if (!auth) throw new Error('Unauthorized')

			const { id, images, ...updateFields } = request
			const campaign = await Campaign.findByPk(id)

			if (!campaign) {
				throw new Error('Campaign not found')
			}

			if (campaign.userId !== auth.id) {
			  throw new Error('You do not have permission to update this campaign');
			}

			await campaign.update(updateFields)

			if (images) {
				const existingImages = await CampaignImage.findAll({
					where: { campaignId: campaign.id },
				})
				for (const image of existingImages) {
					await deleteImage(image.imageUrl)
				}

				await CampaignImage.destroy({
					where: { campaignId: campaign.id },
				})

				for (const image of images) {
					const imageUrl = await uploadImage(image)
					await CampaignImage.create({
						campaignId: campaign.id,
						imageUrl,
					})
				}
			}

			return campaign
		},
		deleteCampaign: async (_, { id }, { auth }) => {
			if (!auth) throw new Error('Unauthorized')

			const campaign = await Campaign.findByPk(id)
			if (!campaign) {
				throw new Error('Campaign not found')
			}

			if (campaign.userId !== auth.id) {
			  throw new Error('You do not have permission to delete this campaign');
			}

			const images = await CampaignImage.findAll({
				where: { campaignId: id },
			})
			for (const image of images) {
				await deleteImage(image.imageUrl)
			}

			await CampaignImage.destroy({ where: { campaignId: id } })
			await campaign.destroy()

			return true
		},
    
    createDonation: async (_, { campaignId, amount }, {auth}) => {
		  if (!auth) throw new Error('User not found');
		  try {
		    const donation = await createDonation(auth.id, campaignId, amount);
		    return donation;
		  } catch (error) {
		    console.error('Error creating donation:', error);
		    throw new Error('Unable to create donation');
		  }
		},
	},
  Subscription: {
    donationAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterableIterator('DONATION_ADDED'),
        (payload, variables) =>
          payload.donationAdded.newDonation.campaignId === variables.campaignId
      ),
    },
  }
}

export { resolvers }
