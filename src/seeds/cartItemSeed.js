const CartItem = require("../models/CartItem");

async function cartItemSeed() {
  const cartItems = [
    {
      cart_id: 1,
      item_id: 15,
      price: 10.99,
      quantity: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 1,
      item_id: 17,
      price: 5.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 2,
      item_id: 15,
      price: 7.99,
      quantity: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 2,
      item_id: 18,
      price: 12.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 3,
      item_id: 13,
      price: 8.99,
      quantity: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 3,
      item_id: 14,
      price: 9.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 4,
      item_id: 16,
      price: 11.99,
      quantity: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 4,
      item_id: 16,
      price: 6.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await CartItem.bulkCreate(cartItems);
}

cartItemSeed();
console.log("done");

module.exports = cartItemSeed;
