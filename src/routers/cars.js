const express = require("express");
const CarController = require("../controllers/CarController");
const { validateBody, validateId } = require("../middlewares/carValidate");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/cars", CarController.find);

router.post("/cars", validateBody, validator, CarController.create);

router.put("/cars/:id", validateId, validator, CarController.update);

router.delete("/cars/:id", validateId, validator, CarController.destroy);

module.exports = { carsRouter: router };
