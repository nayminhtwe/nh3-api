const asyncHandler = require("express-async-handler");
const Role = require("../models/Role");
const filterAllowFields = require("../utils/filterAllowFields");

module.exports = {
  find: asyncHandler(async (req, res) => {
    const roles = await Role.findAll();
    return res.json(roles);
  }),

  create: asyncHandler(async (req, res) => {
    const { type, name, guard_name } = req.body;

    if (!type || !name || !guard_name) {
      return res
        .status(400)
        .json({ msg: "type, name or guard_name field required!" });
    }
    const role = await Role.create({ type, name, guard_name });
    return res.json(role);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const allowFields = ["type", "name", "guard_name"];

    const filteredBody = filterAllowFields(req.body, allowFields);

    const [result] = await Role.update(filteredBody, { where: { id } });

    if (!result) return res.status(400).json({ msg: "update failed!" });

    const updatedData = await Role.findByPk(id);
    return res.json(updatedData);
  }),

  delete: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Role.destroy({ where: { id } });
    if (!result) return res.status(400).json({ msg: "destroy failed!" });
    return res.sendStatus(204);
  }),
};
