const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/users");
// Keys
const { secretOrKey } = require("../../config/keys");
// Validate Input
const validateRegisterInput = require("../../validation/register");

// @route   GET api/users
// @desc    Get All Users
// @access  Public
router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});

// @route   POST api/users
// @desc    Create New User
// @access  Public
router.post("/", validateRegisterInput, (req, res) => {
  const { name, email, password } = req.body;
  const avatar = "/avatar/default-avatar";

  User.findOne({ email }).then(user => {
    // Check User
    if (user) {
      return res.status(400).json({ msg: ["User Is Already Exist"] });
    }

    const newUser = new User({
      name,
      email,
      password,
      avatar
    });

    // Hash Password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, token) => {
        if (err) throw err;

        newUser.password = token;

        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            secretOrKey,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;

              res.json(token);
            }
          );
        });
      });
    });
  });
});

module.exports = router;
