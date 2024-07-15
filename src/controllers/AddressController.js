const Address = require("../models/Address");
const asyncHandler = require("express-async-handler");
const filterAllowFields = require("../utils/filterAllowFields");
const User = require("../models/User");

const AddressController = {
  find: asyncHandler(async (req, res) => {
    const addresss = await Address.findAll({ include: User });
    return res.json(addresss);
  }),

  create: asyncHandler(async (req, res) => {
    const { userId, buildingNo, floor, isSave, unit, addressTitle, street } =
      req.body;

    const address = await Address.create({
      userId,
      buildingNo,
      floor,
      isSave,
      unit,
      addressTitle,
      street,
    });

    return res.status(201).json(address);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = [
      "userId",
      "buildingNo",
      "floor",
      "isSave",
      "unit",
      "addressTitle",
      "street",
    ];

    const filteredBody = await filterAllowFields(req.body, allowFields);
    const [update] = await Address.update(filteredBody, { where: { id } });

    if (!update) return res.status(400).json({ msg: "Update failed" });

    const updateData = await Address.findOne({ where: { id } });
    return res.json(updateData);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await Address.destroy({ where: { id } });

    if (!result) return res.status(400).json({ msg: "Invalid id!" });

    return res.sendStatus(204);
  }),
};

module.exports = AddressController;
