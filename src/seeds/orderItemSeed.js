const OrderItem = require("../models/OrderItem");

module.exports = async function () {
  const orderItems = [
    {
      itemId: 1,
      subprice: 20.0,
      totalPrice: 40.0,
      quantity: 1,
      deliveryfees: 5.0,
      note: "Sample note 1",
    },
  ];

  await OrderItem.bulkCreate(orderItems);
  console.log("Inserted order items");
};
