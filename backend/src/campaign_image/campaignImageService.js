import { uploadImage, deleteImage } from '../storage/index.js'
import { models } from '../db/models.js';

const CampaignImage = models.CampaignImage

export const createMultipleCampaignImages = async (campaignId, images) => {
    for (const image of images) {
        const imageUrl = await uploadImage(image)
        await CampaignImage.create({
            campaignId,
            imageUrl,
        })
    }
}

export const updateMultipleCampaignImages = async (campaignId, images) => {
    const existingImages = await CampaignImage.findAll({
        where: { campaignId },
    })
    for (const image of existingImages) {
        await deleteImage(image.imageUrl)
    }

    await CampaignImage.destroy({
        where: { campaignId },
    })

    for (const image of images) {
        const imageUrl = await uploadImage(image)
        await CampaignImage.create({
            campaignId,
            imageUrl,
        })
    }
}

export const deleteMultipleCampaignImages = async (campaignId) => {
    const images = await CampaignImage.findAll({
        where: { campaignId },
    })
    for (const image of images) {
        await deleteImage(image.imageUrl)
    }

    await CampaignImage.destroy({
        where: { campaignId },
    })
}