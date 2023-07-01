const { Schema, model } = require("mongoose");

const postSchema = Schema({
  _id: String,
  thread: String,
  user: String,
  created: Date,
  content: String
});

const Post = model("posts", postSchema);

module.exports = Post;
