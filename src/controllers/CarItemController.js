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
    const { itemId, carId } = req.body;

    const result = await CarItem.create({ itemId, carId });

    const carItem = await CarItem.findOne({
      where: { id: result.id },
      include: includeFields,
    });

    return res.json(new CarItemResource(carItem).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = ["itemId", "carId"];

    const filteredBody = filterAllowFields(req.body, allowFields);

    const [result] = await CarItem.update(filteredBody, { where: { id } });

    if (!result)
      return res.status(400).json({ msg: "update failed! && check your id!" });

    const updateData = await CarItem.findOne({
      where: { id },
      include: includeFields,
    });

    return res.json(new CarItemResource(updateData).exec());
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
