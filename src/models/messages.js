const mongoose = require("mongoose");

// Create MessageSchema
const MessageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  mess: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Message Model
const Message = mongoose.model("messages", MessageSchema);

module.exports = Message;
