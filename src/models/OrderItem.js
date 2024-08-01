const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");

const OrderItem = sequelize.define(
  "order_item",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    item_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Item,
        key: "id",
      },
    },
    subprice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalprice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    deliveryfees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
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

OrderItem.belongsTo(Item, { foreignKey: "item_id", onDelete: "CASCADE" });

module.exports = OrderItem;
