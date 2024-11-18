const Address = require("../models/Address");
const asyncHandler = require("express-async-handler");
const filterAllowFields = require("../utils/filterAllowFields");
const User = require("../models/User");
const AddressResource = require("../resources/AddressResource");

const include = [User];

const AddressController = {
  find: asyncHandler(async (req, res) => {
    const { user } = req;

    const addresses = await Address.findAll({
      where: { app_user_id: user.id },
      include,
    });

    return res.json(AddressResource.collection(addresses));
  }),

  create: asyncHandler(async (req, res) => {
    const { user } = req;
    const { buildingNo, floor, isSave, unit, addressTitle, street } = req.body;

    const result = await Address.create({
      app_user_id: user.id,
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
    const { buildingNo, floor, isSave, unit, addressTitle, street } = req.body;

    const updatedData = {
      buildingNo,
      floor,
      isSave,
      unit,
      addressTitle,
      street,
      user: req.user,
    };

    const address = await Address.findByPk(id);

    if (!address) {
      return res.status(404).json({ msg: "Address not found" });
    }

    await address.update(updatedData);

    return res.json({ msg: "Update successful" });
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
