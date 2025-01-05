import { models } from '../db/models.js'
import { createMultipleCampaignImages, deleteMultipleCampaignImages, updateMultipleCampaignImages } from '../campaign_image/campaignImageService.js'

const User = models.User
const Campaign = models.Campaign
const CampaignImage = models.CampaignImage
const Donation = models.Donation

export const createCampaign = async (request, userId) => {
	const { images, ...createFields } = request
	const campaign = await Campaign.create({
		...createFields,
		userId,
	})

	if (images) {
		await createMultipleCampaignImages(campaign.id, images)
	}

	return await Campaign.findByPk(campaign.id, {
		include: [
			{ model: User, as: 'user' },
			{ model: CampaignImage, as: 'images' },
		],
	})
}

export const updateCampaign = async (request, userId) => {
  const { id, images, ...updateFields } = request
  const campaign = await Campaign.findByPk(id)

  if (!campaign) {
    throw new Error('Campaign not found')
  }

  if (campaign.userId !== userId) {
    throw new Error('You do not have permission to update this campaign');
  }

  await campaign.update(updateFields)

  if (images) {
    await updateMultipleCampaignImages(id, images)
  }

  return campaign
}

export const deleteCampaign = async (id, userId) => {
    const campaign = await Campaign.findByPk(id)
    if (!campaign) {
        throw new Error('Campaign not found')
    }

    if (campaign.userId !== userId) {
      throw new Error('You do not have permission to delete this campaign');
    }

    await deleteMultipleCampaignImages(id)

    await campaign.destroy()

    return true
    }