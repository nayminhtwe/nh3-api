const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("id must be integer"),
];

const validateBody = [
  body("name")
    .notEmpty()
    .isString()
    .withMessage("brand must be string")
    .isLength({ max: 255 })
    .withMessage("brand must not exceed 255 characters"),
];

module.exports = {
  validateId,
  validateBody,
};
