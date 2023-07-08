const { Schema, model } = require("mongoose");

const postSchema = Schema({
  thread: String,
  user: String,
  created: Date,
  content: String
});

const Post = model("posts", postSchema);

module.exports = Post;
