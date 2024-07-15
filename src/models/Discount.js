const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const DiscountType = require("./DiscountType");
const Item = require("./Item");

const Discount = sequelize.define("Discount", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  itemId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Item,
      key: "id",
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  discountTypeId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: DiscountType,
      key: "id",
    },
  },
  maxItem: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Discount.belongsTo(Item, { foreignKey: "itemId", onDelete: "CASCADE" });

Discount.belongsTo(DiscountType, {
  foreignKey: "discountTypeId",
  onDelete: "CASCADE",
});

DiscountType.hasMany(Discount, {
  foreignKey: "discountTypeId",
  onDelete: "CASCADE",
});

module.exports = Discount;
