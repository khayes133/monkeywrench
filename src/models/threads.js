const { Schema, model } = require("mongoose");

const threadSchema = Schema({
  title: String,
  model: String,
  user: String,
  created: Date,
  lastPost: String
});

const Thread = model("threads", threadSchema);

module.exports = Thread;
