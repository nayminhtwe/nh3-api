const asyncHandler = require("express-async-handler");
const SecondCategory = require("../models/SecondCategory");

const SecondCategoryController = {
  find: asyncHandler(async (req, res) => {
    const secondCategories = await SecondCategory.findAll();
    return res.json(secondCategories);
  }),

  create: asyncHandler(async (req, res) => {
    const { name } = req.body;

    const secondCategory = await SecondCategory.create({ name });
    return res.json(secondCategory);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const [result] = await SecondCategory.update({ name }, { where: { id } });

    if (!result) {
      return res.status(400).json({
        msg: "update failed! && check your id!",
      });
    }

    const secondCategory = await SecondCategory.findByPk(id);

    return res.json(secondCategory);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await SecondCategory.destroy({ where: { id } });

    if (!result) {
      return res.status(400).json({
        msg: `Second Category with id ${id} not found!`,
      });
    }

    return res.sendStatus(204);
  }),
};

module.exports = SecondCategoryController;
