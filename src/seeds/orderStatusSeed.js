const OrderStatus = require("../models/OrderStatus");

async function orderStautsSeed() {
  const orderStatuses = [
    {
      status: "Processing",
      user_id: 1,
    },
    {
      status: "Shipped",
      user_id: 2,
    },
  ];

  await OrderStatus.bulkCreate(orderStatuses);
  console.log("order status seed successfully");
}

orderStautsSeed();

module.exports = orderStautsSeed;
