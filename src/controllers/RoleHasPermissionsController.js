const RoleHasPermission = require("../models/RoleHasPermission");
const asyncHandler = require("express-async-handler");
const filterAllowFields = require("../utils/filterAllowFields");
const Role = require("../models/Role");
const Permission = require("../models/Permission");

module.exports = {
  find: asyncHandler(async (req, res) => {
    const roleHasPermissions = await RoleHasPermission.findAll();
    res.json(roleHasPermissions);
  }),

  create: asyncHandler(async (req, res) => {
    const { role_id, permission_id } = req.body;

    const roleHasPermission = await RoleHasPermission.create({
      permission_id,
      role_id,
    });

    res.status(201).json(roleHasPermission);
  }),

  update: asyncHandler(async (req, res) => {
    const { permission_id, role_id } = req.params;

    const allowFields = ["permission_id", "role_id"];

    const filteredBody = filterAllowFields(req.body, allowFields);

    if (Object.keys(filteredBody).length === 0) return res.sendStatus(400);

    const [updated] = await RoleHasPermission.update(filteredBody, {
      where: { permission_id, role_id },
    });

    if (!updated) return res.status(400).json({ msg: "update failed!" });

    return res.sendStatus(200);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { permission_id, role_id } = req.params;

    const result = await RoleHasPermission.destroy({
      where: { permission_id, role_id },
    });

    if (!result) return res.status(400).json({ msg: "destroy failed!" });

    return res.sendStatus(204);
  }),
};
