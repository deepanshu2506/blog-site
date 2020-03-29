const graphql = require("graphql");
const _ = require("lodash");

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

const Article = require("./Article");

const UserModel = require("../../models/User");

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    articles: {
      type: new GraphQLList(Article),
      async resolve(parent, args) {
        return [{ id: 1 }];
      }
    }
  })
});

module.exports = User;
