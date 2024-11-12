const { param, body } = require("express-validator");

const validateId = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isInt()
    .withMessage("ID must be an integer"),
];

const validateBody = [
  body("address_id")
    .notEmpty()
    .withMessage("Address _id is required")
    .isInt()
    .withMessage("Address _id must be an integer"),
  body("promotion_id")
    .optional()
    .isInt()
    .withMessage("Promotion _id must be an integer"),
  body("deliveryfees")
    .notEmpty()
    .withMessage("Delivery Fees is required")
    .isInt()
    .withMessage("Delivery Fees must be an integer"),
  body("items").isArray().withMessage("Items must be an array"),
];

module.exports = {
  validateId,
  validateBody,
};
