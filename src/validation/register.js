const Validator = require("validator");

module.exports = (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];

  if (!name || !email || !password || !password2) {
    errors.push("Please Fill All The Fields");

    return res.status(404).json({ msg: errors });
  } else {
    if (
      Validator.isEmpty(name.trim()) ||
      Validator.isEmpty(email.trim()) ||
      Validator.isEmpty(password.trim()) ||
      Validator.isEmpty(password2.trim())
    ) {
      errors.push("Please Fill All The Fields");
    }

    if (!Validator.isEmail(email)) {
      errors.push("Email Is Invalid");
    }

    if (!Validator.isLength(password, { min: 6, max: 32 })) {
      errors.push("Password Is Must 6 To 32 Characters");
    }

    if (!Validator.equals(password, password2)) {
      errors.push("Confirm Password Is Matched To Password");
    }

    if (errors.length) {
      return res.status(400).json({ msg: errors });
    }

    next();
  }
};
