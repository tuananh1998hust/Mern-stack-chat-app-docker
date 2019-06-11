const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// User Model
const User = require("../../models/users");
// Keys
const { secretOrKey } = require("../../../config/keys");
// Validate Input
const validateRegisterInput = require("../../validation/register");
// Middleware
const auth = require("../../middleware/auth");

// Set Storage Engine
const storage = multer.diskStorage({
  destination: "public/avatar/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("avatar");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

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
  const avatar = "/avatar/default-avatar.png";

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

              res.json({ token });
            }
          );
        });
      });
    });
  });
});

// @route   PATCH api/users/avatar
// @desc    Update Avatar
// @access  Private
router.patch("/avatar", auth, (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ msg: err });
    } else {
      if (req.file == undefined) {
        return res.json({ msg: ["Error: No File Selected!"] });
      } else {
        const avatar = `/avatar/${req.file.filename}`;

        User.findById(req.user.id).then(user => {
          // Update Avatar User
          user.avatar = avatar;

          user.save().then(user => res.json(user));
        });
      }
    }
  });
});

module.exports = router;
