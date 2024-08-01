const { param, body } = require("express-validator");

const validateId = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isInt()
    .withMessage("ID must be an integer"),
];

const validateBody = [
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["admin", "user"])
    .withMessage('Type must be either "admin" or "user"'),

  body("guard_name")
    .notEmpty()
    .withMessage("Guard name is required")
    .isString()
    .withMessage("Guard name must be a string"),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("parent_id")
    .optional()
    .isInt()
    .withMessage("Parent ID must be an integer"),
];

const validateUpdateBody = [
  body("type").optional().isIn(["admin", "user"]).withMessage("Invalid type"),
  body("guard_name").optional().isString(),
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("parent_id").optional().isInt({ min: 1 }),
];

module.exports = {
  validateId,
  validateBody,
  validateUpdateBody,
};
