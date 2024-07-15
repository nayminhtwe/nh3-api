const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");

const Cart = sequelize.define("Cart", {
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
  OE_NO: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
});

Cart.belongsTo(Item, { foreignKey: "itemId", onDelete: "CASCADE" });

module.exports = Cart;
