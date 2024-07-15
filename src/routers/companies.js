const express = require("express");
const CompanyController = require("../controllers/CompanyController");
const {
  validateBody,
  validateId,
} = require("../middlewares/mainCategoriesValidate");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/companies", CompanyController.find);

router.post("/companies", validateBody, validator, CompanyController.create);

router.put("/companies/:id", validateId, validator, CompanyController.update);

router.delete(
  "/companies/:id",
  validateId,
  validator,
  CompanyController.destroy
);

module.exports = { companiesRouter: router };
