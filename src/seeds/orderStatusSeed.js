const OrderStatus = require("../models/OrderStatus");

async function orderStautsSeed() {
  const orderStatuses = [
    {
      status: "Processing",
    },
    {
      status: "Shipped",
    },
  ];

  await OrderStatus.bulkCreate(orderStatuses);
  console.log("order status seed successfully");
}

module.exports = orderStautsSeed;
