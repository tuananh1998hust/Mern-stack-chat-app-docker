module.exports = {
  mongoURI: process.env.mongoURI || "mongodb://mongo:27017/chat-app-socket",
  mongoTest: "mongodb://mongo:27017/chat-app-test",
  secretOrKey: "secret"
};
