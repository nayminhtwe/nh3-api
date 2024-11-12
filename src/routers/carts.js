const express = require("express");

const CartController = require("../controllers/CartController");
const { validateBody, validateId } = require("../middlewares/validateCart");
const validator = require("../utils/validator");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/carts", CartController.find);

router.post("/carts/add", auth, CartController.create);

router.put(
  "/carts/:id/items/:id",
  validateId,
  validator,
  CartController.update
);

router.delete("/carts/:id", validateId, validator, CartController.destroy);

module.exports = { cartsRouter: router };
