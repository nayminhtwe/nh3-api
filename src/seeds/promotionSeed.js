const Promotion = require("../models/Promotion");

module.exports = async (req, res) => {
  const promotions = [
    {
      OE_NO: "PROMO123",
      type: "Discount",
    },
    {
      OE_NO: "PROMO456",
      type: "Free Shipping",
    },
  ];

  await Promotion.bulkCreate(promotions);
  console.log("inseretd pormotions");
};
