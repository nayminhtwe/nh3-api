const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");
const Car = require("./Car");

const CarItem = sequelize.define("CarItem", {
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
  carId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Car,
      key: "id",
    },
  },
});

CarItem.belongsTo(Item, { foreignKey: "itemId", onDelete: "CASCADE" });
CarItem.belongsTo(Car, { foreignKey: "carId", onDelete: "CASCADE" });

module.exports = CarItem;
