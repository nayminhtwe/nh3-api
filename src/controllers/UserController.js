require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");
const PersonalAccessToken = require("../models/PersonalAccessToken");

const UserController = {
  verify: asyncHandler(async (req, res) => {
    const { user } = req;
    return res.json(user);
  }),

  refresh: asyncHandler(async (req, res) => {
    const { type, userId, refresh } = req.body;

    // Validate input
    if (!type || !userId || !refresh) {
      return res
        .status(400)
        .json({ msg: "type, userId, and refresh token are required" });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // find refresh token in personal access token
    const token = await PersonalAccessToken.findOne({
      where: {
        tokenableType: type,
        tokenableId: userId,
        name: "refreshToken",
        token: refresh,
      },
    });

    if (!token) return res.status(401).json({ msg: "Invalid refresh token" });

    try {
      jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);

      const newAccessToken = generateAccessToken({
        id: user.id,
        type: user.type,
        name: user.name,
        email: user.email,
      });

      const newRefreshToken = generateRefreshToken({
        id: user.id,
      });

      // update the refresh token
      await PersonalAccessToken.update(
        { token: newRefreshToken, lastUsedAt: new Date() },
        {
          where: {
            tokenableType: type,
            tokenableId: userId,
            name: "refreshToken",
            token: refresh,
          },
        }
      );

      return res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      return res.status(401).json({ msg: "Invalid refresh token" });
    }
  }),

  register: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists)
      return res.status(400).json({ msg: "User email already exists" });

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return res.json(user);
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({ msg: "User not found. Register first" });

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    const accessToken = generateAccessToken({
      id: user.id,
      type: user.type,
      name: user.name,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    // check the refresh token already has in personal access table to prevent the duplicate refresh token
    const isUserHaveRefreshToken = await PersonalAccessToken.findOne({
      where: {
        tokenableType: user.type,
        tokenableId: user.id,
        name: "refreshToken",
      },
    });

    if (isUserHaveRefreshToken) {
      await PersonalAccessToken.destroy({
        where: {
          tokenableType: user.type,
          tokenableId: user.id,
          name: "refreshToken",
        },
      });
    }

    // store the refresh token in PAT table
    await PersonalAccessToken.create({
      tokenableType: "user",
      tokenableId: user.id,
      name: "refreshToken",
      token: refreshToken,
      abilities: "refresh",
      lastUsedAt: new Date(),
    });

    user.last_login_at = new Date();
    await user.save();

    return res.json({ accessToken, refreshToken });
  }),

  // Find all users
  find: asyncHandler(async (req, res) => {
    const users = await User.findAll();
    return res.json(users);
  }),

  // Change password
  passwordChange: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ msg: "Incorrect password" });

    user.password = await bcrypt.hash(password, 10);
    user.password_changed_at = new Date();
    await user.save();

    return res.json({ msg: "Password changed successfully" });
  }),

  // Restore user from soft delete
  restore: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const restore = await User.restore({ where: { id } });

    if (!restore) return res.status(404).json({ msg: "User restore failed" });

    return res.status(200).json({ msg: "User restored successfully" });
  }),

  // Soft delete user
  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } });

    if (!result) {
      return res.status(400).json({
        msg: "User already deleted or does not exist",
      });
    }

    return res.sendStatus(204);
  }),
};

module.exports = UserController;
