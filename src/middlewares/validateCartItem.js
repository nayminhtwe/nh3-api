const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be an integer"),
];

const validateBody = [
  body("cart_id")
    .notEmpty()
    .isInt()
    .withMessage("Cart id is required and must be an integer"),
  body("item_id")
    .notEmpty()
    .isInt()
    .withMessage("Item id is required and must be an integer"),
  body("price")
    .notEmpty()
    .isDecimal()
    .withMessage("Price is required and must be a decimal number"),
  body("quantity")
    .notEmpty()
    .isInt()
    .withMessage("Quantity is required and must be an integer"),
];

module.exports = {
  validateId,
  validateBody,
};
