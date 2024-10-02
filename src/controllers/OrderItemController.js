const OrderItem = require("../models/OrderItem");
const asyncHandler = require("express-async-handler");
const filterAllowFields = require("../utils/filterAllowFields");
const Item = require("../models/Item");
const OrderItemResource = require("../resources/OrderItemResource");

const OrderItemController = {
  find: asyncHandler(async (req, res) => {
    const orderItems = await OrderItem.findAll({ include: Item });
    return res.json(OrderItemResource.collection(orderItems));
  }),

  create: asyncHandler(async (req, res) => {
    const { item_id, order_id, subprice, totalprice, quantity } = req.body;

    const result = await OrderItem.create({
      item_id,
      order_id,
      subprice,
      totalprice,
      quantity,
      order_id,
    });

    const orderItem = await OrderItem.findOne({
      where: { id: result.id },
      include: Item,
    });

    return res.status(201).json(new OrderItemResource(orderItem).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const orderItem = await OrderItem.findByPk(id);

    if (!orderItem)
      return res.status(404).json({ msg: "Order item not found" });

    await orderItem.update(req.body);

    return res.json({ msg: "Update success" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await OrderItem.destroy({ where: { id } });

    if (!result) return res.status(400).json({ msg: "Order item not found!" });

    return res.sendStatus(204);
  }),
};

module.exports = OrderItemController;
