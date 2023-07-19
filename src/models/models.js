const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Define the schema for the Model collection
const modelSchema = Schema({
  model: String,
  make: String,
  thumbnail: String,
  threads: Number
});

// Create the Model model using the schema
const Model = model("models", modelSchema);

module.exports = Model;
