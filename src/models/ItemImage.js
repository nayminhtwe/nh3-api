const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");

const ItemImage = sequelize.define(
  "item_images",
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
    path: {
      type: DataTypes.STRING,
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

ItemImage.belongsTo(Item, { foreignKey: "item_id", onDelete: "CASCADE" });
Item.hasMany(ItemImage, { foreignKey: "item_id", onDelete: "CASCADE" });

module.exports = ItemImage;
