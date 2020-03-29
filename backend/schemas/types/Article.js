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

const User = require("./User");
const userModel = require("../../models/User");

const postContent = new GraphQLObjectType({
  name: "postContent",
  fields: {
    ordering: new GraphQLNonNull(new GraphQLList(GraphQLInt)),
    textInput: new GraphQLNonNull(
      new GraphQLList(
        new GraphQLObjectType({
          name: "textInput",
          fields: {
            number: GraphQLInt,
            text: GraphQLString
          }
        })
      )
    ),
    images: new GraphQLList(
      new GraphQLObjectType({
        name: "img",
        fields: {
          number: GraphQLInt,
          name: GraphQLString,
          image: GraphQLString
        }
      })
    )
  }
});

const Article = new GraphQLObjectType({
  name: "article",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    Content: { type: postContent },
    postedBy: {
      type: User,
      async resolve(parent, args) {
        /**
         * return the author details from parent.authorId
         */
        return await userModel.findById(parent.UserId);
      }
    },
    timeStamp: { type: GraphQLString },
    likes: { type: GraphQLInt },
    comments: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "comments",
          fields: () => ({
            comment: { type: GraphQLString },
            commentedBy: {
              type: User,
              async resolve(parent, args) {
                return await userModel.findById(parent.userId);
              }
            }
          })
        })
      )
    }
  })
});

module.exports = Article;
