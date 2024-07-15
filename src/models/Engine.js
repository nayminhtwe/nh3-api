const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Engine = sequelize.define("Engine", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  enginepower: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Engine;
