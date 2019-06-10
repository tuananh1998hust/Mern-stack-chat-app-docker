const User = require("../models/users.js");

const userOne = {
  name: "test",
  email: "test@gmail.com",
  password: "123456",
  password2: "123456",
  avatar: "/avatar/default-avatar.png"
};

const userPostLogin = {
  email: "test@gmail.com",
  password: "123456"
};

const resetDB = async () => {
  await User.deleteMany();
};

const fakeDB = async () => {
  await User.create(userOne);
};

module.exports = {
  userOne,
  userPostLogin,
  resetDB,
  fakeDB
};
