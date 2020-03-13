const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const logger = require("morgan");



const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger("dev"))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

// routes
app.use(require("./routes/app.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});