const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Cart = require("./Cart");
const Item = require("./Item");

const CartItem = sequelize.define(
  "cart_items",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cart_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

CartItem.belongsTo(Cart, { onDelete: "CASCADE", foreignKey: "cart_id" });
CartItem.belongsTo(Item, { onDelete: "CASCADE", foreignKey: "item_id" });

Cart.hasMany(CartItem, { foreignKey: "cart_id", onDelete: "CASCADE" });

module.exports = CartItem;
