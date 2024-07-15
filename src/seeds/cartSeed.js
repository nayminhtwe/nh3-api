const Cart = require("../models/Cart");

module.exports = async (req, res) => {
  const carts = [
    {
      itemId: 1,
      OE_NO: "ABC123",
      quantity: 2,
    },
    {
      itemId: 2,
      OE_NO: "XYZ789",
      quantity: 1,
    },
  ];

  await Cart.bulkCreate(carts);
  console.log("inserted cart");
};
