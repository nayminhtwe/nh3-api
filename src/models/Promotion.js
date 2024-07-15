const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Promotion = sequelize.define("Promotion", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  OE_NO: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Promotion;
