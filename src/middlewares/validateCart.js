const { param, body } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("id must be integer"),
];

const validateBody = [
  body("quantity").notEmpty().isInt().withMessage("quantity must be integer"),
];

module.exports = {
  validateId,
  validateBody,
};
