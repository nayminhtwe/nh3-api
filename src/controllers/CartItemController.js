const asyncHandler = require("express-async-handler");
const CartItem = require("../models/CartItem");

module.exports = {
  find: asyncHandler(async (req, res) => {
    const cartItems = await CartItem.findAll();
    return res.json(cartItems);
  }),

  create: asyncHandler(async (req, res) => {
    const { cart_id, item_id, price, quantity } = req.body;
    const cartItem = await CartItem.create({
      cart_id,
      item_id,
      price,
      quantity,
    });
    return res.status(201).json(cartItem);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { cart_id, item_id, price, quantity } = req.body;
    const cartItem = await CartItem.findByPk(id);

    if (!cartItem) return res.status(404).json({ msg: "CartItem not found" });

    await cartItem.update({ cart_id, item_id, price, quantity });
    return res.json({ msg: "Cart Item updated successfully" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cartItem = await CartItem.findByPk(id);

    if (!cartItem) return res.status(404).json({ msg: "CartItem not found" });

    await cartItem.destroy();

    return res.json({ msg: "CartItem deleted successfully" });
  }),
};
