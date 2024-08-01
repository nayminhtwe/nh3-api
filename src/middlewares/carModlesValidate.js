const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];
const validateBody = [
  body("name").notEmpty().isString().isLength({ max: 255 }),
  body("company_id")
    .notEmpty()
    .isInt()
    .withMessage("company_id must be integer"),
];

module.exports = {
  validateBody,
  validateId,
};
