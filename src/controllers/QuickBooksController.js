const asyncHandler = require("express-async-handler");
const {
  buildAuthorizationUrl,
  exchangeCodeForTokens,
  disconnect,
} = require("../services/QuickBooksClient");

const QuickBooksController = {
  connect: asyncHandler(async (req, res) => {
    const state = `qbo-${Date.now()}`;
    const url = buildAuthorizationUrl(state);
    return res.redirect(url);
  }),

  callback: asyncHandler(async (req, res) => {
    const { code, realmId } = req.query;

    if (!code || !realmId) {
      return res
        .status(400)
        .json({ msg: "Missing code or realmId from QuickBooks callback" });
    }

    await exchangeCodeForTokens(code, realmId);

    return res.json({ msg: "QuickBooks connected successfully", realmId });
  }),

  disconnect: asyncHandler(async (req, res) => {
    await disconnect();
    return res.json({ msg: "QuickBooks disconnected successfully" });
  }),
};

module.exports = QuickBooksController;

