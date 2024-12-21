import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/sequelize.js';
import { User } from '../../user/entity/user.js';

const Campaign = sequelize.define('Campaign', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  goalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'goal_amount',
  },
  raisedAmount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'raised_amount',
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'start_date',
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'end_date',
  },
  status: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
    field: 'user_id',
  },
}, {
  tableName: 'campaigns',
  timestamps: false,
});

Campaign.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Campaign, { foreignKey: 'userId', as: 'campaigns' });

export { Campaign };
