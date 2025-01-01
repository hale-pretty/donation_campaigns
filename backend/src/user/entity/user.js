import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/sequelize.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  bio: {
    type: DataTypes.STRING,
  },
  avatarUrl: {
    type: DataTypes.STRING,
    field: 'avatar_url',
  },
}, {
  tableName: 'users',
  timestamps: false,
});

export { User };