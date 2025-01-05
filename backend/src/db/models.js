import { sequelize } from './sequelize.js'
import { DataTypes } from 'sequelize';
import {Campaign} from '../campaign/campaignModel.js'
import {User} from '../user/userModel.js'
import {CampaignImage} from '../campaign_image/campaignImageModel.js'
import { Donation } from '../donation/donationModel.js';

const models = {
  User: User(sequelize, DataTypes),
  Campaign: Campaign(sequelize, DataTypes),
  CampaignImage: CampaignImage(sequelize, DataTypes),
  Donation: Donation(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
	if (models[modelName]?.associate) {
		models[modelName].associate(models)
	}
})

export { models }
