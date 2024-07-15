const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async function () {
  const hash = await bcrypt.hash("password", 10);

  const users = [
    {
      phone: 343243,
      email: "kyaw@gmail.com",
      password: hash,
      roleId: 1,
    },
    {
      phone: 92343,
      email: "mya@gmail.com",
      password: hash,
      roleId: 2,
    },
    {
      phone: 123456789,
      email: "alice@gmail.com",
      password: hash,
      roleId: 3,
    },
  ];

  await User.bulkCreate(users);
  console.log("Inserted users");
};
