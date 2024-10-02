const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Statuses = sequelize.define(
  "statuses",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

module.exports = Statuses;
