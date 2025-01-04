import { sequelize } from './sequelize.js'
import { DataTypes } from 'sequelize';
import {Campaign} from '../campaign/entity/campaign.js'
import {User} from '../user/entity/user.js'
import {CampaignImage} from '../campaign/entity/campaign_image.js'

const models = {
  User: User(sequelize, DataTypes),
  Campaign: Campaign(sequelize, DataTypes),
  CampaignImage: CampaignImage(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
	if (models[modelName]?.associate) {
		models[modelName].associate(models)
	}
})

export { models }
