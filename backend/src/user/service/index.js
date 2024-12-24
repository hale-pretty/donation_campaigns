import { sequelize } from '../../db/sequelize.js';
import { User } from '../entity/user.js'

const createUser = async (email, pw) => {

    const transaction = await sequelize.transaction()
    
    try {
        const newUser = await User.create(
            {
                email: email,
                password: pw

            },
            { transaction }
        )
        await transaction.commit()
        console.log("user created successfully:", newDonation);
        return newUser
    
    } catch (error) {
        await transaction.rollback();
        console.error("error creating user:", error);
        throw error
    }
}

export { createUser }