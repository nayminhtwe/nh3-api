const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];

const validateBody = [
  body("companyId").notEmpty().isInt(),
  body("seriesId").notEmpty().isInt(),
  body("modelId").notEmpty().isInt(),
  body("yearId").notEmpty().isInt(),
  body("engineId").notEmpty().isInt(),
  body("description").notEmpty(),
];

module.exports = {
  validateBody,
  validateId,
};
