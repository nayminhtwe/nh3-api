const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");

const Discount = sequelize.define(
  "discount",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Item,
        key: "id",
      },
    },
    start_date: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    discount_type: {
      type: DataTypes.ENUM("percentage", "fixed"),
      allowNull: false,
    },
    discount_value: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
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

Discount.belongsTo(Item, { foreignKey: "item_id", onDelete: "CASCADE" });
Item.hasMany(Discount, { foreignKey: "item_id", onDelete: "CASCADE" });

module.exports = Discount;
