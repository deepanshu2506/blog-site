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

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    phoneNumber: { type: GraphQLString }
  })
});

const rootQuery = new GraphQLObjectType({
  name: "usersRootQuery",
  fields: {
    getUser: {
      type: User,
      args: {
        id: { type: GraphQLID }
      },
      async resolve(parent, { id }) {
        /**
         * return the user details
         */
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
        user: new GraphQLInputObjectType({
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
      },
      async resolve(parent, { user }) {
        /**add user to the database and return */
      }
    }
  }
});

module.exports = {
  schema: new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation
  }),
  User
};
