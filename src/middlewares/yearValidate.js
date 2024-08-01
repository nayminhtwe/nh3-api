const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];

const validateBody = [
  body("series_id").notEmpty().isInt().withMessage("Id must be integer"),
  body("year").notEmpty().isInt().withMessage("Id must be integer"),
];

module.exports = {
  validateId,
  validateBody,
};
