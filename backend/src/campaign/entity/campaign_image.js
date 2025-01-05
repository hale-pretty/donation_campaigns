export const CampaignImage = (sequelize, DataTypes) => {
	const CampaignImage = sequelize.define(
		'CampaignImage',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			campaignId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Campaign', key: 'id' },
				onDelete: 'CASCADE',
				field: 'campaign_id',
			},
			imageUrl: {
				field: 'image_url',
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'campaign_images',
			timestamps: false,
		}
	)

	CampaignImage.associate = (models) => {
		CampaignImage.belongsTo(models.Campaign, {
			foreignKey: 'campaignId',
			as: 'campaign',
		})
	}

	return CampaignImage
}
