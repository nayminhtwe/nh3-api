const CarItem = require("../models/CarItem");

async function carItemSeed() {
  const carItems = [
    {
      item_id: 13,
      car_id: 1,
    },
    {
      item_id: 16,
      car_id: 2,
    },
    {
      item_id: 15,
      car_id: 3,
    },
  ];

  await CarItem.bulkCreate(carItems);
  console.log("Inserted car items");
}

carItemSeed();

module.exports = carItemSeed;
