import { sequelize } from '../../db/sequelize.js';
import { Donation } from '../entity/donation.js'

const createDonation = async (userId, campaignId, amount) => {
    const currentDate = new Date()
    const campaign = getCampaign(campaignId)
    if (campaign.status != "open" || campaign.endDate < currentDate) {
        throw new Error("campaign is not opened for donation")
    }
    if (!Number.isInteger(amount) || amount > 10000000 || amount < 1000) {
        throw new Error("donation amount is not valid")
    }

    const transaction = await sequelize.transaction()
    
    try {
        const newDonation = await Donation.create(
            {
                userId: userId,
                campaignId: campaign.id,
                amount
            },
            { transaction }
        )
        await transaction.commit()
        console.log("donation created successfully:", newDonation);
        return newDonation
        
    } catch (error) {
        await transaction.rollback();
        console.error("error creating donation:", error);
        throw error
    }
}

const getDonationsByUser = async (userId) => {
    try {
        const donations = await Donation.findAll({
            where: {
                userId: userId
            }
        })
        console.log(`donations for user ${userId}:`, donations)
    } catch (error) {
        console.log(`error fetching donations for user ${userId}:`, error)
        throw error
    }
}

const getDonationsByCampaign = async (campaignId) => {
    try {
        const donations = await Donation.findAll({
            where: {
                campaignId: campaignId
            }
        })
        console.log(`donations for campaign ${campaignId}:`, donations)
    } catch (error) {
        console.log(`error fetching donations for campaign ${campaignId} :`, error)
        throw error
    }
}

const getCampaign = (campaignId) => {
    return {
        "id": campaignId,
        "status": "open",
        "endDate": Date.now()
    }
}

export { createDonation, getDonationsByUser, getDonationsByCampaign }