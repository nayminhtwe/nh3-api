const CarItem = require("../models/CarItem");

module.exports = async function () {
  const carItems = [
    {
      itemId: 1,
      carId: 1,
    },
    {
      itemId: 2,
      carId: 2,
    },
  ];

  await CarItem.bulkCreate(carItems);
  console.log("Inserted car items");
};
