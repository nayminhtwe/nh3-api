const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const MainCategory = require("./MainCategory");
const SecondCategory = require("./SecondCategory");

const Item = sequelize.define("Item", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandName: {
    type: DataTypes.STRING,
  },
  secondCategoryId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: SecondCategory,
      key: "id",
    },
  },
  mainCategoryId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: MainCategory,
      key: "id",
    },
  },
  isFeature: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isUniversal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  OE_NO: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

Item.belongsTo(SecondCategory, {
  foreignKey: "secondCategoryId",
  onDelete: "CASCADE",
});

Item.belongsTo(MainCategory, {
  foreignKey: "mainCategoryId",
  onDelete: "CASCADE",
});

module.exports = Item;
