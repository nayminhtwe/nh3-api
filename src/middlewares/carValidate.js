const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];

const validateBody = [
  body("company_id").notEmpty().isInt(),
  body("series_id").notEmpty().isInt(),
  body("model_id").notEmpty().isInt(),
  body("year_id").notEmpty().isInt(),
  body("engine_id").notEmpty().isInt(),
  body("description").notEmpty(),
];

module.exports = {
  validateBody,
  validateId,
};
