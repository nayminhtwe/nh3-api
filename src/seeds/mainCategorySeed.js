const MainCategory = require("../models/MainCategory");

async function mainCategorySeed() {
  const mainCategorySamples = [
    { name: "Exterior Accessories" },
    { name: "Interior Accessories" },
    { name: "Performance Parts" },
    { name: "Replacement Parts" },
    { name: "Tools & Equipment" },
  ];

  await MainCategory.bulkCreate(mainCategorySamples);
  console.log("Inserted main categories");
}

mainCategorySeed();

module.exports = mainCategorySeed;
