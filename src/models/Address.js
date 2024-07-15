const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Address = sequelize.define("Address", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.BIGINT.UNSIGNED,
    references: {
      model: User,
      key: "id",
    },
  },
  buildingNo: {
    type: DataTypes.STRING,
  },
  floor: {
    type: DataTypes.STRING,
  },
  isSave: {
    type: DataTypes.BOOLEAN,
  },
  unit: {
    type: DataTypes.STRING,
  },
  addressTitle: {
    type: DataTypes.STRING,
  },
  street: {
    type: DataTypes.STRING,
  },
});

Address.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Address;
