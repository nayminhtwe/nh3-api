const express = require("express");
const DiscountTypeController = require("../controllers/DiscountTypeController");
const {
  validateBody,
  validateId,
} = require("../middlewares/validateDiscountType");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/discount-types", DiscountTypeController.find);

router.post(
  "/discount-types",
  validateBody,
  validator,
  DiscountTypeController.create
);

router.put(
  "/discount-types/:id",
  validateId,
  validator,
  DiscountTypeController.update
);

router.delete(
  "/discount-types/:id",
  validateId,
  validator,
  DiscountTypeController.destroy
);

module.exports = { discountTypesRouter: router };
