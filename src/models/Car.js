const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Company = require("./Company");
const Series = require("./Series");
const CarModel = require("./CarModel");
const Year = require("./Year");
const Engine = require("./Engine");

const Car = sequelize.define("Car", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  companyId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Company,
      key: "id",
    },
  },
  seriesId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Series,
      key: "id",
    },
  },
  modelId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: CarModel,
      key: "id",
    },
  },
  yearId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Year,
      key: "id",
    },
  },
  engineId: {
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
});

Car.belongsTo(Company, { foreignKey: "companyId", onDelete: "CASCADE" });
Car.belongsTo(Series, { foreignKey: "seriesId", onDelete: "CASCADE" });
Car.belongsTo(CarModel, { foreignKey: "modelId", onDelete: "CASCADE" });
Car.belongsTo(Year, { foreignKey: "yearId", onDelete: "CASCADE" });
Car.belongsTo(Engine, { foreignKey: "engineId", onDelete: "CASCADE" });

module.exports = Car;
