const Discount = require("../models/Discount");
const asyncHandler = require("express-async-handler");
const filterAllowFields = require("../utils/filterAllowFields");
const DiscountType = require("../models/DiscountType");
const Item = require("../models/Item");
const DiscountResource = require("../resources/DiscountResource");

const DiscountController = {
  find: asyncHandler(async (req, res) => {
    const discounts = await Discount.findAll({ include: [Item] });
    return res.json(DiscountResource.collection(discounts));
  }),

  create: asyncHandler(async (req, res) => {
    const {
      item_id,
      start_date,
      end_date,
      discount_type,
      discount_value,
      is_active,
    } = req.body;

    const discount = await Discount.create({
      item_id,
      start_date,
      end_date,
      discount_type,
      discount_value,
      is_active,
    });

    return res.json(new DiscountResource(discount).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const {
      item_id,
      start_date,
      end_date,
      discount_type,
      discount_value,
      is_active,
    } = req.body;

    const discount = await Discount.findByPk(id);

    if (!discount) return res.status(404).json({ msg: "Discount not found" });

    await discount.update({
      item_id: item_id !== undefined ? item_id : discount.item_id,
      start_date: start_date !== undefined ? start_date : discount.start_date,
      end_date: end_date !== undefined ? end_date : discount.end_date,
      discount_type:
        discount_type !== undefined ? discount_type : discount.discount_type,
      discount_value:
        discount_value !== undefined ? discount_value : discount.discount_value,
      is_active: is_active !== undefined ? is_active : discount.is_active,
    });

    return res.json(new DiscountResource(discount).exec());
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
