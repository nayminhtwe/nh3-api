const asyncHandler = require("express-async-handler");
const {
  buildAuthorizationUrl,
  exchangeCodeForTokens,
  disconnect,
} = require("../services/QuickBooksClient");
const {
  syncAllLocalStockFromQuickBooks,
} = require("../services/QuickBooksInventoryService");

function normalizeCallbackQuery(query) {
  const code = query.code;
  const realmId = query.realmId ?? query.realmid;
  const error = query.error;
  const errorDescription = query.error_description;
  return { code, realmId, error, errorDescription };
}

const QuickBooksController = {
  connect: asyncHandler(async (req, res) => {
    const state = `qbo-${Date.now()}`;
    const url = buildAuthorizationUrl(state);
    return res.redirect(url);
  }),

  callback: asyncHandler(async (req, res) => {
    const { code, realmId, error, errorDescription } = normalizeCallbackQuery(
      req.query
    );

    if (error) {
      return res.status(400).json({
        msg: "QuickBooks authorization was denied or failed",
        error,
        error_description: errorDescription,
      });
    }

    if (!code || !realmId) {
      return res.status(400).json({
        msg:
          "Missing code or realmId. The success message appears here only after Intuit redirects to this callback URL (not on /connect).",
        hint: "Ensure Redirect URI in Intuit Developer matches QUICKBOOKS_REDIRECT_URI exactly, e.g. https://mgt.luckkabarnh3.com/api/quickbooks/callback",
        received_query_keys: Object.keys(req.query),
      });
    }

    try {
      await exchangeCodeForTokens(code, realmId);
    } catch (e) {
      const intuitBody = e.response?.data;
      const detail =
        typeof intuitBody === "string"
          ? intuitBody
          : intuitBody?.error || intuitBody?.message || e.message;
      return res.status(e.response?.status || 502).json({
        msg: "Token exchange with QuickBooks failed",
        detail,
        intuit: intuitBody,
      });
    }

    return res.json({ msg: "QuickBooks connected successfully", realmId });
  }),

  disconnect: asyncHandler(async (req, res) => {
    await disconnect();
    return res.json({ msg: "QuickBooks disconnected successfully" });
  }),

  syncStock: asyncHandler(async (req, res) => {
    const result = await syncAllLocalStockFromQuickBooks();

    if (result.skipped) {
      return res.status(400).json(result);
    }

    return res.json({
      msg: "QuickBooks stock sync completed",
      ...result,
    });
  }),
};

module.exports = QuickBooksController;

