const express = require("express");
const RoleController = require("../controllers/RoleController");
const { validateId } = require("../middlewares/validate");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/roles", RoleController.find);

router.post("/roles", RoleController.create);

router.put("/roles/:id", validateId, validator, RoleController.update);

router.delete("/roles/:id", validateId, validator, RoleController.delete);

module.exports = {
  rolesRouter: router,
};
