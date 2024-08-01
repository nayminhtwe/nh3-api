const { body, param } = require("express-validator");

const validateOrderItem = [
  body("item_id").notEmpty().isInt().withMessage("Item Id must be integer"),
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
  body("deliveryfees")
    .notEmpty()
    .isInt()
    .withMessage("Delivery Fees must be an integer"),
  body("note").notEmpty().isString().withMessage("Note must be a string"),
];

module.exports = {
  validateOrderItem,
};
