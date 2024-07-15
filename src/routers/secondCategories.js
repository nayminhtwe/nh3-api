const express = require("express");

const {
  validateBody,
  validateId,
} = require("../middlewares/mainCategoriesValidate");
const SecondCategoryController = require("../controllers/SecondCategoryController");
const validator = require("../utils/validator");

const router = express.Router();

router.get("/second-categories", SecondCategoryController.find);

router.post(
  "/second-categories",
  validateBody,
  validator,
  SecondCategoryController.create
);

router.put(
  "/second-categories/:id",
  validateId,
  validateBody,
  validator,
  SecondCategoryController.update
);

router.delete(
  "/second-categories/:id",
  validateId,
  validator,
  SecondCategoryController.destroy
);

module.exports = { secondCategoriesRouter: router };
