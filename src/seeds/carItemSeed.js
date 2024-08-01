const CarItem = require("../models/CarItem");

async function carItemSeed() {
  const carItems = [
    {
      item_id: 1,
      car_id: 1,
    },
    {
      item_id: 2,
      car_id: 2,
    },
    {
      item_id: 3,
      car_id: 3,
    },
  ];

  await CarItem.bulkCreate(carItems);
  console.log("Inserted car items");
}

carItemSeed();
module.exports = carItemSeed;
