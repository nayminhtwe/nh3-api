const Order = require("../models/Order");

async function orderSeed() {
  const orders = [
    {
      address_id: 1,
      orderstatus_id: 1,
      promotion_id: 1,
      app_user_id: 1,
      quantity: 2,
      deliveryfees: 5.0,
      totalprice: 50.0,
    },
    {
      address_id: 2,
      orderstatus_id: 2,
      promotion_id: 2,
      app_user_id: 2,
      quantity: 2,
      deliveryfees: 5.0,
      totalprice: 50.0,
    },
  ];

  await Order.bulkCreate(orders);
  console.log("Inserted orders");
}

module.exports = orderSeed;
