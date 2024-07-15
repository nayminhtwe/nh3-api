const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Company = require("./Company");

const CarModel = sequelize.define("CarModel", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Company,
      key: "id",
    },
  },
});

CarModel.belongsTo(Company, { foreignKey: "companyId", onDelete: "CASCADE" });

module.exports = CarModel;
