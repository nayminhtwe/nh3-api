const Item = require("../models/Item");
const asyncHandler = require("express-async-handler");
const MainCategory = require("../models/MainCategory");
const SecondCategory = require("../models/SecondCategory");
const filterAllowFields = require("../utils/filterAllowFields");
const ItemImage = require("../models/ItemImage");
const ItemResource = require("../resources/ItemResource");

const includeFields = [SecondCategory, MainCategory, ItemImage];

const ItemController = {
  find: asyncHandler(async (req, res) => {
    const items = await Item.findAll({
      include: includeFields,
    });
    return res.json(ItemResource.collection(items));
  }),

  create: asyncHandler(async (req, res) => {
    const {
      name,
      brandName,
      second_category_id,
      main_category_id,
      is_feature,
      is_universal,
      OE_NO,
      price,
    } = req.body;

    console.log(req.body);

    const result = await Item.create({
      name,
      brandName,
      second_category_id,
      main_category_id,
      is_feature,
      is_universal,
      OE_NO,
      price,
    });

    if (result) {
      const item = new ItemResource(result).exec();
      return res.json(item);
    }
  }),

  upload: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({
        msg: "No images uploaded!",
      });
    }

    const item = await Item.findByPk(id);

    if (!item) return res.status(404).json({ msg: "Item not found!" });

    const paths = images.map((image) => ({
      item_id: item.id,
      path: image.filename,
    }));

    const result = await ItemImage.bulkCreate(paths);

    return res.json(result);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = [
      "name",
      "brandName",
      "second_category_id",
      "main_category_id",
      "is_feature",
      "is_universal",
      "OE_NO",
      "price",
    ];

    const filteredBody = filterAllowFields(req.body, allowFields);

    if (!filteredBody) return res.sendStatus(204);

    const [result] = await Item.update(filteredBody, { where: { id } });

    if (!result) return res.status(400).json({ msg: "update failed!" });

    const updateData = await Item.findOne({
      where: { id },
      include: includeFields,
    });

    return res.json(new ItemResource(updateData).exec());
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await Item.destroy({ where: { id } });

    if (!result) return res.status(400).json({ msg: "Item not found!" });

    return res.sendStatus(204);
  }),
};

module.exports = ItemController;
