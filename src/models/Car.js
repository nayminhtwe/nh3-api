const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Company = require("./Company");
const Series = require("./Series");
const CarModel = require("./CarModel");
const Year = require("./Year");
const Engine = require("./Engine");

const Car = sequelize.define(
  "car",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Company,
        key: "id",
      },
    },
    series_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Series,
        key: "id",
      },
    },
    model_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: CarModel,
        key: "id",
      },
    },
    year_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Year,
        key: "id",
      },
    },
    engine_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Engine,
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
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

Car.belongsTo(Company, { foreignKey: "company_id", onDelete: "CASCADE" });
Car.belongsTo(Series, { foreignKey: "series_id", onDelete: "CASCADE" });
Car.belongsTo(CarModel, { foreignKey: "model_id", onDelete: "CASCADE" });
Car.belongsTo(Year, { foreignKey: "year_id", onDelete: "CASCADE" });
Car.belongsTo(Engine, { foreignKey: "engine_id", onDelete: "CASCADE" });

module.exports = Car;
