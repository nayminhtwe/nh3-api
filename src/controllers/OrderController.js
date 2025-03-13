const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const OrderResource = require("../resources/OrderResource");
const Address = require("../models/Address");
const OrderStatus = require("../models/OrderStatus");
const Promotion = require("../models/Promotion");
const User = require("../models/User");
const Item = require("../models/Item");
const Discount = require("../models/Discount");
const ItemImage = require("../models/ItemImage");
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
            {
              model: Item, attributes: ["id", "name", "price", "OE_NO"],
              include: [
                { model: ItemImage, attributes: ["path"] },
              ]
            },
          ],
        },
      ],
      order: [['id', 'DESC']],
    });

    return res.json(OrderResource.collection(orders));
  }),

  show: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
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

    return res.json(order);
  }),

  create: asyncHandler(async (req, res) => {
    // items[] -> [{ item_id: 1, quantity: 2 }]

    const { address_id, promotion_id, deliveryfees, items } = req.body;

    const { user } = req;

    if (!user.is_approve) {
      return res.status(403).json({ msg: "Your account is not approved yet." });
    }

    let totalOrderprice = 0;
    let orderItems = [];

    for (const itemData of items) {
      const item = await Item.findByPk(itemData.item_id, {
        include: [{ model: Discount, attributes: ["discount_type", "discount_value"] }]
      });

      if (!item) return res.status(404).json({ msg: "Item not found" });

      const quantity = itemData.quantity;

      if (item.quantity < quantity) {
        return res
          .status(400)
          .json({ msg: `No enough stock for ${item.name}` });
      }

      // Calculate the price after applying user percentage
      const priceAfterUserPercentage = item.price - (item.price * (user.percentage / 100));

      // Calculate the discounted price
      let discountedPrice = priceAfterUserPercentage;
      if (item.discount) {
        const discount = item.discount.discount_value || 0; // Use 0 if discount is null or undefined
        if (item.discount.discount_type === 'percentage') {
          discountedPrice = priceAfterUserPercentage - (priceAfterUserPercentage * (discount / 100));
        } else if (item.discount.discount_type === 'fixed') {
          discountedPrice = priceAfterUserPercentage - discount;
        }
      }

      const totalPrice = discountedPrice * quantity;

      totalOrderprice += totalPrice;

      orderItems.push({
        item_id: item.id,
        subprice: discountedPrice,
        totalprice: totalPrice,
        quantity: quantity,
      });

      item.quantity -= quantity;
      await item.save();
    }


    const createdOrder = await Order.create({
      address_id,
      orderstatus_id: 1,
      // promotion_id,
      quantity: items.length,
      app_user_id: user.id,
      deliveryfees,
      totalprice: totalOrderprice,
    });

    const year = new Date().getFullYear().toString().substr(-2)
    let orderNumber = "" + createdOrder.id
    let pad = "0000"
    createdOrder.order_number = 'ORD-' + year + pad.substring(0, pad.length - orderNumber.length) + orderNumber
    await createdOrder.save()

    const createOrderItems = orderItems.map((item) => ({
      ...item,
      order_id: createdOrder.id,
    }));

    await OrderItem.bulkCreate(createOrderItems);

    const order = await Order.findByPk(createdOrder.id, {
      include: [
        ...orderIncludes,
        {
          model: OrderItem,
          include: [
            {
              model: Item, attributes: ["id", "name", "price", "OE_NO"],
              include: [
                { model: ItemImage, attributes: ["path"] },
              ]
            },
          ],
        },
      ],
    });

    return res.json(new OrderResource(order).exec());
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
