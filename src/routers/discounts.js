const express = require("express");
const DiscountController = require("../controllers/DiscountController");
const { validateBody, validateId } = require("../middlewares/validateDiscount");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/discounts", DiscountController.find);

router.post("/discounts", validateBody, validator, DiscountController.create);

router.put("/discounts/:id", validateId, validator, DiscountController.update);

router.delete(
  "/discounts/:id",
  validateId,
  validator,
  DiscountController.destroy
);

module.exports = {
  discountsRouter: router,
};
