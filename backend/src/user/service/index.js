import { sequelize } from '../../db/sequelize.js';
import { User } from '../entity/user.js';
import bcrypt from "bcrypt";
import 'dotenv/config';
import jwt from "jsonwebtoken";

export const getAuthUser = async (user_context) => {
    if (user_context instanceof Error) {
        return user_context;
    } else {
        return await User.findOne({ where: { id: user_context.user_info.id } })
            .then((records) => records);
            .catch((err) => err);
    }
};

export const getPublicUser = async (user_id) => {
    return await User.findOne({ where: { id: user_id } })
    .then((records) => {
        if (records !== null) { return records.dataValues; }
        else { throw new Error("No such user id"); }
    })
    .catch((err) => err);
};

export const register = async (user_info) {
    const transaction = await sequelize.transaction();
    const hashedPw = await bcrypt.hash(args.password, 10);
    try {
        const newUser = await User.create(
            { username: user_info.username, password: hashedPw, email: user_info.email },
            { transaction }
        )
        .then(data => ({ data: data, error: null }))
        .catch(err => {
            if (err.name === "SequelizeUniqueConstraintError") return { data: null, error: "username existed" };
            return err;
        });
        
        await transaction.commit();
        return newUser;
    } catch (error) {
        await transaction.rollback();
        console.error("error creating donation:", error);
        throw error;
    }
};

export const login = async login(username, password) {
    return await User.findOne({ where: { "username": username }})
    .then(async (records) => {
        if (records === null) {
            return { error: "username not existed", token: null };
        } else {
            const isValidate = await bcrypt.compare(password, records.password);
            if (isValidate) {
                delete records.dataValues.password;
                const accessToken = jwt.sign({ id: records.dataValues.id, username: records.dataValues.username }, process.env.SECRET_KEY, { expiresIn: 604_800_000});
                return { error: null, token: accessToken };
            } else {
                return { error: "your password is incorrect", token: null };
            }
        }
    })
    .catch((err) => err);
};
