const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Cart = require("./Cart");
const Address = require("./Address");
const OrderStatus = require("./OrderStatus");
const Promotion = require("./Promotion");
const Item = require("./Item");

const User = require("./User");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cart_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Cart,
        key: "id",
      },
    },
    address_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Address,
        key: "id",
      },
    },
    orderstatus_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: OrderStatus,
        key: "id",
      },
    },
    promotion_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Promotion,
        key: "id",
      },
    },
    item_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Item,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    deliveryfees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalprice: {
      type: DataTypes.INTEGER,
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

Order.belongsTo(Cart, { foreignKey: "cart_id", onDelete: "CASCADE" });
Order.belongsTo(Address, { foreignKey: "address_id", onDelete: "CASCADE" });
Order.belongsTo(OrderStatus, {
  foreignKey: "orderstatus_id",
  onDelete: "CASCADE",
});
Order.belongsTo(Promotion, { foreignKey: "promotion_id", onDelete: "CASCADE" });
Order.belongsTo(Item, { foreignKey: "item_id", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

module.exports = Order;
