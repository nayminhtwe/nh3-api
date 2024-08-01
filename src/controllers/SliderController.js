require("dotenv").config();
const asyncHandler = require("express-async-handler");
const Slider = require("../models/Slider");
const removeFiles = require("../utils/removeFiles");

module.exports = {
  find: asyncHandler(async (req, res) => {
    const sliders = await Slider.findAll();
    return res.json(sliders);
  }),

  create: asyncHandler(async (req, res) => {
    const sliderUrl = process.env.SLIDER_IMAGES_URL;
    const { name } = req.body;

    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const image = req.file.filename;

    const link = `${sliderUrl}/${image}`;

    const slider = await Slider.create({ name, image, link });

    return res.status(201).json(slider);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const slider = await Slider.findByPk(id);

    if (!slider) return res.status(404).json({ msg: "Slider not found!" });

    const { name } = req.body;
    const sliderUrl = process.env.SLIDER_IMAGES_URL;
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const image = req.file.filename;

    const link = `${sliderUrl}/${image}`;

    const [updated] = await Slider.update(
      { name, image, link },
      { where: { id } }
    );

    if (!updated) return res.status(400).json({ msg: "update failed!" });

    // remove file old path
    await removeFiles(__dirname + "/../public/images/sliders/" + slider.image);

    return res.status(200).json({ msg: "update successfully" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const slider = await Slider.findByPk(id);

    if (!slider) return res.status(404).json({ msg: "Slider not found" });

    const result = await Slider.destroy({ where: { id } });

    if (!result) return res.status(400).json({ msg: "Destroy failed!" });

    await removeFiles(__dirname + "/../public/images/sliders/" + slider.image);

    return res.status(204).json({ msg: "Slider deleted successfully" });
  }),
};
