const OrderStatus = require("../models/OrderStatus");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const OrderStatusResource = require("../resources/OrderStatusResource");

const OrderStatusController = {
  find: asyncHandler(async (req, res) => {
    const orderStatuses = await OrderStatus.findAll();
    return res.json(OrderStatusResource.collection(orderStatuses));
  }),

  create: asyncHandler(async (req, res) => {
    const { status } = req.body;

    const result = await OrderStatus.create({
      status,
    });

    const orderStatus = await OrderStatus.findOne({
      where: { id: result.id },
    });

    return res.status(201).json(new OrderStatusResource(orderStatus).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const orderStatus = await OrderStatus.findByPk(id);

    if (!orderStatus) {
      return res.status(404).json({ msg: "Order status not found" });
    }

    const result = await orderStatus.update({ status });

    return res.json({ msg: "Updated success" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const orderStatus = await OrderStatus.findByPk(id);

    if (!orderStatus)
      return res.status(404).json({ msg: "Order status not found" });

    await orderStatus.destroy();

    return res.sendStatus(204);
  }),
};

module.exports = OrderStatusController;
