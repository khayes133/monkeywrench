const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  avatar: String,
  thumbnail: String,
  email: String,
  role: Number,
  posts: Number,
  threads: Number,
  joined: Date,
  lastOnline: Date,
  sub: String,
});

const User = model("users", userSchema);

module.exports = User;
