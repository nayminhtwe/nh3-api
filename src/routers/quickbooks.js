const express = require("express");
const QuickBooksController = require("../controllers/QuickBooksController");

const router = express.Router();

router.get("/quickbooks/connect", QuickBooksController.connect);
router.get("/quickbooks/callback", QuickBooksController.callback);
router.get("/quickbooks/disconnect", QuickBooksController.disconnect);
router.post("/quickbooks/sync-stock", QuickBooksController.syncStock);

module.exports = {
  quickBooksRouter: router,
};

