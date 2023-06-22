const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  id: String,
  username: String,
  avatar: String,
  thumbnail: String,
  email: String,
  role: Number,
  posts: Number,
  threads: Number,
  joined: Date,
  lastOnline: Date
});

const userModel = model("Users", userSchema);

module.exports = userModel;
