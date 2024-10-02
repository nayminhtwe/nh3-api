const express = require("express");
const router = express.Router();
const StatusController = require("../controllers/StatusController");

router
  .get("/statuses", StatusController.find)
  .post("/statuses", StatusController.create)
  .put("/statuses/:id", StatusController.update)
  .delete("/statuses/:id", StatusController.destroy);

module.exports = { statusesRouter: router };
