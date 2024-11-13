const express = require("express");
const ItemController = require("../controllers/ItemController");
const { validateBody, validateId } = require("../middlewares/itemsValidate");
const validator = require("../utils/validator");
const { fileUpload } = require("../middlewares/uploads/fileUpload");

const router = express.Router();

router.get("/items", ItemController.find);

router.get("/discount-items", ItemController.getDiscountItems);

router.post("/items", validateBody, validator, ItemController.create);

router.post(
  "/items/:id/upload",
  fileUpload.array("items"),
  ItemController.upload
);

router.put("/items/:id", validateId, validator, ItemController.update);

router.delete("/items/:id", validateId, validator, ItemController.destroy);

module.exports = { itemsRouter: router };
