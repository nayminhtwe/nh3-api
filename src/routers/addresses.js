const express = require("express");
const AddressController = require("../controllers/AddressController");
const router = express.Router();
const validator = require("../utils/validator");
const { validateId, validateBody } = require("../middlewares/validateAddress");

router.get("/addresses", AddressController.find);

router.post("/addresses", validateBody, validator, AddressController.create);

router.put("/addresses/:id", validateId, validator, AddressController.update);

router.delete(
  "/addresses/:id",
  validateId,
  validator,
  AddressController.destroy
);

module.exports = { addressesRouter: router };
