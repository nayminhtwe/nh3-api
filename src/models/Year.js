const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Series = require("./Series");

const Year = sequelize.define("Year", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  seriesId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Series,
      key: "id",
    },
  },
  year: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
});

Year.belongsTo(Series, { foreignKey: "seriesId", onDelete: "CASCADE" });

module.exports = Year;
