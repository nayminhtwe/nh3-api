const Item = require("../models/Item");
async function itemSeed() {
  const items = [
    {
      name: "Oil Filter",
      brandName: "Bosch",
      description: "High-performance oil filter for cars",
      quantity: 150,
      status_id: 1, // Assuming this corresponds to "Available" status in the statuses table
      main_category_id: 1, // Assuming the main category with id 1 exists
      is_feature: true,
      is_universal: false,
      OE_NO: "OE12345",
      LKB_No: "LKB54321",
      price: 19.99,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Air Filter",
      brandName: "K&N",
      description: "Reusable air filter for better airflow",
      quantity: 75,
      status_id: 2, // Out of Stock
      main_category_id: 2, // Assuming the main category with id 2 exists
      is_feature: false,
      is_universal: true,
      OE_NO: "OE67890",
      LKB_No: "LKB09876",
      price: 29.99,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Brake Pads",
      brandName: "Brembo",
      description: "High-quality brake pads for performance vehicles",
      quantity: 50,
      status_id: 1, // Available
      main_category_id: 3,
      is_feature: true,
      is_universal: false,
      OE_NO: "OE11223",
      LKB_No: "LKB33211",
      price: 49.99,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Engine Oil",
      brandName: "Mobil 1",
      description: "Synthetic engine oil for maximum protection",
      quantity: 200,
      status_id: 1, // Available
      main_category_id: 4,
      is_feature: false,
      is_universal: true,
      OE_NO: "OE44556",
      LKB_No: "LKB66544",
      price: 39.99,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Spark Plug",
      brandName: "NGK",
      description: "Premium spark plugs for long-lasting performance",
      quantity: 100,
      status_id: 5, // Limited Stock
      main_category_id: 3,
      is_feature: true,
      is_universal: false,
      OE_NO: "OE77889",
      LKB_No: "LKB99877",
      price: 9.99,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Windshield Wipers",
      brandName: "Rain-X",
      description: "Durable wipers for clear visibility",
      quantity: 300,
      status_id: 1, // Available
      main_category_id: 4,
      is_feature: false,
      is_universal: true,
      OE_NO: "OE99112",
      LKB_No: "LKB21199",
      price: 14.99,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await Item.bulkCreate(items);
  console.log("Inserted items");
}

module.exports = itemSeed;
