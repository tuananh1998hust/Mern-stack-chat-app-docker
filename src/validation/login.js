const Validator = require("validator");

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !password) {
    errors.push("Please Fill All The Fields");

    return res.status(404).json({ msg: errors });
  } else {
    if (Validator.isEmpty(email.trim()) || Validator.isEmpty(password.trim())) {
      errors.push("Please Fill All The Fields");
    }

    if (!Validator.isEmail(email)) {
      errors.push("Email Is Invalid");
    }

    if (errors.length) {
      return res.status(400).json({ msg: errors });
    }

    next();
  }
};
