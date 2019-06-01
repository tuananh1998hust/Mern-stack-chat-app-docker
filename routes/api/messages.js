const express = require("express");
const router = express();

// Message Model
const Message = require("../../models/messages");
// Middleware
const auth = require("../../middleware/auth");

// @route   GET api/messages
// @desc    Get All Messages
// @access  Public
router.get("/", (req, res) => {
  Message.find()
    .sort({ date: -1 })
    .then(messages => res.json(messages));
});

module.exports = router;
