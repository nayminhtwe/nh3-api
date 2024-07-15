const Order = require("../models/Order");

module.exports = async function () {
  const orders = [
    {
      cartId: 1,
      addressId: 1,
      orderStatusId: 1,
      promotionId: null,
      itemId: 1,
      userId: 1,
      quantity: 2,
      deliveryfees: 5.0,
      totalPrice: 50.0,
    },
  ];

  await Order.bulkCreate(orders);
  console.log("Inserted orders");
};
