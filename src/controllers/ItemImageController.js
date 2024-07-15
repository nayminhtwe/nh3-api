const asyncHandler = require("express-async-handler");
const ItemImage = require("../models/ItemImage");
const removeFiles = require("../utils/removeFiles");

const ItemImageController = {
  find: asyncHandler(async (req, res) => {
    const itemImages = await ItemImage.findAll();
    return res.json(itemImages);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const itemImage = await ItemImage.findOne({ where: { id } });

    if (!itemImage)
      return res.status(404).json({ msg: "ItemImage not found!" });

    const { file } = req;

    if (!file) return res.status(400).json({ msg: "No file uploaded!" });

    const [result] = await ItemImage.update(
      { path: file.filename },
      { where: { id } }
    );

    if (!result) return res.status(400).json({ msg: "Update failed" });

    await removeFiles(__dirname + "/../public/images/items/" + itemImage.path);

    const update = await ItemImage.findOne({ where: { id } });
    return res.json(update);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const itemImage = await ItemImage.findOne({ where: { id } });

    await removeFiles(__dirname + "/../public/images/items/" + itemImage.path);

    const result = await ItemImage.destroy({ where: { id } });

    if (!result) return res.status(400).json({ msg: "Invalid id!" });

    return res.sendStatus(204);
  }),
};

module.exports = ItemImageController;
