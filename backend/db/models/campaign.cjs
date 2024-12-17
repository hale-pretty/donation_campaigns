'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Campaign.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    goal_amount: DataTypes.DECIMAL,
    raised_amount: DataTypes.DECIMAL,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Campaign',
  });

  Campaign.associate = function(models) {
    Campaign.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };
  
  return Campaign;
};