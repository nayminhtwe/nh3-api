const Series = require("../models/Series");
const asyncHandler = require("express-async-handler");

const SeriesController = {
  find: asyncHandler(async (req, res) => {
    const series = await Series.findAll();
    return res.json(series);
  }),

  create: asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        msg: "name field required!",
      });
    }

    const series = await Series.create({ name });
    return res.json(series);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const [result] = await Series.update({ name }, { where: { id } });

    if (!result) return res.status(400).json({ msg: "update failed!" });

    const updateCompany = await Series.findOne({ where: { id } });

    return res.json(updateCompany);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Series.destroy({ where: { id } });

    if (!result) {
      return res.status(400).json({
        msg: "Invalid id!",
      });
    }

    return res.sendStatus(204);
  }),
};

module.exports = SeriesController;
