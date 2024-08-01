const Address = require("../models/Address");

const addressSeed = async (req, res) => {
  const addresses = [
    {
      user_id: 1,
      buildingNo: "123",
      floor: "1st Floor",
      isSave: true,
      unit: "A",
      addressTitle: "Home",
      street: "123 Street",
    },
    {
      user_id: 2,
      buildingNo: "456",
      floor: "2nd Floor",
      isSave: false,
      unit: "B",
      addressTitle: "Work",
      street: "456 Avenue",
    },
  ];

  Address.bulkCreate(addresses);
  console.log("inserted address");
};

addressSeed();

module.exports = addressSeed;
