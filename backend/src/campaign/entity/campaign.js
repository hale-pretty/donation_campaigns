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
    validate: {
      notEmpty: {
        msg: 'Title cannot be empty.',
      },
      len: {
        args: [3, 255],
        msg: 'Title must be between 3 and 255 characters.',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Description cannot be empty.',
      },
    },
  },
  goalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'goal_amount',
    validate: {
      isInt: {
        msg: 'Goal amount must be a valid number.',
      },
      min: {
        args: [1000],
        msg: 'Goal amount must be at least 1000.',
      },
      isLargeEnough(value) {
        if (value < this.raised_amount) {
          throw new Error('Goal amount must be larger than the raised amount.');
        }
      }
    },
  },
  raisedAmount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'raised_amount',
    validate: {
      isInt: {
        msg: 'Raised amount must be a valid number.',
      },
      min: {
        args: [0],
        msg: 'Raised amount cannot be negative.',
      },
    },
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
    validate: {
      isDate: {
        msg: 'End date must be a valid date.',
      },
      isBeforeEndDate(value) {
        if (value < this.start_date) {
          throw new Error('End date must be before the start date.');
        }
      },
    },
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
