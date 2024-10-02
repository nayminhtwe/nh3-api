const Year = require("../models/Year");

async function yearSeed() {
  const years = [
    { company_id: 1, year: 2020 },
    { company_id: 2, year: 2021 },
    { company_id: 3, year: 2022 },
    { company_id: 4, year: 2023 },
    { company_id: 5, year: 2024 },
  ];

  await Year.bulkCreate(years);
  console.log("Inserted years");
}

module.exports = yearSeed;
