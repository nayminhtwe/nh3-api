const { param, body } = require("express-validator");

const validateId = [param("id").notEmpty().isInt()];

const validateBody = [
  body("OE_NO").notEmpty().isString(),
  body("type").notEmpty().isString(),
];

module.exports = {
  validateId,
  validateBody,
};
