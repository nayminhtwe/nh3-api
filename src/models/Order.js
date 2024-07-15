const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Cart = require("./Cart");
const Address = require("./Address");
const OrderStatus = require("./OrderStatus");
const Promotion = require("./Promotion");
const Item = require("./Item");

const User = require("./User");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Cart,
      key: "id",
    },
  },
  addressId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Address,
      key: "id",
    },
  },
  orderStatusId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: OrderStatus,
      key: "id",
    },
  },
  promotionId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    references: {
      model: Promotion,
      key: "id",
    },
  },
  itemId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Item,
      key: "id",
    },
  },
  userId: {
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
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

Order.belongsTo(Cart, { foreignKey: "cartId", onDelete: "CASCADE" });
Order.belongsTo(Address, { foreignKey: "addressId", onDelete: "CASCADE" });
Order.belongsTo(OrderStatus, {
  foreignKey: "orderStatusId",
  onDelete: "CASCADE",
});
Order.belongsTo(Promotion, { foreignKey: "promotionId", onDelete: "CASCADE" });
Order.belongsTo(Item, { foreignKey: "itemId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Order;
