const express = require("express");
const AddressController = require("../controllers/AddressController");
const router = express.Router();
const validator = require("../utils/validator");
const { validateId, validateBody } = require("../middlewares/validateAddress");
const auth = require("../middlewares/auth");

router.get("/addresses", auth, AddressController.find);

router.post(
  "/addresses",
  validateBody,
  validator,
  auth,
  AddressController.create
);

router.put(
  "/addresses/:id",
  validateId,
  validator,
  auth,
  AddressController.update
);

router.delete(
  "/addresses/:id",
  validateId,
  validator,
  AddressController.destroy
);

module.exports = { addressesRouter: router };
