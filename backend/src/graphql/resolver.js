import { Campaign } from '../campaign/entity/campaign.js'
import { User } from '../user/entity/user.js'
import { handleResolverError } from '../util/handleResolverError.js'
import { uploadImage } from '../storage/index.js'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { CampaignImage } from '../campaign/entity/campaign_image.js'

const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		campaigns: async () => {
      console.log(Campaign.associations);
console.log(User.associations);
console.log(CampaignImage.associations);
			return await Campaign.findAll({
				include: [
					{ model: User, as: 'user' },
					{ model: CampaignImage, as: 'images' },
				],
			})
		},
		campaign: handleResolverError(async (_, { id }) => {
			const campaign = await Campaign.findByPk(id, {
				include: [
					{ model: User, as: 'user' },
					{ model: CampaignImage, as: 'images' },
				],
			})
			if (!campaign) throw new Error('Campaign not found')
			return campaign
		}),
	},
	Mutation: {
		createCampaign: handleResolverError(
			async (_, { images, ...createFields }) => {
				const campaign = await Campaign.create({
					...createFields,
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

				return campaign
			}
		),
		updateCampaign: handleResolverError(
			async (_, { id, ...updateFields }) => {
				const campaign = await Campaign.findByPk(id)
				if (!campaign) throw new Error('Campaign not found')

				if (updateFields.image) {
					const imageUrl = await uploadImage(updateFields.image)
					updateFields.image = imageUrl
				}
				return await campaign.update(updateFields)
			}
		),
		deleteCampaign: handleResolverError(async (_, { id }) => {
			const campaign = await Campaign.findByPk(id)
			if (!campaign) throw new Error('Campaign not found')
			return await campaign.destroy()
		}),
	},
}

export { resolvers }
