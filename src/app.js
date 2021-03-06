const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// API Routes
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const messages = require("./routes/api/messages");
// Message Model
const Message = require("./models/messages");

// Static Files
app.use(express.static("public"));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.on("connection", socket => {
  console.log("A User Is Connected...");

  socket.on("send-mess", mess => {
    const newMess = new Message(mess);
    newMess.save().then(mess => io.emit("send-mess", mess));
  });
});

// app.get("/", (req, res) => res.send("Hello Chat App Docker"));

// Use Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/messages", messages);

const port = process.env.PORT || 5000;

function start() {
  http.listen(port, () => console.log(`Server is running on port ${port}`));
}

module.exports = {
  start,
  app
};
