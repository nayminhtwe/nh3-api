const asyncHandler = require("express-async-handler");
const Car = require("../models/Car");
const Company = require("../models/Company");
const CarModel = require("../models/CarModel");
const Engine = require("../models/Engine");
const filterAllowFields = require("../utils/filterAllowFields");
const CarResource = require("../resources/CarResource");

const includeFields = [Company, CarModel, Engine];

const CarController = {
  find: asyncHandler(async (req, res) => {
    const cars = await Car.findAll({
      include: includeFields,
    });

    return res.json(CarResource.collection(cars));
  }),

  create: asyncHandler(async (req, res) => {
    const { company_id, model_id, year, engine_id } = req.body;

    const result = await Car.create({
      company_id,
      model_id,
      year,
      engine_id,
    });

    const car = await Car.findOne({
      where: { id: result.id },
      include: includeFields,
    });

    const carResource = new CarResource(car).exec();

    return res.status(201).json(carResource);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = ["company_id", "model_id", "year", "engine_id"];

    const filteredBody = filterAllowFields(req.body, allowFields);

    const [result] = await Car.update(filteredBody, { where: { id } });

    if (!result) return res.status(400).json({ msg: "update failed! " });

    const updatedCar = await Car.findOne({
      where: { id },
      include: includeFields,
    });

    const carResource = new CarResource(updatedCar).exec();

    return res.json(carResource);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Car.destroy({ where: { id } });

    if (!result) return res.status(400).json({ msg: "Car not found!" });

    return res.sendStatus(204);
  }),
};

module.exports = CarController;
