const asyncHandler = require("express-async-handler");
const CarModel = require("../models/CarModel");
const Company = require("../models/Company");
const CarModelResource = require("../resources/CarModelResource");
const filterAllowFields = require("../utils/filterAllowFields");

const CarModelController = {
  find: asyncHandler(async (req, res) => {
    const carModels = await CarModel.findAll({ include: Company });

    const carModelResources = CarModelResource.collection(carModels);

    return res.json(carModelResources);
  }),

  create: asyncHandler(async (req, res) => {
    const { name, companyId } = req.body;

    const result = await CarModel.create({ name, companyId });

    const carModel = await CarModel.findOne({
      where: { id: result.id },
      include: Company,
    });

    const carModelResource = new CarModelResource(carModel).exec();
    return res.json(carModelResource);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, companyId } = req.body;

    if (!name && !companyId)
      return res.status(400).json({ msg: "Invalid input parameters!" });

    const allowFields = ["name", "companyId"];
    const bodyFiltered = filterAllowFields(req.body, allowFields);

    const [result] = await CarModel.update(bodyFiltered, { where: { id } });

    if (!result) return res.status(400).json({ msg: "update failed!" });

    const update = await CarModel.findOne({ where: { id }, include: Company });

    const carModelResource = new CarModelResource(update).exec();

    return res.json(carModelResource);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await CarModel.destroy({ where: { id } });

    if (!result) res.status(404).json({ msg: "CarModel not found!" });

    return res.sendStatus(204);
  }),
};

module.exports = CarModelController;
