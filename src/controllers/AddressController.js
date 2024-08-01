const Address = require("../models/Address");
const asyncHandler = require("express-async-handler");
const filterAllowFields = require("../utils/filterAllowFields");
const User = require("../models/User");
const AddressResource = require("../resources/AddressResource");

const include = [User];

const AddressController = {
  find: asyncHandler(async (req, res) => {
    const addresss = await Address.findAll({ include });

    return res.json(AddressResource.collection(addresss));
  }),

  create: asyncHandler(async (req, res) => {
    const { user_id, buildingNo, floor, isSave, unit, addressTitle, street } =
      req.body;

    const result = await Address.create({
      user_id,
      buildingNo,
      floor,
      isSave,
      unit,
      addressTitle,
      street,
    });

    if (result) {
      const address = await Address.findByPk(result.id, { include });
      return res.status(201).json(new AddressResource(address).exec());
    }
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = [
      "user_id",
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
    return res.json(new AddressResource(updateData).exec());
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await Address.destroy({ where: { id } });

    if (!result) return res.status(400).json({ msg: "Invalid id!" });

    return res.sendStatus(204);
  }),
};

module.exports = AddressController;
