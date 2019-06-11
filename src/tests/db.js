const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/users.js");
const Message = require("../models/messages");
const { mongoTest } = require("../../config/keys");

mongoose.connect(mongoTest);

let salt = bcrypt.genSaltSync(10);
let password = bcrypt.hashSync("123456", salt);

const userOne = {
  name: "test",
  email: "test@gmail.com",
  password,
  avatar: "/avatar/default-avatar.png"
};

const userTwo = {
  name: "test",
  email: "test2@gmail.com",
  password: "123456",
  password2: "123456",
  avatar: "/avatar/default-avatar.png"
};

const mess = {
  from: "user1_id",
  to: "user2_id",
  mess: "test send mess"
};

const userPostLogin = {
  email: "test@gmail.com",
  password: "123456"
};

const resetDB = async () => {
  await User.deleteMany();
  await Message.deleteMany();
};

const fakeDB = async () => {
  await User.create(userOne);
  await Message.create(mess);
};

module.exports = {
  mess,
  userOne,
  userTwo,
  userPostLogin,
  resetDB,
  fakeDB
};
