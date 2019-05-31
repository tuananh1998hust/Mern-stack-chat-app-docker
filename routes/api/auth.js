const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/users");
// Keys
const { secretOrKey } = require("../../config/keys");
// Validate Input
const validateLoginInput = require("../../validation/login");
// Middleware
const auth = require("../../middleware/auth");

// @route   POST api/auth
// @desc    Login
// @access  Public
router.post("/", validateLoginInput, (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    // Check User
    if (!user) {
      return res.status(404).json({ msg: ["User Not Found"] });
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ msg: ["Password Incorrect"] });
      }

      jwt.sign(
        { id: user.id },
        secretOrKey,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get Profile User Current
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
