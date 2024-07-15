const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");

const ItemImage = sequelize.define("ItemImage", {
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
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

ItemImage.belongsTo(Item, { foreignKey: "itemId", onDelete: "CASCADE" });
Item.hasMany(ItemImage, { foreignKey: "itemId", onDelete: "CASCADE" });

module.exports = ItemImage;
