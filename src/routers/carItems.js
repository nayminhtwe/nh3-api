const express = require("express");
const CarItemController = require("../controllers/CarItemController");
const { validateBody, validateId } = require("../middlewares/validateCarItem");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/car-items", CarItemController.find);

router.post("/car-items", validateBody, validator, CarItemController.create);

router.put("/car-items/:id", validateId, validator, CarItemController.update);

router.delete(
  "/car-items/:id",
  validateId,
  validator,
  CarItemController.destroy
);

module.exports = { carItemsRouter: router };
