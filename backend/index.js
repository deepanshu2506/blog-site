const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

const articlesSchema = require("./schemas/resolvers/articles");
const userSchema = require("./schemas/resolvers/User");

mongoose.connect("mongodb+srv://blog:blog123@cluster0-t1t7l.mongodb.net/blog");
mongoose.connection.once("open", () => {
  console.log("connected to db");
});

const app = express();
app.use(
  "/articles",
  graphqlHTTP(req => {
    return {
      schema: articlesSchema,
      rootValue: { request: req }
    };
  })
);

app.use(
  "/users",
  graphqlHTTP(req => {
    return {
      schema: userSchema,
      rootValue: { request: req },
      graphiql: true
    };
  })
);

app.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port " + 4000);
});
