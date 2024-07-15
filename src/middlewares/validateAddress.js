const { param, body } = require("express-validator");

const validateAddress = {
  validateId: [
    param("id").notEmpty().isInt().withMessage("id must be integer"),
  ],

  validateBody: [
    body("userId")
      .notEmpty()
      .withMessage("userId is required")
      .isInt()
      .withMessage("userId must be an integer"),

    body("buildingNo")
      .notEmpty()
      .withMessage("buildingNo is required")
      .isString()
      .withMessage("buildingNo must be a string"),

    body("floor").notEmpty().isString("floor must be a string"),

    body("isSave")
      .notEmpty()
      .withMessage("isSave is required")
      .isBoolean()
      .withMessage("isSave must be a boolean"),

    body("unit").isString().withMessage("unit must be a string"),

    body("addressTitle")
      .notEmpty()
      .withMessage("addressTitle is required")
      .isString()
      .withMessage("addressTitle must be a string"),

    body("street")
      .notEmpty()
      .withMessage("street is required")
      .isString()
      .withMessage("street must be a string"),
  ],
};

module.exports = validateAddress;
