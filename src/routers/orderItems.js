const express = require("express");
const OrderItemController = require("../controllers/OrderItemController");
const validator = require("../utils/validator");
const { validateOrderItem } = require("../middlewares/validateOrderItem");

const router = express.Router();

router.get("/order-items", OrderItemController.find);

router.post(
  "/order-items",
  validateOrderItem,
  validator,
  OrderItemController.create
);

router.put("/order-items/:id", OrderItemController.update);

router.delete("/order-items/:id", OrderItemController.destroy);

module.exports = { orderItemsRouter: router };
