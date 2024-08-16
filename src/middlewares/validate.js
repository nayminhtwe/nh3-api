const { body, param } = require("express-validator");

const validateLogin = [
  body("phone_number")
    .notEmpty()
    .withMessage("Phone number must not be empty")
    .isMobilePhone()
    .withMessage("Phone number must be mobile phone"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateRegister = [
  body("transcation_id").notEmpty().isString(),
  body("otp_code").notEmpty().isString(),
  body("name").notEmpty().isString().withMessage("name must be string"),
  body("phone_number").notEmpty().isMobilePhone(),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
const validateOtp = [
  body("phone_number")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Phone number must be valid"),
];

const validatePassword = [
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateId = [
  param("id").notEmpty().isInt({ min: 1 }).withMessage("Id must be integer"),
];

module.exports = {
  validateLogin,
  validateRegister,
  validatePassword,
  validateId,
  validateOtp,
};
