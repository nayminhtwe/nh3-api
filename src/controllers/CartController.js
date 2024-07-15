const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");
const filterAllowFields = require("../utils/filterAllowFields");
const Item = require("../models/Item");
const CartResource = require("../resources/CartResource");

const CartController = {
  find: asyncHandler(async (req, res) => {
    const carts = await Cart.findAll({ include: Item });
    return res.json(CartResource.collection(carts));
  }),

  create: asyncHandler(async (req, res) => {
    const { itemId, OE_NO, quantity } = req.body;

    const result = await Cart.create({
      itemId,
      OE_NO,
      quantity,
    });

    const cart = await Cart.findOne({
      where: { id: result.id },
      include: Item,
    });

    return res.status(201).json(new CartResource(cart).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = ["itemId", "OE_NO", "quantity"];
    const filteredBody = filterAllowFields(req.body, allowFields);

    const [update] = await Cart.update(filteredBody, { where: { id } });

    if (!update) return res.status(400).json({ msg: "Update failed" });

    const updatedCart = await Cart.findOne({ where: { id }, include: Item });
    return res.json(new CartResource(updatedCart).exec());
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await Cart.destroy({ where: { id } });

    if (!result)
      return res.status(400).json({ msg: `Cart with id ${id} not found!` });

    return res.sendStatus(204);
  }),
};

module.exports = CartController;
