export const Donation = (sequelize, DataTypes) => {
	const Donation = sequelize.define(
		'Donation',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'User',
					key: 'id',
				},
				field: 'user_id',
				onDelete: 'CASCADE',
			},
			campaignId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Campaign',
					key: 'id',
				},
				field: 'campaign_id',
				onDelete: 'CASCADE',
			},
			amount: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				field: 'created_at',
			},
		},
		{
			tableName: 'donations',
			timestamps: false,
		}
	)

	Donation.associate = (models) => {
		Donation.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
		})
		Donation.belongsTo(models.Campaign, {
			foreignKey: 'campaignId',
			as: 'campaign',
		})
	}

	return Donation
}