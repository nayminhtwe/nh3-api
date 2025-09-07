const Item = require("../models/Item");
const asyncHandler = require("express-async-handler");
const MainCategory = require("../models/MainCategory");
const filterAllowFields = require("../utils/filterAllowFields");
const ItemImage = require("../models/ItemImage");
const ItemResource = require("../resources/ItemResource");
const { Sequelize, Model, Op } = require("sequelize");
const Car = require("../models/Car");
const Company = require("../models/Company");
const Engine = require("../models/Engine");
const CarModel = require("../models/CarModel");
const Discount = require("../models/Discount");
const ItemService = require("../services/ItemService");
const { filtered, paginate, filteredQuery } = require("../utils/itemUtils");

const includeFields = [
  MainCategory,
  ItemImage,
  Discount,
  {
    model: Car,
    include: [
      { model: Company, attributes: ["name"] },
      { model: CarModel, attributes: ["name"] },
      { model: Engine, attributes: ["enginepower"] },
    ],
  },
];

const ItemController = {
  find: asyncHandler(async (req, res) => {
    const { user } = req;

    const where = filteredQuery(req.query);

    if (!where.main_category_id) delete where.main_category_id

    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { count, items } = await ItemService.getItems({
      include: [
        ...includeFields,
        {
          model: Discount,
          required: false,
          attributes: ["id", "discount_type", "discount_value"],
        },
      ],
      limit,
      offset,
      user,
      where,
    });

    const discountedItems = ItemService.calculateDiscountItems(items);

    const filteredItems = await filtered(discountedItems, user);

    const pagination = paginate(req, count, limit);

    return res.json(
      ItemResource.collection({
        ...pagination,
        data: filteredItems,
      })
    );
  }),

  getDiscountItems: asyncHandler(async (req, res) => {
    const { user } = req;

    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { count, items } = await ItemService.getItems({
      include: [
        ...includeFields,
        {
          model: Discount,
          where: { is_active: true },
          required: true,
          attributes: ["id", "discount_type", "discount_value"],
        },
      ],
      limit,
      offset,
      user,
    });

    const discountedItems = ItemService.calculateDiscountItems(items);

    const filteredItems = await filtered(discountedItems, user);
    const pagination = paginate(req, count, limit);

    return res.json(
      ItemResource.collection({
        ...pagination,
        data: filteredItems,
      })
    );
  }),

  show: asyncHandler(async (req, res) => {
    const { user } = req;
    const include = [
      ...includeFields,
      {
        model: Discount,
        required: false,
        attributes: ["id", "discount_type", "discount_value"],
      },
    ];

    const item = await ItemService.getItem(req.params.id, user, include);

    if (!item) {
      return res.status(404).json({ msg: "Item not found!" });
    }

    const discountedItems = ItemService.calculateDiscountItems(item);

    const filteredItem = await filtered(discountedItems, user);

    return res.json(new ItemResource(filteredItem).exec());
  }),

  create: asyncHandler(async (req, res) => {
    const {
      name,
      brandName,
      main_category_id,
      is_feature,
      is_universal,
      OE_NO,
      quantity,
      status_id,
      LKB_No,
      description,
      price,
    } = req.body;

    const result = await Item.create({
      name,
      brandName,
      main_category_id,
      is_feature,
      is_universal,
      OE_NO,
      quantity,
      status_id,
      LKB_No,
      description,
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

  filterItem: asyncHandler(async (req, res) => {
    // const { modelId,category_id } = req.body;
    const { modelId } = req.query;
    const items = await Item.findAll({
      // where: {
      //   main_category_id: category_id
      // },
      MainCategory,
      ItemImage,
      Discount,
      include: {
        model: Car,
        include: [
          { model: Company, attributes: ["name"] },
          { model: CarModel, attributes: ["name"] },
          { model: Engine, attributes: ["enginepower"] },
        ],
        through: {
          attributes: []
        },
        where: {
          model_id: modelId
        }
      }
    });
    return res.json(items);
  }),
};

module.exports = ItemController;
