const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];

const validateBody = [
  body("enginepower")
    .notEmpty()
    .isString()
    .withMessage("Engine power must be a string."),
];

module.exports = {
  validateId,
  validateBody,
};
