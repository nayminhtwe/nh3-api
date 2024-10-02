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
  body("orderstatus_id")
    .notEmpty()
    .withMessage("Order Status _id is required")
    .isInt()
    .withMessage("Order Status _id must be an integer"),
  body("promotion_id")
    .optional()
    .isInt()
    .withMessage("Promotion _id must be an integer"),
  body("app_user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be an integer"),
  body("deliveryfees")
    .notEmpty()
    .withMessage("Delivery Fees is required")
    .isInt()
    .withMessage("Delivery Fees must be an integer"),
  body("totalprice")
    .notEmpty()
    .withMessage("Total Price is required")
    .isInt()
    .withMessage("Total Price must be an integer"),
];

module.exports = {
  validateId,
  validateBody,
};
