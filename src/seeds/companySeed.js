const Company = require("../models/Company");

async function companySeed() {
  const companies = [
    { name: "Toyota" },
    { name: "Honda" },
    { name: "Ford" },
    { name: "Chevrolet" },
    { name: "BMW" },
  ];

  await Company.bulkCreate(companies);
  console.log("Inserted companies");
}

module.exports = companySeed;
