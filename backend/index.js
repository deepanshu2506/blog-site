const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

const articlesSchema = require("./schemas/articles").schema;

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

app.listen(process.env.port || 3000, () => {
  console.log("Listening on port 3000");
});
