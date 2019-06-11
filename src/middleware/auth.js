const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../../config/keys");

module.exports = (req, res, next) => {
  // Check Token
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: ["No Token, Authorization"] });
  }

  try {
    const decoded = jwt.verify(token, secretOrKey);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
