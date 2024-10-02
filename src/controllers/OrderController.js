const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const OrderResource = require("../resources/OrderResource");
const Address = require("../models/Address");
const OrderStatus = require("../models/OrderStatus");
const Promotion = require("../models/Promotion");
const User = require("../models/User");

const orderIncludes = [OrderStatus, Promotion, Address, User];

const OrderController = {
  find: asyncHandler(async (req, res) => {
    const orders = await Order.findAll({ include: orderIncludes });
    return res.json(OrderResource.collection(orders));
  }),

  show: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByPk(id, { include: User });

    return res.json(order);
  }),

  create: asyncHandler(async (req, res) => {
    const {
      address_id,
      orderstatus_id,
      promotion_id,
      app_user_id,
      quantity,
      deliveryfees,
      totalprice,
    } = req.body;

    try {
      const order = await Order.create({
        address_id,
        orderstatus_id,
        promotion_id,
        app_user_id,
        quantity,
        deliveryfees,
        totalprice,
      });

      const createdOrder = await Order.findByPk(order.id, {
        include: orderIncludes,
      });
      return res.status(201).json(new OrderResource(createdOrder).toArray());
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    await order.update(req.body);

    return res.json({ msg: "Update success" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Order.destroy({ where: { id } });

    if (!result)
      return res.status(400).json({ msg: `Order with id ${id} not found!` });
    return res.sendStatus(204);
  }),
};

module.exports = OrderController;
