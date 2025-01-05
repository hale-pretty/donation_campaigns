export const Campaign = (sequelize, DataTypes) => {
	const Campaign = sequelize.define(
		'Campaign',
		{
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
				type: DataTypes.BIGINT,
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
							throw new Error(
								'Goal amount must be larger than the raised amount.'
							)
						}
					},
				},
			},
			raisedAmount: {
				type: DataTypes.BIGINT,
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
							throw new Error(
								'End date must be before the start date.'
							)
						}
					},
				},
			},
			status: {
				type: DataTypes.STRING,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'User',
					key: 'id',
				},
				onDelete: 'CASCADE',
				field: 'user_id',
			},
			location: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: '',
				validate: {
					notEmpty: {
						msg: 'Location cannot be empty.',
					},
				},
			},
			category: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: '',
				validate: {
					notEmpty: {
						msg: 'Category cannot be empty.',
					},
				},
			},
			tags: {
				type: DataTypes.ARRAY(DataTypes.TEXT),
				allowNull: false,
				defaultValue: [],
				validate: {
					isArray(value) {
						if (!Array.isArray(value)) {
							throw new Error('Tags must be an array of text.');
						}
					},
				},
			},
		},
		{
			tableName: 'campaigns',
			timestamps: false,
		}
	)

	Campaign.associate = (models) => {
		Campaign.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
		})
		Campaign.hasMany(models.CampaignImage, {
			foreignKey: 'campaignId',
			as: 'images',
		})
		Campaign.hasMany(models.Donation, {
			foreignKey: 'campaignId',
			as: 'donations',
		})
	}

	return Campaign
}
