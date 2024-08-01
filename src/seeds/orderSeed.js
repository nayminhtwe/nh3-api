const Order = require("../models/Order");

async function orderSeed() {
  const orders = [
    {
      cart_id: 1,
      address_id: 1,
      orderstatus_id: 1,
      promotion_id: 1,
      item_id: 1,
      user_id: 1,
      quantity: 2,
      deliveryfees: 5.0,
      totalprice: 50.0,
    },
    {
      cart_id: 2,
      address_id: 2,
      orderstatus_id: 1,
      promotion_id: 2,
      item_id: 1,
      user_id: 2,
      quantity: 2,
      deliveryfees: 5.0,
      totalprice: 50.0,
    },
  ];

  await Order.bulkCreate(orders);
  console.log("Inserted orders");
}

orderSeed();

module.exports = orderSeed;
