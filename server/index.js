// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("../database/user");
const Prompt = require("../database/prompt");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save((err) => {
    if (err) {
      res.status(500).send("Error creating user");
    } else {
      res.send("User created successfully");
    }
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, user) => {
    if (err || !user) {
      res.status(401).send("Invalid credentials");
    } else {
      res.send("Login successful");
    }
  });
});

app.post("/api/prompts", (req, res) => {
  const { text } = req.body;
  const prompt = new Prompt({ text });
  prompt.save((err) => {
    if (err) {
      res.status(500).send("Error creating prompt");
    } else {
      res.send(prompt);
    }
  });
});

app.get("/api/prompts", (req, res) => {
  Prompt.find({}, (err, prompts) => {
    if (err) {
      res.status(500).send("Error retrieving prompts");
    } else {
      res.send(prompts);
    }
  });
});

app.post("/api/generate-prompt", (req, res) => {
  const { prompt } = req.body;
  // Use the OpenAI API to generate a response to the prompt
  const response = "This is a response to the prompt";
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

