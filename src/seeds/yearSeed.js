const Year = require("../models/Year");

module.exports = async function () {
  const years = [
    { seriesId: 1, year: 2020 },
    { seriesId: 2, year: 2021 },
    { seriesId: 3, year: 2022 },
    { seriesId: 4, year: 2023 },
    { seriesId: 5, year: 2024 },
  ];

  await Year.bulkCreate(years);
  console.log("Inserted years");
};
