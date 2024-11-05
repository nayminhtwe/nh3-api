const CarModel = require("../models/CarModel");

async function carModelSeed() {
  const carModels = [
    { name: "Camry LE", company_id: 1 },
    { name: "Accord EX", company_id: 2 },
    { name: "Accord yx", company_id: 3 },
  ];

  await CarModel.bulkCreate(carModels);
  console.log("Inserted car models");
}

module.exports = carModelSeed;
