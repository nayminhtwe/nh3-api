const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];

const validateBody = [
  body("name")
    .notEmpty()
    .isString()
    .isLength({ max: 255 })
    .withMessage(
      "Name must be a string with a maximum length  of 255 characaters"
    ),
];

module.exports = {
  validateId,
  validateBody,
};
