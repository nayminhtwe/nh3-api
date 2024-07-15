const { param, body } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("id must be integer"),
];

const validateBody = [
  body("itemId").notEmpty().isInt().withMessage("itemId must be integer"),
  body("carId").notEmpty().isInt().withMessage("carId must be integer"),
];

module.exports = {
  validateId,
  validateBody,
};
