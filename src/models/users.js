const { Schema, model } = require("mongoose");

// Define the schema for the User collection
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

// Create the User model using the schema
const User = model("users", userSchema);

module.exports = User;
