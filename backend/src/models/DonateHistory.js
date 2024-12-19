import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';

const DonateHistory = sequelize.define("DonateHistory", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    received_userid: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    transfer_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
})
export { DonateHistory };
