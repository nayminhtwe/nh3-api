const Item = require("../models/Item");

async function itemSeed() {
  const items = [
    {
      name: "Car Cover for Toyota Camry",
      brandName: "Generic Brand",
      second_category_id: 1,
      main_category_id: 1,
      isFeature: false,
      isUniversal: true,
      OE_NO: "BB-fdlfjasl",
      price: 50.0,
    },
    {
      name: "Leather Seat Covers for Honda Accord",
      brandName: "Luxury Covers",
      second_category_id: 2,
      main_category_id: 2,
      isFeature: true,
      isUniversal: false,
      OE_NO: "djflasfjlds",
      price: 120.0,
    },
    {
      name: "Performance Exhaust System",
      brandName: "High Performance Parts",
      second_category_id: 3,
      main_category_id: 3,
      isFeature: true,
      isUniversal: false,
      OE_NO: "dafjdlsfj1",
      price: 300.0,
    },
    {
      name: "OEM Brake Pads for Chevrolet Impala",
      brandName: "Chevy OEM Parts",
      second_category_id: 4,
      main_category_id: 4,
      isFeature: false,
      isUniversal: false,
      OE_NO: "Bkjdaslfjdlka",
      price: 80.0,
    },
    {
      name: "Diagnostic Scanner Tool",
      brandName: "TechTools",
      second_category_id: 5,
      main_category_id: 5,
      isFeature: true,
      isUniversal: true,
      OE_NO: "lajdlkfds2343",
      price: 150.0,
    },
  ];

  await Item.bulkCreate(items);
  console.log("Inserted items");
}

itemSeed();

module.exports = itemSeed;
