const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MainCategory = sequelize.define("MainCategory", {
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

module.exports = MainCategory;
