const { param, body } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];

const validateBody = [
  body("item_id")
    .notEmpty()
    .withMessage("Item ID is required")
    .isInt()
    .withMessage("Item ID must be an integer"),

  body("adjusted_quantity")
    .notEmpty()
    .withMessage("Adjusted Quantity is required")
    .isInt()
    .withMessage("Adjusted Quantity must be an integer"),
];

module.exports = {
  validateBody,
  validateId,
};
