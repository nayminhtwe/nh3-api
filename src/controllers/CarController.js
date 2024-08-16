const asyncHandler = require("express-async-handler");
const Car = require("../models/Car");
const Company = require("../models/Company");
const CarModel = require("../models/CarModel");
const Year = require("../models/Year");
const Engine = require("../models/Engine");
const filterAllowFields = require("../utils/filterAllowFields");
const CarResource = require("../resources/CarResource");

const includeFields = [Company, CarModel, Year, Engine];

const CarController = {
  find: asyncHandler(async (req, res) => {
    const cars = await Car.findAll({
      include: includeFields,
    });

    return res.json(CarResource.collection(cars));
  }),

  create: asyncHandler(async (req, res) => {
    const { company_id, model_id, year_id, engine_id, description } = req.body;

    const result = await Car.create({
      company_id,
      model_id,
      year_id,
      engine_id,
      description,
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

    const allowFields = [
      "company_id",
      "model_id",
      "year_id",
      "engine_id",
      "description",
    ];

    const filteredBody = filterAllowFields(req.body, allowFields);

    console.log(filteredBody);

    const [result] = await Car.update(filteredBody, { where: { id } });

    console.log(result);

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
