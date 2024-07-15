const CarModel = require("../models/CarModel");

module.exports = async function () {
  const carModels = [
    { name: "Camry LE", companyId: 1 },
    { name: "Accord EX", companyId: 2 },
    { name: "Mustang GT", companyId: 3 },
    { name: "Impala LT", companyId: 4 },
    { name: "330i", companyId: 5 },
  ];

  await CarModel.bulkCreate(carModels);
  console.log("Inserted car models");
};
