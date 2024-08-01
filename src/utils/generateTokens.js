require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (userData) => {
    const accessToken = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });

    return accessToken;
  },

  generateRefreshToken: (userId) => {
    const refreshToken = jwt.sign(userId, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });

    return refreshToken;
  },
};
