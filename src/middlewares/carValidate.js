const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];

const validateBody = [
  body("company_id").notEmpty().isInt(),
  body("year").notEmpty().isString(),
  body("model_id").notEmpty().isInt(),
  body("engine_id").notEmpty().isInt(),
];

module.exports = {
  validateBody,
  validateId,
};
