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

const User = require("../types/User");
const Article = require("../types/Article");
const ArticleSchema = require("../../models/Article");

const UPLOAD_URL = "/uploads/";

const rootQuery = new GraphQLObjectType({
  name: "articlesRootQuery",
  fields: {
    getArticle: {
      type: Article,
      args: {
        id: { type: GraphQLID }
      },
      async resolve(parent, { id }) {
        return;

        return await ArticleSchema.findById(id);
        /**find article from db and return it*/
      }
    },
    getArticles: {
      type: GraphQLList(Article),
      args: {
        limit: { type: GraphQLInt },
        lastArticleId: { type: GraphQLID }
      },
      async resolve(parent, args) {
        /** return all articles from db in a paginated fashion {code , data, lastArticleId ,last_request:boolean}
         *
         * db.students.find({'_id': {'$gt': last_id}}).limit(10) pagination code example
         */
        return await ArticleSchema.find({
          _id: { $gt: args.lastArticleId }
        }).limit(args.limit);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "articlesMutation",
  fields: {
    addArticle: {
      type: Article,
      args: {
        post: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: "postContentInput",
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
            })
          )
        },
        postedBy: {
          type: new GraphQLNonNull(GraphQLID)
        },
        title: { type: GraphQLString }
      },
      async resolve(parent, { post, postedBy, title }) {
        const { ordering, textInput, images } = post;
        for (let image of images) {
          const imgMeta = image.image.split(";base64,");
          const filePath = UPLOAD_URL + postedBy + "-" + image.name;
          fs.writeFile(filePath, imgMeta[1], { encoding: "base64" }, function(
            err
          ) {
            console.log("File created");
          });
          delete image.image;
          image.url = +postedBy + "-" + image.name;
        }

        const articleObj = new ArticleSchema({
          title,
          postedBy,
          content: post
        });
        return await articleObj.save();
        /**save the blog data to database and return the status as passed or failed and also the article ID
         * add authorId to the document
         */
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
});
