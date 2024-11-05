const Car = require("../models/Car");

async function carSeed() {
  const cars = [
    {
      company_id: 1,
      model_id: 1,
      year: "2000",
      engine_id: 1,
    },
    {
      company_id: 2,
      model_id: 1,
      year: "2005",
      engine_id: 2,
    },
    {
      company_id: 3,
      model_id: 1,
      year: "2015",
      engine_id: 3,
    },
    {
      company_id: 4,
      model_id: 2,
      year: "2008",
      engine_id: 4,
    },
    {
      company_id: 5,
      model_id: 3,
      year: "2000",
      engine_id: 5,
    },
  ];

  await Car.bulkCreate(cars);
  console.log("Inserted cars");
}

module.exports = carSeed;
