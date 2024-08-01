const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");
const Car = require("./Car");

const CarItem = sequelize.define(
  "car_item",
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
    car_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Car,
        key: "id",
      },
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

CarItem.belongsTo(Item, { foreignKey: "item_id", onDelete: "CASCADE" });
CarItem.belongsTo(Car, { foreignKey: "car_id", onDelete: "CASCADE" });

module.exports = CarItem;
