const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SecondCategory = sequelize.define("SecondCategory", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = SecondCategory;
