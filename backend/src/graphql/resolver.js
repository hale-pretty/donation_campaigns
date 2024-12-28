import { getAuthUser, getPublicUser, register, login } from "../user/service/index.js"

export const resolvers = {
    Query: {
        getAuthUser: (_, __, { user }) => {
              try {
                return await getAuthUser(user);
              } catch (error) {
                console.error('Error fetching donations by user:', error);
                throw new Error('Unable to fetch donations');
              }
        },
        getPublicUser: async (_, { user_id }) => {
              try {
                return await getPublicUser(user_id);
              } catch (error) {
                console.error('Error fetching donations by campaign:', error);
                throw new Error('Unable to get public user');
              }
        },
    },
    Mutation: {
        register: async (_, args) => {
            try {
                return await register(args);
            } catch (error) {
                console.error('Error fetching donations by campaign:', error);
                throw new Error('Unable to register');
            }
        },
        login: async (_, { username, password }) => {
            try {
                return await login(username, password);
            } catch (error) {
                console.error('Error fetching donations by campaign:', error);
                throw new Error('Unable to login');
            }
        },
      }
}
