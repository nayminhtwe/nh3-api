const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const auth = require("../middlewares/auth");

const {
  validateRegister,
  validateLogin,
  validateId,
} = require("../middlewares/validate");

const validator = require("../utils/validator");

router.get("/verify", auth, UserController.verify);

router.get("/users", UserController.find);

router.get("/users/:id", validateId, validator, UserController.show);

router.get("/logout", UserController.logout);

router.post("/register", validateRegister, validator, UserController.register);

router.post("/login", validateLogin, validator, UserController.login);

router.post("/refresh", UserController.refresh);

router.put("/users/:id", validateId, validator, UserController.update);

router.delete("/users/:id", validateId, validator, UserController.destroy);

module.exports = { usersRouter: router };
