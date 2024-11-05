const CartItem = require("../models/CartItem");

async function cartItemSeed() {
  const cartItems = [
    {
      cart_id: 1,
      item_id: 1,
      price: 10.99,
      quantity: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 1,
      item_id: 2,
      price: 5.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 2,
      item_id: 3,
      price: 7.99,
      quantity: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 2,
      item_id: 4,
      price: 12.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 3,
      item_id: 3,
      price: 8.99,
      quantity: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 3,
      item_id: 2,
      price: 9.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 4,
      item_id: 4,
      price: 11.99,
      quantity: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cart_id: 4,
      item_id: 5,
      price: 6.99,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await CartItem.bulkCreate(cartItems);
  console.log("inserted cartItems");
}

module.exports = cartItemSeed;
