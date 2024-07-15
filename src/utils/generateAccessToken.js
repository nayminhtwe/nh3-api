require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    }
  );

  await user.update({ accessToken });

  return accessToken;
};
