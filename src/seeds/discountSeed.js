const Discount = require("../models/Discount");

async function discountSeed() {
  const discounts = [
    {
      item_id: 15,
      start_date: new Date(),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      discount_type_id: 1,
      max_item: 10,
      is_active: true,
    },
    {
      item_id: 17,
      start_date: new Date(),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      discount_type_id: 2,
      max_item: 20,
      is_active: true,
    },
  ];

  await Discount.bulkCreate(discounts);
  console.log("inserted discount");
}

discountSeed();
module.exports = discountSeed;
