const mongoose = require("mongoose");

const { start } = require("./src/app");
// DB config
const { mongoURI } = require("./config/keys");

// Connect MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB is connected..."))
  .catch(err => console.log(err));

// Start Server
start();
