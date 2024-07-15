const { param, body } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("id must be integer"),
];

const validateBody = [body("type").notEmpty().isString()];

module.exports = {
  validateId,
  validateBody,
};
