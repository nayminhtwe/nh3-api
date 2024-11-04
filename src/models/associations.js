const Car = require("./Car");
const CarItem = require("./CarItem");
const Item = require("./Item");

Item.belongsToMany(Car, {
  through: CarItem,
  foreignKey: "item_id",
  onDelete: "CASCADE",
});

Car.belongsToMany(Item, {
  through: CarItem,
  foreignKey: "car_id",
  onDelete: "CASCADE",
});

CarItem.belongsTo(Item, { foreignKey: "item_id", onDelete: "CASCADE" });
CarItem.belongsTo(Car, { foreignKey: "car_id", onDelete: "CASCADE" });

module.exports = { Car, Item, CarItem };
