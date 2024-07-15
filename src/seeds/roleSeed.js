const Role = require("../models/Role");

module.exports = async function () {
  const roles = ["User", "Manager", "Admin"];

  await Role.bulkCreate(roles.map((name) => ({ name })));
  console.log("Inserted roles");
};
