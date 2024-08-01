const Discount = require("../models/Discount");
const asyncHandler = require("express-async-handler");
const filterAllowFields = require("../utils/filterAllowFields");
const DiscountType = require("../models/DiscountType");
const Item = require("../models/Item");
const DiscountResource = require("../resources/DiscountResource");

const DiscountController = {
  find: asyncHandler(async (req, res) => {
    const discounts = await Discount.findAll({ include: [Item, DiscountType] });
    return res.json(DiscountResource.collection(discounts));
  }),

  create: asyncHandler(async (req, res) => {
    const {
      item_id,
      start_date,
      end_date,
      discount_type_id,
      max_item,
      is_active,
    } = req.body;

    const discount = await Discount.create({
      item_id,
      start_date,
      end_date,
      discount_type_id,
      max_item,
      is_active,
    });

    return res.json(new DiscountResource(discount).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = [
      "itemId",
      "startDate",
      "endDate",
      "discountTypeId",
      "maxItem",
      "isActive",
    ];

    const filteredBody = filterAllowFields(req.body, allowFields);

    const [result] = await Discount.update(filteredBody, { where: { id } });

    if (!result) return res.status(400).json({ msg: "update failed!" });

    const update = await Discount.findOne({
      where: { id },
      include: [Item, DiscountType],
    });
    return res.json(new DiscountResource(update).exec());
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await Discount.destroy({ where: { id } });

    if (!result)
      return res.status(400).json({ msg: `Discount with id ${id} not found!` });

    return res.sendStatus(204);
  }),
};

module.exports = DiscountController;
