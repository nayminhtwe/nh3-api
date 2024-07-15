const express = require("express");
const OrderStatusController = require("../controllers/OrderStatusController");
const {
  validateBody,
  validateId,
} = require("../middlewares/validateOrderStatus");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/order-statuses", OrderStatusController.find);

router.post(
  "/order-statuses",
  validateBody,
  validator,
  OrderStatusController.create
);

router.put(
  "/order-statuses/:id",
  validateId,
  validator,
  OrderStatusController.update
);

router.delete(
  "/order-statuses/:id",
  validateId,
  validator,
  OrderStatusController.destroy
);

module.exports = { orderStatusesRouter: router };
