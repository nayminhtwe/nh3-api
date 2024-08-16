const bcrypt = require("bcrypt");
const User = require("../models/User");

async function userSeed() {
  const hash = await bcrypt.hash("password", 10);

  const users = [
    {
      name: "Kyaw Gyi",
      phone_number: "2123423",
      password: hash,
    },
    {
      name: "Mya Mya",

      phone_number: "94234324",
      password: hash,
    },
    {
      name: "Alice",
      phone_number: "47349837",
      password: hash,
    },
  ];

  await User.bulkCreate(users);
  console.log("Inserted users");
}

userSeed();

module.exports = userSeed;
