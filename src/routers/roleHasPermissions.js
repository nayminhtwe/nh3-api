const express = require("express");
const RoleHasPermissionsController = require("../controllers/RoleHasPermissionsController");
const {
  validateBody,
  validateId,
} = require("../middlewares/validateRoleHasPermission");
const validator = require("../utils/validator");
const router = express.Router();

router.get("/role-has-permissions", RoleHasPermissionsController.find);

router.post(
  "/role-has-permissions",
  validateBody,
  validator,
  RoleHasPermissionsController.create
);

router.put(
  "/role-has-permissions/:permission_id/:role_id",
  validateId,
  validator,
  RoleHasPermissionsController.update
);

router.delete(
  "/role-has-permissions/:permission_id/:role_id",
  validateId,
  validator,
  RoleHasPermissionsController.destroy
);

module.exports = {
  roleHasPermissionsRouter: router,
};
