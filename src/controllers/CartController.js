const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");
const CartResource = require("../resources/CartResource");
const CartItem = require("../models/CartItem");
const Item = require("../models/Item");
const { createError } = require("../utils/createError");

const CartController = {
  find: asyncHandler(async (req, res) => {
    const carts = await Cart.findAll();
    return res.json(CartResource.collection(carts));
  }),

  create: asyncHandler(async (req, res) => {
    const { items } = req.body;

    const cart = await Cart.create({ quantity: items.length });

    items.map(async (item) => {
      const foundItem = await Item.findByPk(item.item_id);

      if (foundItem) {
        await CartItem.create({
          cart_id: cart.id,
          item_id: item.item_id,
          price: foundItem.price,
          quantity: item.quantity || 1,
        });
      } else {
        throw createError("Item not found", 404);
      }
    });

    return res.json(new CartResource(cart).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    // Find the cart by primary key
    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    // Update the cart and check the number of affected rows
    const [affectedRows] = await Cart.update({ quantity }, { where: { id } });

    // If no rows were affected, return a failure message
    if (affectedRows === 0) {
      return res.status(400).json({ msg: "Update failed, no changes made" });
    }

    return res.json({ msg: "Updated cart successfully" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const cart = await Cart.findByPk(id);

    if (!cart) return res.status(404).json({ msg: "Cart not found" });
    await cart.destroy();

    return res.json({ msg: "Deleted cart successfully" });
  }),
};

module.exports = CartController;
