const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];
const validateBody = [
  body("name").notEmpty().isString().isLength({ max: 255 }),
  body("brandName").notEmpty().isString().isLength({ max: 255 }),

  body("main_category_id")
    .notEmpty()
    .isInt()
    .withMessage("main_category_id must be integer"),

  body("is_feature")
    .optional()
    .isBoolean()
    .withMessage("isFeature must be boolean"),

  body("is_universal")
    .optional()
    .isBoolean()
    .withMessage("isUniversal must be integer"),

  body("OE_NO").notEmpty().isString(),
  body("price").notEmpty(),
];

module.exports = {
  validateId,
  validateBody,
};
