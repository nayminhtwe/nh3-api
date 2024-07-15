const express = require("express");
const router = express.Router();
const SeriesController = require("../controllers/SeriesController");
const validator = require("../utils/validator");
const { validateBody, validateId } = require("../middlewares/seriesValidate");

router.get("/series", SeriesController.find);

router.post("/series", validateBody, validator, SeriesController.create);

router.put("/series/:id", validateId, validator, SeriesController.update);

router.delete("/series/:id", validateId, validator, SeriesController.destroy);

module.exports = { seriesRouter: router };
