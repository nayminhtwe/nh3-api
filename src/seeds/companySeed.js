const Company = require("../models/Company");

module.exports = async function () {
  const companies = [
    { name: "Toyota" },
    { name: "Honda" },
    { name: "Ford" },
    { name: "Chevrolet" },
    { name: "BMW" },
  ];

  await Company.bulkCreate(companies);
  console.log("Inserted companies");
};
