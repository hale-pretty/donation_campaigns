export const User = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
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
			bio: {
				type: DataTypes.STRING,
			},
			avatarUrl: {
				type: DataTypes.STRING,
				field: 'avatar_url',
			},
		},
		{
			tableName: 'users',
			timestamps: false,
		}
	)

  User.associate = (models) => {
    User.hasMany(models.Campaign, {
      foreignKey: 'userId',
      as: 'campaigns',
    })
    // User.hasMany(models.Donation, {
    //   foreignKey: 'userId',
    //   as: 'donations',
    // })
  }

	return User
}
