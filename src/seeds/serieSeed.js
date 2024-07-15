const Series = require("../models/Series");

module.exports = async function () {
  const series = [
    { name: "Camry" },
    { name: "Accord" },
    { name: "Mustang" },
    { name: "Impala" },
    { name: "3 Series" },
  ];

  await Series.bulkCreate(series);
  console.log("Inserted series");
};
