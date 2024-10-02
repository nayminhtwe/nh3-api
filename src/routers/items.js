const express = require("express");
const ItemController = require("../controllers/ItemController");
const { validateBody, validateId } = require("../middlewares/itemsValidate");
const validator = require("../utils/validator");
const { itemsUpload } = require("../middlewares/uploads/itemsUpload");

const router = express.Router();

router.get("/items", ItemController.find);

router.post("/items", validateBody, validator, ItemController.create);

router.post(
  "/items/:id/upload",
  itemsUpload.array("images"),
  ItemController.upload
);

router.put("/items/:id", validateId, validator, ItemController.update);

router.delete("/items/:id", validateId, validator, ItemController.destroy);

module.exports = { itemsRouter: router };
