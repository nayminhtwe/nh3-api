require("dotenv").config();

const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateAccessAndRefreshToken } = require("../utils/generateTokens");

const UserResource = require("../resources/UserResource");
const Otp = require("../models/Otp");
const { sendSMS } = require("../utils/sendSMS");

module.exports = {
  verify: asyncHandler(async (req, res) => {
    const { user } = req;
    return res.json(user);
  }),

  find: asyncHandler(async (req, res) => {
    const users = await User.findAll();
    return res.json(UserResource.collection(users));
  }),

  requestOtp: asyncHandler(async (req, res) => {
    const { phone_number } = req.body;

    if (!phone_number) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const { transcation_id, otp_code } = await User.generateOTP(phone_number);

    // send sms
    await sendSMS(phone_number, otp_code, "L.K.B.NH3");

    return res.json({ phone_number, transcation_id });
  }),

  register: asyncHandler(async (req, res) => {
    const { user, access_token, refresh_token } = await User.register(req.body);

    return res.status(201).json({ user, access_token, refresh_token });
  }),

  login: asyncHandler(async (req, res) => {
    const { phone_number, password } = req.body;

    const user = await User.findOne({ where: { phone_number } });

    if (!user)
      return res.status(400).json({ msg: "User not found. register first" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ msg: "Invalid password" });

    const { access_token, refresh_token } = generateAccessAndRefreshToken(user);

    user.refresh_token = refresh_token;
    await user.save();

    return res.json({ access_token, refresh_token });
  }),

  refresh: asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ msg: "Refresh token is missing" });

    const user = await User.findOne({ where: { refresh_token: refreshToken } });

    if (!user) return res.status(401).json({ msg: "Invalid refresh token" });

    const { access_token, refresh_token } = generateAccessAndRefreshToken(user);

    user.refresh_token = refresh_token;
    await user.save();

    return res.json({ access_token, refresh_token });
  }),

  setPercentage: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { percentage } = req.body;

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user.percentage = percentage;
    await user.save();

    return res.json({ msg: "User percentage updated successfully" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await User.destroy({ where: { id } });

    if (!result) return res.status(400).json({ msg: "Failed delete user" });

    return res.status(200).json({ msg: "User deleted successfully" });
  }),

  revokeRefresh: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) res.status(404).json({ msg: `User not found` });

    user.refresh_token = null;
    await user.save();

    return res.json({ msg: "User revoke refresh token successfully" });
  }),

  restore: asyncHandler(async (req, res) => {
    const { id } = req.params;

    await User.restore({ where: { id } });
    return res.sendStatus(204);
  }),
};
