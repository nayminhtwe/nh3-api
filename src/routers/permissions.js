const express = require("express");
const PermissionController = require("../controllers/PermissionController");
const {
  validateBody,
  validateId,
  validateUpdateBody,
} = require("../middlewares/validatePermission");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/permissions", PermissionController.find);

router.post(
  "/permissions",
  validateBody,
  validator,
  PermissionController.create
);

router.put(
  "/permissions/:id",
  validateId,
  validateUpdateBody,
  validator,
  PermissionController.update
);

router.delete(
  "/permissions/:id",
  validateId,
  validator,
  PermissionController.destroy
);

module.exports = {
  permissionsRouter: router,
};
