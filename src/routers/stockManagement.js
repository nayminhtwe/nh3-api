const express = require("express");
const StockManagementController = require("../controllers/StockManagementController");
const { validateBody, validateId } = require("../middlewares/validateStock");
const validator = require("../utils/validator");

const router = express.Router();

router
  .get("/stock-managements", StockManagementController.find)
  .post(
    "/stock-managements",
    validateBody,
    validator,
    StockManagementController.create
  )
  .put(
    "/stock-managements/:id",
    validateId,
    validateBody,
    validator,
    StockManagementController.update
  )
  .delete(
    "/stock-managements/:id",
    validateId,
    validator,
    StockManagementController.destroy
  );

module.exports = { stockManagementRouter: router };
