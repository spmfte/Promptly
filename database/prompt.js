// database/prompt.js

const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  text: { type: String, required: true },
  response: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Prompt = mongoose.model("Prompt", promptSchema);

module.exports = Prompt;

