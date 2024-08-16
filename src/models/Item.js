const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const MainCategory = require("./MainCategory");

const Item = sequelize.define(
  "item",
  {
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
    main_category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: MainCategory,
        key: "id",
      },
    },
    is_feature: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_universal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    OE_NO: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
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

Item.belongsTo(MainCategory, {
  foreignKey: "main_category_id",
  onDelete: "CASCADE",
});

module.exports = Item;
