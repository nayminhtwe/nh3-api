const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Series = require("./Series");

const Year = sequelize.define(
  "year",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    series_id: {
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
  },
  { timestamps: false }
);

Year.belongsTo(Series, { foreignKey: "series_id", onDelete: "CASCADE" });

module.exports = Year;
