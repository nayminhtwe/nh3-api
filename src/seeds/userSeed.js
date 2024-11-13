const bcrypt = require("bcrypt");
const User = require("../models/User");

async function userSeed() {
  const hash = await bcrypt.hash("password", 10);

  const users = [
    {
      name: "Kyaw Gyi",
      phone_number: "2123423",
      password: hash,
      is_approve: true,
    },
    {
      name: "Alice",
      phone_number: "47349837",
      password: hash,
      is_approve: true,
    },
  ];

  await User.bulkCreate(users);
  console.log("Inserted users");
}

module.exports = userSeed;
