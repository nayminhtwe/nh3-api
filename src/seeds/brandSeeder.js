const sequelize = require("../config/db");
const Brand = require("../models/Brand");

async function brandSeed() {
  const brands = [
    { name: "Toyota" },
    { name: "Ford" },
    { name: "Honda" },
    { name: "Chevrolet" },
    { name: "Nissan" },
    { name: "BMW" },
  ];

  await Brand.bulkCreate(brands);
  console.log("brands seeding success");
}

// brandSeed();

module.exports = brandSeed;
