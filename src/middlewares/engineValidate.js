const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];

const validateBody = [
  body("enginepower")
    .notEmpty()
    .isFloat()
    .withMessage("Engine power must be float."),
];

module.exports = {
  validateId,
  validateBody,
};
