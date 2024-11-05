const OrderItem = require("../models/OrderItem");

async function orderItemSeed() {
  const orderItems = [
    {
      item_id: 1,
      order_id: 1,
      subprice: 20.0,
      totalprice: 40.0,
      quantity: 1,
      deliveryfees: 5.0,
      note: "Sample note 1",
    },
    {
      item_id: 3,
      order_id: 2,
      subprice: 200,
      totalprice: 45.0,
      quantity: 3,
      deliveryfees: 5.0,
      note: "Sample note 1",
    },
  ];

  await OrderItem.bulkCreate(orderItems);
  console.log("Inserted order items");
}

module.exports = orderItemSeed;
