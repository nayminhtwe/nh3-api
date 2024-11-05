const Discount = require("../models/Discount");

async function discountSeed() {
  const discounts = [
    {
      item_id: 1,
      start_date: new Date(),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      discount_type: "percentage",
      discount_value: 10,
      is_active: true,
    },
    {
      item_id: 2,
      start_date: new Date(),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      discount_type: "fixed",
      discount_value: 20,
      is_active: true,
    },
    {
      item_id: 3,
      start_date: new Date(),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      discount_type: "percentage",
      discount_value: 15,
      is_active: false,
    },
    {
      item_id: 4,
      start_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      discount_type: "fixed",
      discount_value: 50,
      is_active: true,
    },
  ];

  await Discount.bulkCreate(discounts);
  console.log("Inserted discounts");
}

module.exports = discountSeed;
