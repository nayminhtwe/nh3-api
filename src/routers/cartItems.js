const express = require("express");
const CartItemController = require("../controllers/CartItemController");
const { validateBody, validateId } = require("../middlewares/validateCartItem");
const validator = require("../utils/validator");

const router = express.Router();

router
  .get("/cart-items", CartItemController.find)
  .post("/cart-items", validateBody, validator, CartItemController.create)
  .put("/cart-items/:id", validateId, validator, CartItemController.update)
  .delete("/cart-items/:id", validateId, validator, CartItemController.destroy);

module.exports = {
  cartItemsRouter: router,
};
