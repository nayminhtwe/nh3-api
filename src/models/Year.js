const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Company = require("./Company");

const Year = sequelize.define(
  "year",
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

Year.belongsTo(Company, { foreignKey: "company_id", onDelete: "CASCADE" });
Company.hasMany(Year, { foreignKey: "company_id", onDelete: "CASCADE" });

module.exports = Year;
