const express = require("express");
const SliderController = require("../controllers/SliderController");
const { validateBody, validateId } = require("../middlewares/validateSlider");
const validator = require("../utils/validator");
const { itemsUpload } = require("../middlewares/uploads/itemsUpload");
const router = express.Router();

router.get("/sliders", SliderController.find);

router.post(
  "/sliders",
  itemsUpload.single("slider"),
  validateBody,
  validator,
  SliderController.create
);

router.put(
  "/sliders/:id",
  itemsUpload.single("slider"),
  validateId,
  validateBody,
  validator,
  SliderController.update
);

router.delete("/sliders/:id", validateId, validator, SliderController.destroy);

module.exports = {
  slidersRouter: router,
};
