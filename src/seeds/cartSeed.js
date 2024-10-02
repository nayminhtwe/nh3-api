const Cart = require("../models/Cart");

async function cartSeed() {
  const carts = [
    {
      id: 1,
      quantity: 2,
      created_at: new Date("2024-01-01T10:00:00Z"),
      updated_at: new Date("2024-01-01T12:00:00Z"),
    },
    {
      id: 2,
      quantity: 5,
      created_at: new Date("2024-01-02T11:00:00Z"),
      updated_at: new Date("2024-01-02T13:00:00Z"),
    },
    {
      id: 3,
      quantity: 1,
      created_at: new Date("2024-01-03T12:30:00Z"),
      updated_at: new Date("2024-01-03T14:45:00Z"),
    },
    {
      id: 4,
      quantity: 3,
      created_at: new Date("2024-01-04T09:45:00Z"),
      updated_at: new Date("2024-01-04T11:20:00Z"),
    },
    {
      id: 5,
      quantity: 4,
      created_at: new Date("2024-01-05T08:15:00Z"),
      updated_at: new Date("2024-01-05T10:00:00Z"),
    },
  ];

  await Cart.bulkCreate(carts);
  console.log("inserted cart");
}

cartSeed();

module.exports = cartSeed;
