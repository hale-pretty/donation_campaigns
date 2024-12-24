import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../../db/sequelize.js';
import { User } from '../../user/entity/user.js';

const Donation = sequelize.define('Donation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'id',
      },
    field: 'user_id',
  },
  campaignId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'campaign_id',
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: falses
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  },
}, {
  tableName: 'donations',
  timestamps: false,
});

export { Donation };