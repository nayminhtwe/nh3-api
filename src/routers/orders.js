const express = require("express");
const OrderController = require("../controllers/OrderController");
const validator = require("../utils/validator");
const { validateId, validateBody } = require("../middlewares/validateOrder");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/orders", auth, OrderController.find);

router.get("/orders/:id", auth, OrderController.show);

router.post("/orders", validateBody, validator, auth, OrderController.create);

// router.put("/orders/:id", validateId, validator, OrderController.update);

// router.put("/orders/:order_id/items/:item_id", OrderController.updateOrderItem);

// router.delete(
//   "/orders/:order_id/items/:item_id",
//   OrderController.destoryOrderItem
// );

// router.delete("/orders/:id", validateId, validator, OrderController.destroy);

module.exports = {
  ordersRouter: router,
};
