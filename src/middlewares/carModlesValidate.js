const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];
const validateBody = [
  body("name").notEmpty().isString().isLength({ max: 255 }),
  body("companyId").notEmpty().isInt(),
];

module.exports = {
  validateBody,
  validateId,
};
