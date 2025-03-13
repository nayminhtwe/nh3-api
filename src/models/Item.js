const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const MainCategory = require("./MainCategory");
const Statuses = require("./Statuses");
const Discount = require("./Discount");

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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Statuses,
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },
    main_category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: MainCategory,
        key: "id",
      },
      onDelete: "CASCADE",
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
    LKB_No: {
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
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Defining associations
Item.belongsTo(MainCategory, {
  foreignKey: "main_category_id",
  onDelete: "CASCADE",
});

Item.belongsTo(Statuses, {
  foreignKey: "status_id",
  onDelete: "CASCADE",
});

Item.hasMany(Discount, { foreignKey: "item_id", as: "discounts" });

module.exports = Item;
