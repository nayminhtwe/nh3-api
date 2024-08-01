const asyncHandler = require("express-async-handler");
const Permission = require("../models/Permission");
const filterAllowFields = require("../utils/filterAllowFields");

module.exports = {
  find: asyncHandler(async (req, res) => {
    const permissions = await Permission.findAll();
    res.json(permissions);
  }),

  create: asyncHandler(async (req, res) => {
    const { type, guard_name, name, description, parent_id, sort } = req.body;

    const permission = await Permission.create({
      type,
      guard_name,
      name,
      description,
      parent_id,
      sort,
    });
    res.status(201).json(permission);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = [
      "type",
      "guard_name",
      "name",
      "description",
      "parent_id",
      "sort",
    ];

    const filteredBody = filterAllowFields(req.body, allowFields);

    if (Object.keys(filteredBody).length === 0) return res.sendStatus(400);

    const [updated] = await Permission.update(filteredBody, { where: { id } });

    if (updated) {
      const updatedPermission = await Permission.findByPk(id);
      res.json(updatedPermission);
    } else {
      res.status(404).json({ message: "Permission not found" });
    }
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleted = await Permission.destroy({ where: { id } });
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Permission not found" });
    }
  }),
};
