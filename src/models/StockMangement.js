const { DataTypes } = require("sequelize");
const Item = require("../models/Item");
const sequelize = require("../config/db");

const StockManagement = sequelize.define(
  "stock_management",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    item_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    adjusted_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING(255),
    },
  },
  {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

StockManagement.belongsTo(Item, {
  foreignKey: "item_id",
  onDelete: "CASCADE",
});

Item.hasMany(StockManagement, {
  foreignKey: "item_id",
  onDelete: "CASCADE",
});

module.exports = StockManagement;
