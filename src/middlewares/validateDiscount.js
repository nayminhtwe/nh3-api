const { param, body } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("id must be integer"),
];

const validateBody = [
  body("item_id").notEmpty(),
  body("is_active").notEmpty().isBoolean(),
];

module.exports = {
  validateId,
  validateBody,
};
