const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const OrderResource = require("../resources/OrderResource");
const Cart = require("../models/Cart");
const Address = require("../models/Address");
const OrderStatus = require("../models/OrderStatus");
const Promotion = require("../models/Promotion");
const Item = require("../models/Item");
const User = require("../models/User");
const filterAllowFields = require("../utils/filterAllowFields");

const orderIncludes = [
  { model: Cart },
  { model: OrderStatus },
  { model: Promotion },
  { model: Item },
  { model: Address },
  { model: User },
];

const OrderController = {
  find: asyncHandler(async (req, res) => {
    const orders = await Order.findAll({ include: orderIncludes });
    return res.json(OrderResource.collection(orders));
  }),

  create: asyncHandler(async (req, res) => {
    const {
      cart_id,
      address_id,
      orderstatus_id,
      promotion_id,
      item_id,
      user_id,
      quantity,
      deliveryfees,
      totalprice,
    } = req.body;

    try {
      const order = await Order.create({
        cart_id,
        address_id,
        orderstatus_id,
        promotion_id,
        item_id,
        user_id,
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

    const allowFields = [
      "cart_id",
      "address_id",
      "orderstatus_id",
      "promotion_id",
      "item_id",
      "user_id",
      "quantity",
      "deliveryfees",
      "totalprice",
    ];

    const filteredBody = filterAllowFields(req.body, allowFields);

    await Order.update(filteredBody, { where: { id } });

    const updatedOrder = await Order.findOne({
      where: { id },
      include: orderIncludes,
    });

    if (!updatedOrder)
      return res.status(400).json({ msg: "update failed! && check your id!" });

    const orderResource = new OrderResource(updatedOrder).toArray();
    return res.json(orderResource);
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
