const express = require("express");
const BrandController = require("../controllers/BrandController");
const { validateBody, validateId } = require("../middlewares/validateBrand");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/brands", BrandController.find);

router.post("/brands", validateBody, validator, BrandController.create);

router.put(
  "/brands/:id",
  validateId,
  validateBody,
  validator,
  BrandController.update
);

router.delete("/brands/:id", validateId, validator, BrandController.destroy);

module.exports = {
  brandsRouter: router,
};
