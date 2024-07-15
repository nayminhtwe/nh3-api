const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Series = sequelize.define("Series", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Series;
