const asyncHandler = require("express-async-handler");
const Brand = require("../models/Brand");

module.exports = {
  find: asyncHandler(async (req, res) => {
    const brands = await Brand.findAll();
    return res.json(brands);
  }),

  create: asyncHandler(async (req, res) => {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const [updated] = await Brand.update({ name }, { where: { id } });

    if (!updated)
      return res
        .status(400)
        .json({ msg: "Update failed. Brand not found or no changes made." });

    return res.status(200).json({ msg: "updated successfully" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await Brand.destroy({ where: { id } });
    if (!result)
      return res
        .status(400)
        .json({ msg: "Destroy failed. Brand not found or no changes made." });

    return res.status(204).json({ msg: "Destroy successfully" });
  }),
};
