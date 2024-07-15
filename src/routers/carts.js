const express = require("express");

const CartController = require("../controllers/CartController");
const { validateBody, validateId } = require("../middlewares/validateCart");
const validator = require("../utils/validator");

const router = express.Router();

router.get("/carts", CartController.find);
router.post("/carts", validateBody, validator, CartController.create);
router.put("/carts/:id", validateId, validator, CartController.update);
router.delete("/carts/:id", validateId, validator, CartController.destroy);

module.exports = { cartsRouter: router };
