require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessAndRefreshToken: (user) => {
    const access_token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRE }
    );

    const refresh_token = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRE,
      }
    );

    return { access_token, refresh_token };
  },
};
