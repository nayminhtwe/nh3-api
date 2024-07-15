const Discount = require("../models/Discount");

module.exports = async (req, res) => {
  const discounts = [
    {
      itemId: 1,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      discountTypeId: 1,
      maxItem: 10,
      isActive: true,
    },
    {
      itemId: 2,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      discountTypeId: 2,
      maxItem: 20,
      isActive: true,
    },
  ];

  await Discount.bulkCreate(discounts);
  console.log("inserted discount");
};
