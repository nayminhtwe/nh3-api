const { param, body } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("id must be integer"),
];

const validateBody = [
  body("item_id").notEmpty().isInt().withMessage("Item id must be an integer"),
  body("quantity")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),
];

module.exports = {
  validateId,
  validateBody,
};
