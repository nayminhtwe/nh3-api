const express = require("express");
const ItemImageController = require("../controllers/ItemImageController");
const { validateId } = require("../middlewares/itemsValidate");
const validator = require("../utils/validator");
const { itemsUpload } = require("../middlewares/uploads/itemsUpload");
const router = express.Router();

router.get("/item-images", ItemImageController.find);

router.put(
  "/item-images/:id",
  validateId,
  validator,
  itemsUpload.single("image"),
  ItemImageController.update
);

router.delete(
  "/item-images/:id",
  validateId,
  validator,
  ItemImageController.destroy
);

module.exports = {
  itemImagesRouter: router,
};
