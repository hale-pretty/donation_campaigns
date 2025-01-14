import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { createDonation, getDonationsByCampaign, getDonationsByUser } from "../donation/donationService.js"
import { createUser, login, uploadAvatar, updateUser } from "../user/userService.js";
import { pubsub } from '../realtime/pubsub.js'
import { withFilter } from "graphql-subscriptions";
import { models } from '../db/models.js'
import { createCampaign, updateCampaign, deleteCampaign } from '../campaign/campaignService.js';
import { GraphQLLong } from 'graphql-scalars';


const User = models.User
const Campaign = models.Campaign
const CampaignImage = models.CampaignImage
const Donation = models.Donation

const resolvers = {
	Upload: GraphQLUpload,
	Long: GraphQLLong,
	Query: {
		getAllCampaigns: async () => {
			return await Campaign.findAll({
				include: [
					{ model: User, as: 'user' },
					{ model: CampaignImage, as: 'images' },
				],
			})
		},
		getDonationsByUser: async (_, __, { auth }) => {
			if (!auth) throw new Error('User not found');
			return getDonationsByUser(auth.id)
		},
		getCampaignById: async (_, { id }) => {
			const campaign = await Campaign.findByPk(id, {
				include: [
					{ model: User, as: 'user' },
					{ model: CampaignImage, as: 'images' },
          { 
            model: Donation, 
            as: 'donations',
            include: [
              { model: User, as: 'user' }
            ]
          },
				],
			})
			if (!campaign) throw new Error('Campaign not found')
			return campaign
		},

		getDonationsByCampaignId: async (_, { campaignId }) => {
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
          { model: Donation, as: 'donations' },
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
      return await createCampaign(request, auth.id);
		},
		updateCampaign: async (_, { request }, { auth }) => {
			if (!auth) throw new Error('Unauthorized')
      return await updateCampaign(request, auth.id);
		},
		deleteCampaign: async (_, { id }, { auth }) => {
			if (!auth) throw new Error('Unauthorized')
			return await deleteCampaign(id, auth.id);
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
