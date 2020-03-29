const graphql = require("graphql");
const _ = require("lodash");
const fs = require("fs");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = graphql;

const article = require("./articles");

const UserModel = require("../../models/User");

const User = require("../types/User");

const rootQuery = new GraphQLObjectType({
  name: "usersRootQuery",
  fields: {
    getUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, { id }) {
        /**
         * return the user details
         */
        return UserModel.findById(id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "usersMutation",
  fields: {
    addUser: {
      type: User,
      args: {
        user: {
          type: new GraphQLInputObjectType({
            name: "UserDetails",
            fields: {
              firstName: { type: new GraphQLNonNull(GraphQLString) },
              lastName: { type: new GraphQLNonNull(GraphQLString) },
              email: { type: new GraphQLNonNull(GraphQLString) },
              username: { type: new GraphQLNonNull(GraphQLString) },
              password: { type: new GraphQLNonNull(GraphQLString) },
              phoneNumber: { type: new GraphQLNonNull(GraphQLString) }
            }
          })
        }
      },
      async resolve(parent, { user }) {
        /**add user to the database and return */
        let UserObj = new UserModel({ ...user });
        return await UserObj.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
});
