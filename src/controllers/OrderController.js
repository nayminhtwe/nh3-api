const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const OrderResource = require("../resources/OrderResource");
const Address = require("../models/Address");
const OrderStatus = require("../models/OrderStatus");
const Promotion = require("../models/Promotion");
const User = require("../models/User");
const Item = require("../models/Item");
const OrderItem = require("../models/OrderItem");
const checkPendingStatus = require("../utils/checkPendingStatus");

const orderIncludes = [OrderStatus, Promotion, Address, User];

const OrderController = {
  find: asyncHandler(async (req, res) => {
    const { user } = req;
    const orders = await Order.findAll({
      where: { app_user_id: user.id },
      include: [
        ...orderIncludes,
        {
          model: OrderItem,
          include: [
            { model: Item, attributes: ["id", "name", "price", "OE_NO"] },
          ],
        },
      ],
    });

    return res.json(OrderResource.collection(orders));
  }),

  show: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByPk(id, { include: User });

    return res.json(order);
  }),

  create: asyncHandler(async (req, res) => {
    // items[] -> [{ item_id: 1, quantity: 2 }]

    const { address_id, promotion_id, deliveryfees, items } = req.body;

    try {
      const { user } = req;

      let totalOrderprice = 0;
      let orderItems = [];

      for (const itemData of items) {
        const item = await Item.findByPk(itemData.item_id);

        if (!item) return res.status(404).json({ msg: "Item not found" });

        const quantity = itemData.quantity;

        if (item.quantity < quantity) {
          return res
            .status(400)
            .json({ msg: `No enough stock for ${item.name}` });
        }

        const subprice = item.price;
        const totalPrice = subprice * quantity;

        totalOrderprice += totalPrice;

        orderItems.push({
          item_id: item.id,
          subprice: subprice,
          totalprice: totalPrice,
          quantity: quantity,
        });

        item.quantity -= quantity;
        await item.save();
      }

      const order = await Order.create({
        address_id,
        orderstatus_id: 1,
        promotion_id,
        quantity: items.length,
        app_user_id: user.id,
        deliveryfees,
        totalprice: totalOrderprice,
      });

      const createOrderItems = orderItems.map((item) => ({
        ...item,
        order_id: order.id,
      }));

      await OrderItem.bulkCreate(createOrderItems);

      return res.json(order);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }),

  // update: asyncHandler(async (req, res) => {
  //   const { id } = req.params;

  //   const { address_id, orderstatus_id, promotion_id, deliveryfees } = req.body;

  //   const order = await Order.findByPk(id);

  //   checkPendingStatus(order.orderstatus_id, res);

  //   await order.update({
  //     address_id,
  //     orderstatus_id,
  //     promotion_id,
  //     deliveryfees,
  //   });

  //   return res.json({ msg: "Update success" });
  // }),

  // updateOrderItem: asyncHandler(async (req, res) => {
  //   const { order_id, item_id } = req.params;
  //   const { quantity } = req.body;

  //   const order = await Order.findByPk(order_id);

  //   checkPendingStatus(order.orderstatus_id, res);

  //   const orderItem = await OrderItem.findOne({ where: { order_id, item_id } });

  //   await orderItem.update({ quantity });

  //   return res.json({ msg: "Order item updated successfully" });
  // }),

  // destoryOrderItem: asyncHandler(async (req, res) => {
  //   const { order_id, item_id } = req.params;

  //   const order = await Order.findByPk(order_id);

  //   checkPendingStatus(order.orderstatus_id, res);

  //   const orderItem = await OrderItem.findOne({ where: { order_id, item_id } });

  //   if (orderItem) return res.status(404).json({ msg: "Order not found" });

  //   await orderItem.destroy();

  //   return res.json({ msg: "Delete order success" });
  // }),

  // destroy: asyncHandler(async (req, res) => {
  //   const { id } = req.params;
  //   const order = await Order.findByPk(id);

  //   if (!order) {
  //     return res.status(404).json({ msg: "Order not found" });
  //   }

  //   checkPendingStatus(order.orderstatus_id);

  //   await order.destroy();

  //   return res.status(200).json({ msg: "Order deleted successfully" });
  // }),
};

module.exports = OrderController;
