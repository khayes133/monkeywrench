const { Schema, model } = require("mongoose");

// Define the schema for the Post collection
const postSchema = Schema({
  thread: String,
  user: String,
  created: Date,
  content: String
});

// Create the Post model using the schema
const Post = model("posts", postSchema);

module.exports = Post;
