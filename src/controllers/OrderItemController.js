const OrderItem = require("../models/OrderItem");
const asyncHandler = require("express-async-handler");
const filterAllowFields = require("../utils/filterAllowFields");
const Item = require("../models/Item");
const OrderItemResource = require("../resources/OrderItemResource");

const OrderItemController = {
  find: asyncHandler(async (req, res) => {
    const orderItems = await OrderItem.findAll({ include: Item });
    console.log(orderItems);
    return res.json(OrderItemResource.collection(orderItems));
  }),

  create: asyncHandler(async (req, res) => {
    const { itemId, subprice, totalPrice, quantity, deliveryfees, note } =
      req.body;

    const result = await OrderItem.create({
      itemId,
      subprice,
      totalPrice,
      quantity,
      deliveryfees,
      note,
    });

    const orderItem = await OrderItem.findOne({
      where: { id: result.id },
      include: Item,
    });

    return res.status(201).json(new OrderItemResource(orderItem).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = [
      "itemId",
      "subprice",
      "totalPrice",
      "quantity",
      "deliveryfees",
      "note",
    ];
    const filteredBody = await filterAllowFields(req.body, allowFields);

    const [update] = await OrderItem.update(filteredBody, { where: { id } });

    if (!update) return res.status(400).json({ msg: "Update failed" });

    const updatedOrderItem = await OrderItem.findOne({ where: { id } });
    return res.json(updatedOrderItem);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await OrderItem.destroy({ where: { id } });

    if (!result) return res.status(400).json({ msg: "Order item not found!" });

    return res.sendStatus(204);
  }),
};

module.exports = OrderItemController;
