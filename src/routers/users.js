const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const auth = require("../middlewares/auth");

const {
  validateRegister,
  validateReset,
  validateLogin,
  validateId,
  validateOtp,
  validatePercentage,
} = require("../middlewares/validate");

const validator = require("../utils/validator");

router.get("/verify", auth, UserController.verify);

router.post("/update", auth, UserController.update);

router.get("/users", UserController.find);

router.post("/otp-request", validateOtp, validator, UserController.requestOtp);

router.post("/otp-reset", validateOtp, validator, UserController.resetOtp);

router.post("/register", validateRegister, validator, UserController.register);

router.post("/reset", validateReset, validator, UserController.otpVerify);

router.post("/login", validateLogin, validator, UserController.login);

router.post("/refresh-token", UserController.refresh);

router.post(
  "/users/:id/restore",
  validateId,
  validator,
  UserController.restore
);

router.patch(
  "/users/:id/percentage",
  validatePercentage,
  validator,
  UserController.setPercentage
);

router.delete("/users/:id/refresh-token", UserController.revokeRefresh);

router.delete("/users/:id", validateId, validator, UserController.destroy);

module.exports = { usersRouter: router };
