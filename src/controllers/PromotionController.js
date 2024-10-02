const Promotion = require("../models/Promotion");
const asyncHandler = require("express-async-handler");
const filterAllowFields = require("../utils/filterAllowFields");

const PromotionController = {
  find: asyncHandler(async (req, res) => {
    const promotions = await Promotion.findAll();
    return res.json(promotions);
  }),

  create: asyncHandler(async (req, res) => {
    const { OE_NO, type } = req.body;

    const promotion = await Promotion.create({
      OE_NO,
      type,
    });

    return res.status(201).json(promotion);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const promotion = await Promotion.findByPk(id);

    if (!promotion) return res.status(404).json({ msg: "Promotion not found" });

    const allowFields = ["OE_NO", "type"];
    const filteredBody = filterAllowFields(req.body, allowFields);

    await promotion.update(filteredBody);

    return res.json({ msg: "Update success" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await Promotion.destroy({ where: { id } });

    if (!result)
      return res
        .status(400)
        .json({ msg: `Promotion with id ${id} not found!` });

    return res.sendStatus(204);
  }),
};

module.exports = PromotionController;
