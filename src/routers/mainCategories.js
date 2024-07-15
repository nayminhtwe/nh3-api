const express = require("express");
const MainCategoryController = require("../controllers/MainCategoryController");
const {
  validateBody,
  validateId,
} = require("../middlewares/mainCategoriesValidate");
const router = express.Router();
const validator = require("../utils/validator");

router.get("/main-categories", MainCategoryController.find);

router.post(
  "/main-categories",
  validateBody,
  validator,
  MainCategoryController.create
);

router.put(
  "/main-categories/:id",
  validateId,
  validateBody,
  validator,
  MainCategoryController.update
);

router.delete(
  "/main-categories/:id",
  validateId,
  validator,
  MainCategoryController.destroy
);

module.exports = { mainCategoriesRouter: router };
