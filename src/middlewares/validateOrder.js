const { param, body } = require("express-validator");

const validateId = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isInt()
    .withMessage("ID must be an integer"),
];

const validateBody = [
  body("cartId")
    .notEmpty()
    .withMessage("Cart ID is required")
    .isInt()
    .withMessage("Cart ID must be an integer"),
  body("addressId")
    .notEmpty()
    .withMessage("Address ID is required")
    .isInt()
    .withMessage("Address ID must be an integer"),
  body("orderStatusId")
    .notEmpty()
    .withMessage("Order Status ID is required")
    .isInt()
    .withMessage("Order Status ID must be an integer"),
  body("promotionId")
    .optional()
    .isInt()
    .withMessage("Promotion ID must be an integer"),
  body("itemId")
    .notEmpty()
    .withMessage("Item ID is required")
    .isInt()
    .withMessage("Item ID must be an integer"),
  body("userId")
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
  body("totalPrice")
    .notEmpty()
    .withMessage("Total Price is required")
    .isInt()
    .withMessage("Total Price must be an integer"),
];

module.exports = {
  validateId,
  validateBody,
};
