const MainCategory = require("../models/MainCategory");

module.exports = async function () {
  const mainCategorySamples = [
    { name: "Exterior Accessories" },
    { name: "Interior Accessories" },
    { name: "Performance Parts" },
    { name: "Replacement Parts" },
    { name: "Tools & Equipment" },
  ];

  await MainCategory.bulkCreate(mainCategorySamples);
  console.log("Inserted main categories");
};
