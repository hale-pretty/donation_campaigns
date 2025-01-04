import { sequelize } from './sequelize.js';
import { Campaign } from '../campaign/entity/campaign.js'
import { User } from '../user/entity/user.js'
import { CampaignImage } from '../campaign/entity/campaign_image.js'

const CampaignModel = Campaign(sequelize);
const UserModel = User(sequelize);
const CampaignImageModel = CampaignImage(sequelize);

const models = {
  Campaign: CampaignModel,
  CampaignImage: CampaignImageModel,
  User: UserModel,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { models };
