const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DiscountType = sequelize.define("DiscountType", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = DiscountType;
