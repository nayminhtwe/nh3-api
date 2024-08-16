const Car = require("../models/Car");

async function carSeed() {
  const cars = [
    {
      company_id: 1,
      model_id: 1,
      year_id: 1,
      engine_id: 1,
      description: "Toyota Camry LE 2020",
    },
    {
      company_id: 2,
      model_id: 1,
      year_id: 2,
      engine_id: 2,
      description: "Honda Accord EX 2021",
    },
    {
      company_id: 3,
      model_id: 1,
      year_id: 3,
      engine_id: 3,
      description: "Ford Mustang GT 2022",
    },
    {
      company_id: 4,
      model_id: 2,
      year_id: 4,
      engine_id: 4,
      description: "Chevrolet Impala LT 2023",
    },
    {
      company_id: 5,
      model_id: 3,
      year_id: 5,
      engine_id: 5,
      description: "BMW 330i 2024",
    },
  ];

  await Car.bulkCreate(cars);
  console.log("Inserted cars");
}

carSeed();

module.exports = carSeed;
