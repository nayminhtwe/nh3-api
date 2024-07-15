const asyncHandler = require("express-async-handler");
const DiscountType = require("../models/DiscountType");

const DiscountTypeController = {
  find: asyncHandler(async (req, res) => {
    const discountTypes = await DiscountType.findAll();
    return res.json(discountTypes);
  }),

  create: asyncHandler(async (req, res) => {
    const { type } = req.body;

    const discountType = await DiscountType.create({ type });
    return res.json(discountType);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    const [result] = await DiscountType.update({ type }, { where: { id } });

    if (!result)
      return res.status(400).json({ msg: "update failed! && check your id!" });

    const updateData = await DiscountType.findOne({ where: { id } });
    return res.json(updateData);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await DiscountType.destroy({ where: { id } });

    if (!result)
      return res.status(400).json({ msg: "DiscountType not found!" });

    return res.sendStatus(204);
  }),
};

module.exports = DiscountTypeController;
