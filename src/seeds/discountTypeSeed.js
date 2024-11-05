const DiscountType = require("../models/DiscountType");

async function discountTypeSeed(req, res) {
  const discountTypes = [
    { type: "Percentage" },
    { type: "Buy One Get One Free" },
    { type: "Free Shipping" },
  ];

  await DiscountType.bulkCreate(discountTypes);
  console.log("Inserted discount types");
}

module.exports = discountTypeSeed;
