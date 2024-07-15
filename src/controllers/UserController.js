require("dotenv").config();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const generateAccessAndRefreshToken = require("../utils/generateAccessAndRefreshToken");
const Role = require("../models/Role");

const UserController = {
  verify: asyncHandler(async (req, res) => {
    const user = req.user;
    return res.json(user);
  }),

  refresh: asyncHandler(async (req, res) => {
    const { incomeRefreshToken } = req.body;

    if (!incomeRefreshToken) {
      return res.status(400).json({
        msg: "refreshToken required!",
      });
    }

    const user = await User.findOne({
      where: { refreshToken: incomeRefreshToken },
    });

    if (!user) {
      return res.status(401).json({
        msg: "Invalid refreshToken!",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user.id
    );

    return res.json({ accessToken, refreshToken });
  }),

  find: asyncHandler(async (req, res) => {
    const users = await User.findAll({ include: Role });
    return res.json(users);
  }),

  show: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    return res.json(user);
  }),

  register: asyncHandler(async (req, res) => {
    const { phone, email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(400).json({
        msg: "User already exists!",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ phone, email, password: hash });

    return res.json(user);
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "email", "phone", "password"],
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found!",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        msg: "Incorrect password!",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user.id
    );

    return res.json({ user, accessToken, refreshToken });
  }),

  logout: asyncHandler(async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        msg: "Access token required!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findByPk(decoded.id);

    user.accessToken = null;
    user.refreshToken = null;

    await user.save();

    return res.status(200).json({
      msg: "logout successfully!",
    });
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { phone, email, password } = req.body;

    await User.update({ phone, email, password }, { where: { id } });

    const user = await User.findByPk(id);
    return res.json(user);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } });

    if (!result) {
      return res.status(400).json({
        msg: "id already deleted!",
      });
    }

    return res.sendStatus(204);
  }),
};

module.exports = UserController;
