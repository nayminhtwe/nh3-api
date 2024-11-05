const Statuses = require("../models/Statuses");

async function statusSeed() {
  const statuses = [
    { name: "Available", created_at: new Date(), updated_at: new Date() },
    { name: "Out of Stock", created_at: new Date(), updated_at: new Date() },
    { name: "Discontinued", created_at: new Date(), updated_at: new Date() },
    { name: "Pre-order", created_at: new Date(), updated_at: new Date() },
    { name: "Backorder", created_at: new Date(), updated_at: new Date() },
    { name: "Limited Stock", created_at: new Date(), updated_at: new Date() },
  ];

  await Statuses.bulkCreate(statuses);
  console.log("seeded statuses");
}

module.exports = statusSeed;
