var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: { type: String },
  postedBy: { type: String },
  content: { type: Object },
  likes: { type: Number, default: 0 },
  timeStamp: { type: Date, default: Date.now },
  comments: [{ comment: String, commentedBy: { type: String, required: true } }]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
