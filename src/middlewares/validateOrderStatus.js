const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];

const validateBody = [
  body("status").notEmpty().isString().withMessage("status must be string"),
  body("userId").notEmpty().isInt().withMessage("userId must be integer"),
];

module.exports = {
  validateId,
  validateBody,
};
