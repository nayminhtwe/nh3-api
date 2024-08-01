const { body, param } = require("express-validator");

const validateLogin = [
  body("email").notEmpty().isEmail(),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateRegister = [
  body("name").notEmpty().isString().withMessage("name must be string"),
  body("email").notEmpty().isEmail(),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
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
};
