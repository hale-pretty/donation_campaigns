import { sequelize } from '../db/sequelize.js';
import { pubsub } from '../realtime/pubsub.js'
import { models } from '../db/models.js'

const Donation = models.Donation;
const User = models.User;

const createDonation = async (userId, campaignId, amount) => {

    let campaign;

    try {
        campaign = await getCampaign(campaignId);
    } catch (error) {
        throw new Error(`Failed to fetch campaign: ${error.message}`);
    }
    
    // Check constraints
    const currentDate = new Date()
    if (campaign.status != "open" || campaign.endDate < currentDate) {
        throw new Error("campaign is not opened for donation")
    }
    if (!Number.isInteger(amount) || amount > 10000000 || amount < 1000) {
        throw new Error("donation amount is not valid")
    }

    const transaction = await sequelize.transaction()
    
    try {
        // Create donation
        const newDonation = await Donation.create(
            {
                userId: userId,
                campaignId: campaign.id,
                amount: amount,
            },
            { transaction }
        )

        // Update campaign
        campaign.raisedAmount = Number.parseInt(campaign.raisedAmount) + Number.parseInt(amount)
        if (campaign.raisedAmount >= campaign.goalAmount ) {
            campaign.status = "closed"
        }
        await campaign.save({ transaction })
        
        await transaction.commit()
        console.log("donation created successfully:", newDonation);
        console.log("campaign updated successfully:", campaign)
        const user = await User.findByPk(userId)
        const donationResult = {
            ...newDonation.dataValues,
            user: user
        }
        
        // Publish the new donation and updated total to subscribers
        pubsub.publish('DONATION_ADDED', {
            donationAdded: {
                donationResult,
                totalRaised: campaign.raisedAmount
            }
        })
        
        return donationResult
        
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
            },
            include: [{ model: models.User, as: 'user' }]
        })
        console.log(`donations for user ${userId}:`, donations)
        return donations
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
            },
            include: [{ model: models.User, as: 'user' }]
        })
        console.log(`donations for campaign ${campaignId}:`, donations)
        return donations
    } catch (error) {
        console.log(`error fetching donations for campaign ${campaignId} :`, error)
        throw error
    }
}

const getCampaign = async (campaignId) => {
    try {
        const campaign = await models.Campaign.findByPk(campaignId)
        if (!campaign) {
            throw new Error(`Campaign with ID ${campaignId} does not exist.`)
        }
        return campaign
    } catch (error) {
        console.error(`Error fetching campaign with ID ${campaignId}:`, error);
        throw error
    }
}

export { createDonation, getDonationsByUser, getDonationsByCampaign }