const { Schema, model } = require("mongoose");

// Define the schema for the Thread collection
const threadSchema = Schema({
  title: String,
  model: String,
  user: String,
  created: Date,
  lastPost: String
});

// Create the Thread model using the schema
const Thread = model("threads", threadSchema);

module.exports = Thread;
