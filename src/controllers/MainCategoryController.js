const asyncHandler = require("express-async-handler");
const MainCategory = require("../models/MainCategory");

const MainCategoryController = {
  find: asyncHandler(async (req, res) => {
    const mainCategories = await MainCategory.findAll();
    return res.json(mainCategories);
  }),

  create: asyncHandler(async (req, res) => {
    const { name } = req.body;

    const mainCategory = await MainCategory.create({ name });
    return res.json(mainCategory);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const [result] = await MainCategory.update({ name }, { where: { id } });

    if (!result) return res.status(400).json({ msg: "update failed!" });

    const mainCategory = await MainCategory.findByPk(id);

    return res.json(mainCategory);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await MainCategory.destroy({ where: { id } });

    if (!result) {
      return res.status(400).json({
        msg: `Main category with id ${id} not found!`,
      });
    }

    return res.sendStatus(204);
  }),
};

module.exports = MainCategoryController;
