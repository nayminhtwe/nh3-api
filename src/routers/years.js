const express = require("express");
const YearController = require("../controllers/YearController");
const { validateBody, validateId } = require("../middlewares/yearValidate");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/years", YearController.find);

router.post("/years", validateBody, validator, YearController.create);

router.put("/years/:id", validateId, validator, YearController.update);

router.delete("/years/:id", validateId, validator, YearController.destroy);

module.exports = { yearsRouter: router };
