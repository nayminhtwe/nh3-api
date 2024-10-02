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
    const {
      app_user_id,
      buildingNo,
      floor,
      isSave,
      unit,
      addressTitle,
      street,
    } = req.body;

    const result = await Address.create({
      app_user_id,
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

    const address = await Address.findByPk(id);

    if (!address) {
      return res.status(404).json({ msg: "Address not found" });
    }

    const allowFields = [
      "app_user_id",
      "buildingNo",
      "floor",
      "isSave",
      "unit",
      "addressTitle",
      "street",
    ];

    const filteredBody = await filterAllowFields(req.body, allowFields);

    await address.update(filteredBody);

    return res.json({ msg: "update success" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const address = await Address.findByPk(id);

    if (!address) return res.status(404).json({ msg: "Address not found" });

    await address.destroy();

    return res.sendStatus(204);
  }),
};

module.exports = AddressController;
