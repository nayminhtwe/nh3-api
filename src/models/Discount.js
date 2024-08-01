const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const DiscountType = require("./DiscountType");
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
    discount_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: DiscountType,
        key: "id",
      },
    },
    max_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

Discount.belongsTo(DiscountType, {
  foreignKey: "discount_type_id",
  onDelete: "CASCADE",
});

DiscountType.hasMany(Discount, {
  foreignKey: "discount_type_id",
  onDelete: "CASCADE",
});

module.exports = Discount;
