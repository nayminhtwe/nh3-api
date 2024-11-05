const CarItem = require("../models/CarItem");

async function carItemSeed() {
  const carItems = [
    {
      item_id: 1,
      car_id: 1,
    },
    {
      item_id: 1,
      car_id: 1,
    },
    {
      item_id: 2,
      car_id: 3,
    },
    {
      item_id: 3,
      car_id: 4,
    },
    {
      item_id: 4,
      car_id: 4,
    },
    {
      item_id: 5,
      car_id: 2,
    },
    {
      item_id: 2,
      car_id: 1,
    },
  ];

  await CarItem.bulkCreate(carItems);
  console.log("Inserted car items");
}

module.exports = carItemSeed;
