const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  itemId: {
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
  totalPrice: {
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
});

OrderItem.belongsTo(Item, { foreignKey: "itemId", onDelete: "CASCADE" });

module.exports = OrderItem;
