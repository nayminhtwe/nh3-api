const CartItem = require("../models/CartItem");

async function cartItemSeed() {
  const cartItems = [
    {
      cart_id: 1,
      item_id: 11,
      price: 10.99,
      quantity: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 1,
      item_id: 7,
      price: 5.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 2,
      item_id: 10,
      price: 7.99,
      quantity: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 2,
      item_id: 10,
      price: 12.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 3,
      item_id: 12,
      price: 8.99,
      quantity: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 3,
      item_id: 12,
      price: 9.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 4,
      item_id: 7,
      price: 11.99,
      quantity: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 4,
      item_id: 9,
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
