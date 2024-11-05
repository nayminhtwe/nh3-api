const asyncHandler = require("express-async-handler");
const MainCategory = require("../models/MainCategory");

const MainCategoryController = {
  find: asyncHandler(async (req, res) => {
    const mainCategories = await MainCategory.findAll();
    return res.json(mainCategories);
  }),

  create: asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });
    const image = req.file.filename;

    const mainCategory = await MainCategory.create({ name, image });
    return res.json(mainCategory);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });
    const image = req.file.filename;

    const mainCategory = await MainCategory.findByPk(id);

    if (!mainCategory)
      return res.status(404).json({ msg: "Main category not found" });

    await mainCategory.update({
      name: name ? name : mainCategory.name,
      image: image ? image : mainCategory.image,
    });

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
