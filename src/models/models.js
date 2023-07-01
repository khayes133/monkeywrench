const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const modelSchema = Schema({
  model: String,
  make: String,
  thumbnail: String,
  threads: Number
});

const Model = model("models", modelSchema);

module.exports = Model;
