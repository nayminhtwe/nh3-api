const SecondCategory = require("../models/SecondCategory");

async function secondCategorySeed() {
  const secondCategorySamples = [
    { name: "Car Covers" },
    { name: "Seat Covers" },
    { name: "Exhaust Systems" },
    { name: "Brake Pads" },
    { name: "Diagnostic Tools" },
  ];

  await SecondCategory.bulkCreate(secondCategorySamples);
  console.log("Inserted second categories");
}

secondCategorySeed();
module.exports = secondCategorySeed;
