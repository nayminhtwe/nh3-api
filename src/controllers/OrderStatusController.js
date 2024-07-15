const OrderStatus = require("../models/OrderStatus");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const filterAllowFields = require("../utils/filterAllowFields");
const OrderStatusResource = require("../resources/OrderStatusResource");

const includeFields = [User];

const OrderStatusController = {
  find: asyncHandler(async (req, res) => {
    const orderStatuses = await OrderStatus.findAll({ include: includeFields });
    return res.json(OrderStatusResource.collection(orderStatuses));
  }),

  create: asyncHandler(async (req, res) => {
    const { status, userId } = req.body;

    const result = await OrderStatus.create({
      status,
      userId,
    });

    const orderStatus = await OrderStatus.findOne({
      where: { id: result.id },
      include: includeFields,
    });

    return res.status(201).json(new OrderStatusResource(orderStatus).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = ["status", "userId"];
    const filteredBody = filterAllowFields(req.body, allowFields);

    const [update] = await OrderStatus.update(filteredBody, { where: { id } });

    if (!update) return res.status(400).json({ msg: "Update failed!" });

    const updatedOrderStatus = await OrderStatus.findOne({
      where: { id },
      include: includeFields,
    });

    return res.json(new OrderStatusResource(updatedOrderStatus).exec());
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await OrderStatus.destroy({ where: { id } });

    if (!result) return res.status(400).json({ msg: `OrderStatus not found!` });

    return res.sendStatus(204);
  }),
};

module.exports = OrderStatusController;
