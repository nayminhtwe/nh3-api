const OrderStatus = require("../models/OrderStatus");

async function orderStautsSeed() {
  const orderStatuses = [
    {
      status: "pending",
    },
    {
      status: "shipped",
    },
  ];

  await OrderStatus.bulkCreate(orderStatuses);
  console.log("order status seed successfully");
}

module.exports = orderStautsSeed;
