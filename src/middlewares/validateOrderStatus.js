const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];

const validateBody = [
  body("status").notEmpty().isString().withMessage("status must be string"),
];

module.exports = {
  validateId,
  validateBody,
};
