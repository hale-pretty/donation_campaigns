import { sequelize } from '../../db/sequelize.js';
import { Donation } from '../entity/donation.js'

const createDonation = async (userId, campaign, amount) => {
    const currentDate = new Date()
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

const getDonationByUser = async (userId) => {
    try {
        const donations = await Donation.findAll({
            where: {
                userId: userId
            }
        })
        console.log(`donations for user ${userId}:`, donations)
    } catch (error) {
        console.log("error fetching donations:", error)
        throw error
    }
}

const getDonationByCampaign = async (campaignId) => {
    try {
        const donations = await Donation.findAll({
            where: {
                campaignId: campaignId
            }
        })
        console.log(`donations for campaign ${campaignId}:`, donations)
    } catch (error) {
        console.log("error fetching donations:", error)
        throw error
    }
}

export { createDonation, getDonationByUser, getDonationByCampaign }