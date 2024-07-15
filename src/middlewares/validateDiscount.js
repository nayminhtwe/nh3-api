const { param, body } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("id must be integer"),
];

const validateBody = [
  body("itemId").notEmpty(),
  body("startDate").notEmpty().isDate().withMessage("startDate must be date"),
  body("endDate").notEmpty().isDate().withMessage("endDate must be date"),
  body("discountTypeId").notEmpty().isInt(),
  body("maxItem").notEmpty().isInt(),
  body("isActive").notEmpty().isBoolean(),
];

module.exports = {
  validateId,
  validateBody,
};
