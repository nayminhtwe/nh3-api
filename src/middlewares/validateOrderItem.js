const { body, param } = require("express-validator");

const validateOrderItem = [
  body("item_id").notEmpty().isInt().withMessage("Item Id must be integer"),
  body("order_id")
    .notEmpty()
    .isInt()
    .withMessage("Order item must be an integer"),
  body("subprice")
    .notEmpty()
    .isInt()
    .withMessage("Subprice must be an integer"),
  body("totalprice")
    .notEmpty()
    .isInt()
    .withMessage("Total Price must be an integer"),
  body("quantity")
    .notEmpty()
    .isInt()
    .withMessage("Quantity must be an integer"),
];

module.exports = {
  validateOrderItem,
};
