const Cart = require("../models/Cart");

async function cartSeed() {
  const carts = [
    {
      item_id: 1,
      OE_NO: "ABC123",
      quantity: 2,
    },
    {
      item_id: 2,
      OE_NO: "XYZ789",
      quantity: 1,
    },
  ];

  await Cart.bulkCreate(carts);
  console.log("inserted cart");
}

cartSeed();

module.exports = cartSeed;
