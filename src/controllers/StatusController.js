const Statuses = require("../models/Statuses");
const asyncHandler = require("express-async-handler");

module.exports = {
  find: asyncHandler(async (req, res) => {
    const statuses = await Statuses.findAll();
    return res.json(statuses);
  }),

  create: asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Name required" });
    }

    const status = await Statuses.create({ name });
    return res.json(status);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const status = await Statuses.findByPk(id);
    if (!status) return res.status(404).json({ msg: "Status not found" });

    if (!name) {
      return res.status(400).json({ msg: "Name requried" });
    }

    await status.update({ name });
    return res.json({ msg: "Status updated successfully" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const status = await Statuses.findByPk(id);
    if (!status) return res.status(404).json({ msg: "Status not found" });

    await status.destroy();
    return res.json({ msg: "status deleted successfully" });
  }),
};
