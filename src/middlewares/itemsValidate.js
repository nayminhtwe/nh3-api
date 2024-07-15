const { body, param } = require("express-validator");

const validateId = [
  param("id").notEmpty().isInt().withMessage("Id must be integer"),
];
const validateBody = [
  body("name").notEmpty().isString().isLength({ max: 255 }),
  body("brandName").notEmpty().isString().isLength({ max: 255 }),

  body("secondCategoryId")
    .notEmpty()
    .isInt()
    .withMessage("secondCategoryId must be integer"),
  body("mainCategoryId")
    .notEmpty()
    .isInt()
    .withMessage("mainCategoryId must be integer"),

  body("isFeature")
    .notEmpty()
    .isBoolean()
    .withMessage("isFeature must be boolean"),
  body("isUniversal")
    .notEmpty()
    .isBoolean()
    .withMessage("isUniversal must be integer"),

  body("OE_NO").notEmpty().isString(),
  body("price").notEmpty(),
];

module.exports = {
  validateId,
  validateBody,
};
