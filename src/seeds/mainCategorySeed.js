const MainCategory = require("../models/MainCategory");

async function mainCategorySeed() {
  const mainCategorySamples = [
    { name: "Exterior Accessories", image: "404.jpeg" },
    { name: "Interior Accessories", image: "food-logo.jpeg" },
    { name: "Performance Parts", image: "food-logo.jpeg" },
    { name: "Replacement Parts", image: "yangon.jpg" },
    { name: "Audio & Electronics", image: "audio-electronics.jpg" },
    { name: "Wheels & Tires", image: "wheels-tires.jpg" },
  ];

  await MainCategory.bulkCreate(mainCategorySamples);
  console.log("Inserted main categories");
}

module.exports = mainCategorySeed;
