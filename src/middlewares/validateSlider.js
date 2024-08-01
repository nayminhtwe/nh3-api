const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("id must be integer"),
];

const validateBody = [
  body("name")
    .notEmpty()
    .isString()
    .withMessage("name must be string")
    .isLength({ max: 255 })
    .withMessage("name must not exceed 255 characters"),
];

module.exports = {
  validateId,
  validateBody,
};
