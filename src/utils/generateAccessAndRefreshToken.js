const User = require("../models/User");
const generateAccessToken = require("./generateAccessToken");
const generateRefreshToken = require("./generateRefreshToken");

module.exports = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error("User not Found!");
  }

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return { accessToken, refreshToken };
};
