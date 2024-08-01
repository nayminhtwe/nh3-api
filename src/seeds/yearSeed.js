const Year = require("../models/Year");

async function yearSeed() {
  const years = [
    { series_id: 1, year: 2020 },
    { series_id: 2, year: 2021 },
    { series_id: 3, year: 2022 },
    { series_id: 4, year: 2023 },
    { series_id: 5, year: 2024 },
  ];

  await Year.bulkCreate(years);
  console.log("Inserted years");
}

yearSeed();

module.exports = yearSeed;
