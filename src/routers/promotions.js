const express = require("express");
const PromotionController = require("../controllers/PromotionController");
const validator = require("../utils/validator");
const {
  validateBody,
  validateId,
} = require("../middlewares/validatePromotion");
const router = express.Router();

router.get("/promotions", PromotionController.find);
router.post("/promotions", validateBody, validator, PromotionController.create);
router.put(
  "/promotions/:id",
  validateId,
  validator,
  PromotionController.update
);
router.delete(
  "/promotions/:id",
  validateId,
  validator,
  PromotionController.destroy
);

module.exports = { promotionsRouter: router };
