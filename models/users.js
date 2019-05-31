const mongoose = require("mongoose");

// Create UserSchema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

// User Model
const User = mongoose.model("users", UserSchema);

module.exports = User;
