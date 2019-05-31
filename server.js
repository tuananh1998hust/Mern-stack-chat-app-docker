const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");

const { mongoURI } = require("./config/keys");

// Connect MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB is connected..."))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello Docker"));

const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server is running on port ${port}`));
