const Car = require("../models/Car");

module.exports = async function () {
  const cars = [
    {
      companyId: 1,
      seriesId: 1,
      modelId: 1,
      yearId: 1,
      engineId: 1,
      description: "Toyota Camry LE 2020",
    },
    {
      companyId: 2,
      seriesId: 2,
      modelId: 2,
      yearId: 2,
      engineId: 2,
      description: "Honda Accord EX 2021",
    },
    {
      companyId: 3,
      seriesId: 3,
      modelId: 3,
      yearId: 3,
      engineId: 3,
      description: "Ford Mustang GT 2022",
    },
    {
      companyId: 4,
      seriesId: 4,
      modelId: 4,
      yearId: 4,
      engineId: 4,
      description: "Chevrolet Impala LT 2023",
    },
    {
      companyId: 5,
      seriesId: 5,
      modelId: 5,
      yearId: 5,
      engineId: 5,
      description: "BMW 330i 2024",
    },
  ];

  await Car.bulkCreate(cars);
  console.log("Inserted cars");
};
