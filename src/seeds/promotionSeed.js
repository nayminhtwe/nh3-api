const Promotion = require("../models/Promotion");

async function promotionSeed() {
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
}

promotionSeed();

module.exports = promotionSeed;
