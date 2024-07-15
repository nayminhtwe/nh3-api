const { param, body } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("id must be integer"),
];

const validateBody = [
  body("itemId").notEmpty().isInt().withMessage("itemId must be integer"),
  body("OE_NO").notEmpty().isString().withMessage("OE_NO must be string"),
  body("quantity").notEmpty().isInt().withMessage("quantity must be integer"),
];

module.exports = {
  validateId,
  validateBody,
};
