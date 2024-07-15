const express = require("express");
const EngineController = require("../controllers/EngineController");
const { validateBody, validateId } = require("../middlewares/engineValidate");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/engines", EngineController.find);

router.post("/engines", validateBody, validator, EngineController.create);

router.put(
  "/engines/:id",
  validateId,
  validateBody,
  validator,
  EngineController.update
);

router.delete("/engines/:id", validateId, validator, EngineController.destroy);

module.exports = { enginesRouter: router };
