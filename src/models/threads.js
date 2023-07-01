const { Schema, model } = require("mongoose");

const threadSchema = Schema({
  _id: String,
  title: String,
  model: String,
  user: String,
  created: Date,
  lastPost: String
});

const Thread = model("threads", threadSchema);

module.exports = Thread;
