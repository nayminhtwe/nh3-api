const { body, param } = require("express-validator");

const validateId = [
  param("role_id").notEmpty().isInt(),
  param("permission_id").notEmpty().isInt(),
];

const validateBody = [
  body("role_id").notEmpty().isInt().withMessage("role_id must be an integer"),
  body("permission_id")
    .notEmpty()
    .isInt()
    .withMessage("permission_id must be an integer"),
];

module.exports = {
  validateId,
  validateBody,
};
