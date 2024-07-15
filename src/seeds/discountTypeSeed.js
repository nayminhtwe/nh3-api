const DiscountType = require("../models/DiscountType");

module.exports = async (req, res) => {
  const discountTypes = [
    { type: "Percentage" },
    { type: "Buy One Get One Free" },
    { type: "Free Shipping" },
  ];

  await DiscountType.bulkCreate(discountTypes);
  console.log("Inserted discount types");
};
