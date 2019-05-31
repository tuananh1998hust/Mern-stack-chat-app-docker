const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");

// DB config
const { mongoURI } = require("./config/keys");
// API Routes
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

// Static Files
app.use(express.static("public"));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Connect MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB is connected..."))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello Docker"));

// Use Routes
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server is running on port ${port}`));
