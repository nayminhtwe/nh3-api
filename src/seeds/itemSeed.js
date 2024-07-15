const Item = require("../models/Item");

module.exports = async function () {
  const items = [
    {
      name: "Car Cover for Toyota Camry",
      brandName: "Generic Brand",
      secondCategoryId: 1,
      mainCategoryId: 1,
      isFeature: false,
      isUniversal: true,
      OE_NO: "CC-TC-001",
      price: 50.0,
    },
    {
      name: "Leather Seat Covers for Honda Accord",
      brandName: "Luxury Covers",
      secondCategoryId: 2,
      mainCategoryId: 2,
      isFeature: true,
      isUniversal: false,
      OE_NO: null,
      price: 120.0,
    },
    {
      name: "Performance Exhaust System",
      brandName: "High Performance Parts",
      secondCategoryId: 3,
      mainCategoryId: 3,
      isFeature: true,
      isUniversal: false,
      OE_NO: "PE-001",
      price: 300.0,
    },
    {
      name: "OEM Brake Pads for Chevrolet Impala",
      brandName: "Chevy OEM Parts",
      secondCategoryId: 4,
      mainCategoryId: 4,
      isFeature: false,
      isUniversal: false,
      OE_NO: "BP-CI-001",
      price: 80.0,
    },
    {
      name: "Diagnostic Scanner Tool",
      brandName: "TechTools",
      secondCategoryId: 5,
      mainCategoryId: 5,
      isFeature: true,
      isUniversal: true,
      OE_NO: null,
      price: 150.0,
    },
  ];

  await Item.bulkCreate(items);
  console.log("Inserted items");
};
