import { sequelize } from '../../db/sequelize.js';
import { User } from '../entity/user.js';
import bcrypt from "bcrypt";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import { Kind } from 'graphql/language/index.js';
import { GraphQLScalarType } from 'graphql';


export const resolvers = {
    Query: {
        user(_, __, context_auth) {
            if (context_auth.user instanceof Error) {
                return context_auth.user;
            } else {
                return db.User.findOne({ where: { id: context_auth.user.user_info.id } })
                .then((records) => {
                    if (records.dataValues.profile_image !== null) records.dataValues.profile_image = Buffer.from(records.dataValues.profile_image).toString('binary');
                    if (records.dataValues.avatar !== null) records.dataValues.avatar = Buffer.from(records.dataValues.avatar).toString('binary');
                    return records;
                }).catch((err) => {
                    
                    return err;
                })
            }
        },
        user_by_id(parent, args, context_auth) {
            return db.User.findOne({ where: { id: args.user_id } })
            .then((records) => {
                
                if (records !== null) {
                    console.log("records: ", records);
                    if (records.dataValues.profile_image !== null) records.dataValues.profile_image = Buffer.from(records.dataValues.profile_image).toString('binary');
                    if (records.dataValues.avatar !== null) records.dataValues.avatar = Buffer.from(records.dataValues.avatar).toString('binary');
                    return records.dataValues;
                } else {
                    throw new Error("No such user id");
                }
            }).catch((err) => {
                
                return err;
            })
        },
    },
    UserPublic: {
        my_campaigns(parent) {
            return db.Campaign.findAll({ where: { "user_id": parent.id } }).then((records) => {
                return records;
            }).catch((err) => {
                
                return err;
            })
        }
    },
    /** 
    Thanh Lan tao field nay cho Campaign
    Campaign: {
        get_images(parent, args, context) {
            return db.CampaignImage.findAll({ where: { "campaign_id": parent.id }}).then((records) => {
                return records.map((item) => Buffer.from(item.dataValues.base64_image).toString('binary'));
            }).catch((err) => {
                
                return err;
            })
        },
    },
    **/
    User: {
        my_campaigns(parent) {
            return db.Campaign.findAll({ where: { "user_id": parent.id } }).then((records) => {
                return records;
            }).catch((err) => {
                
                return err;
            })
        }
    },
    Mutation: {
        async register(parent, args) {
            const hashedPw =  await bcrypt.hash(args.password, 10);
            return db.User.create({ username: args.username, password: hashedPw, email: args.email })
            .then(data => ({ data: data, error: null }))
            .catch(err => {
                if (err.name === "SequelizeUniqueConstraintError") return { data: null, error: "username existed" };
                return err;
            });
        },
        async login(parent, args, context) {
            return await db.User.findOne({ where: { "username": args.username }})
            .then(async (records) => {
                if (records === null) {
                    return { error: "username not existed", token: null };
                } else {
                    const isValidate = await bcrypt.compare(args.password, records.password);
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
        },
      /**
      in progess
        async update_profile(parent, args) {
            const fields = args.input;
            const editedUser = await db.User.findOne({ where: { id: fields.user_id } });
            delete fields.user_id;          
            await editedUser.update(fields);
            await editedUser.save();
            return { message: "sucess", error: null };
        }
        **/
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    })
}
