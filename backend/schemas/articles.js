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

const User = require("./schemas/users").User;

const UPLOAD_URL = "/uploads/";

const Article = new GraphQLObjectType({
  name: "article",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    Content: { type: GraphQLList },
    postedBy: { type: User },
    timeStamp: { type: String },
    likes: { type: GraphQLInt },
    comments: {
      type: new GraphQLObjectType({
        name: "comments",
        fields: () => ({
          comment: { type: GraphQLString },
          commentedBy: { type: User }
        })
      })
    }
  })
});

const rootQuery = new GraphQLObjectType({
  name: "articlesRootQuery",
  fields: {
    article: {
      type: Article,
      args: {
        id: { type: GraphQLID }
      },
      async resolve(parent, { id }) {
        /**find article from db and return it*/
      }
    },
    articles: {
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
          type: new GraphQlNonNull(
            new GraphQLInputObjectType({
              name: "postContent",
              fields: {
                ordering: new GraphQLNonNull(new GraphQLList(GraphQLInt)),
                textInput: new GraphQLNonNull(
                  new GraphQlList(
                    new GraphQLObjectType({
                      fields: {
                        number: GraphQLInt,
                        text: GraphQLString
                      }
                    })
                  )
                ),
                images: new GraphQlList(
                  new GraphQLObjectType({
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
        }
      },
      async resolve(parent, { post, postedBy }) {
        const { ordering, textInput, images } = post;
        for (const item of ordering) {
          const text = _.find(textInput, a => a.number == item);
          const image = _.find(images, a => a.number == item);
          const blogPost = [];
          if (image) {
            const imgMeta = image.image.split(";base64,");
            const filePath = UPLOAD_URL + postedBy + "-" + image.name;
            fs.writeFile(filePath, imgMeta[1], { encoding: "base64" }, function(
              err
            ) {
              console.log("File created");
            });
            delete image.image;
            image.url = +postedBy + "-" + image.name;
            blogPost.push(image);
          }

          if (text) {
            blogPost.push(text);
          }
        }

        /*save the blog data to database and return the status as passed or failed and also the article ID*/
      }
    }
  }
});

module.exports = {
  schema: new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation
  }),
  article: Article
};
