const SecondCategory = require("../models/SecondCategory");

module.exports = async function () {
  const secondCategorySamples = [
    { name: "Car Covers", mainCategoryId: 1 },
    { name: "Seat Covers", mainCategoryId: 2 },
    { name: "Exhaust Systems", mainCategoryId: 3 },
    { name: "Brake Pads", mainCategoryId: 4 },
    { name: "Diagnostic Tools", mainCategoryId: 5 },
  ];

  await SecondCategory.bulkCreate(secondCategorySamples);
  console.log("Inserted second categories");
};
