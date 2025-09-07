const express = require("express");
const CarModelController = require("../controllers/CarModelController");
const {
  validateId,
  validateBody,
} = require("../middlewares/carModlesValidate");
const validator = require("../utils/validator");

const router = express.Router();

router.get("/car-models", CarModelController.find);

router.post("/car-models", validateBody, validator, CarModelController.create);

router.put("/car-models/:id", validateId, validator, CarModelController.update);

router.delete(
  "/car-models/:id",
  validateId,
  validator,
  CarModelController.destroy
);

router.get("/car-models/company/:company_id", CarModelController.findByCompany);

module.exports = { carModelsRouter: router };
