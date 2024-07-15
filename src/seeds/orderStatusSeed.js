const OrderStatus = require("../models/OrderStatus");

module.exports = async (req, res) => {
  const orderStatuses = [
    {
      status: "Processing",
      userId: 1,
    },
    {
      status: "Shipped",
      userId: 2,
    },
  ];

  await OrderStatus.bulkCreate(orderStatuses);
  console.log("Order statuses seeded successfully.");

  await OrderStatus.bulkCreate(orderStatuses);
  console.log("inserted order statuses");
};
