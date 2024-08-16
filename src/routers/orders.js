const express = require("express");
const OrderController = require("../controllers/OrderController");
const validator = require("../utils/validator");
const { validateId, validateBody } = require("../middlewares/validateOrder");
const router = express.Router();

router.get("/orders", OrderController.find);

router.get("/orders/:id", OrderController.show);

router.post("/orders", validateBody, validator, OrderController.create);

router.put("/orders/:id", validateId, validator, OrderController.update);

router.delete("/orders/:id", validateId, validator, OrderController.destroy);

module.exports = {
  ordersRouter: router,
};
