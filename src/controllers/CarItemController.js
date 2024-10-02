const asyncHandler = require("express-async-handler");
const CarItem = require("../models/CarItem");
const filterAllowFields = require("../utils/filterAllowFields");
const Item = require("../models/Item");
const Car = require("../models/Car");
const CarItemResource = require("../resources/CarItemResource");

const includeFields = [Item, Car];

const CarItemController = {
  find: asyncHandler(async (req, res) => {
    const carItems = await CarItem.findAll({ include: includeFields });
    return res.json(CarItemResource.collection(carItems));
  }),

  create: asyncHandler(async (req, res) => {
    const { item_id, car_id } = req.body;

    const result = await CarItem.create({ item_id, car_id });

    const carItem = await CarItem.findOne({
      where: { id: result.id },
      include: includeFields,
    });

    return res.json(new CarItemResource(carItem).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const carItem = await CarItem.findByPk(id);

    if (!carItem) {
      return res.status(404).json({ msg: "Car item not found" });
    }

    const allowFields = ["item_id", "car_id"];

    const filteredBody = filterAllowFields(req.body, allowFields);

    await carItem.update(filteredBody);

    return res.json({ msg: "Car item updated successfully" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await CarItem.destroy({ where: { id } });

    if (!result) {
      return res.status(400).json({
        msg: "CarItem not found!",
      });
    }

    return res.sendStatus(204);
  }),
};

module.exports = CarItemController;
