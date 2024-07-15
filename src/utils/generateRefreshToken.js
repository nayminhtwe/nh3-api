require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (user) => {
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    }
  );

  await user.update({ refreshToken });

  return refreshToken;
};
