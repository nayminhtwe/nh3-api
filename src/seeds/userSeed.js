const bcrypt = require("bcrypt");
const User = require("../models/User");

async function userSeed() {
  const hash = await bcrypt.hash("password", 10);

  const users = [
    {
      name: "Kyaw Gyi",
      email: "kyaw@gmail.com",
      password: hash,
    },
    {
      name: "Mya Mya",
      email: "mya@gmail.com",
      password: hash,
    },
    {
      name: "Alice",
      email: "alice@gmail.com",
      password: hash,
    },
  ];

  await User.bulkCreate(users);
  console.log("Inserted users");
}

userSeed();

module.exports = userSeed;
