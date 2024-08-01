const { param, body } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("id must be integer"),
];

const validateBody = [
  body("item_id").notEmpty().isInt().withMessage("itemId must be integer"),
  body("car_id").notEmpty().isInt().withMessage("carId must be integer"),
];

module.exports = {
  validateId,
  validateBody,
};
