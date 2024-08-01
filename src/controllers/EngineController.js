const asyncHandler = require("express-async-handler");
const Engine = require("../models/Engine");

const EngineController = {
  find: asyncHandler(async (req, res) => {
    const enginepowers = await Engine.findAll();
    return res.json(enginepowers);
  }),

  create: asyncHandler(async (req, res) => {
    const { enginepower } = req.body;

    const result = await Engine.create({ enginepower });
    return res.json(result);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { enginepower } = req.body;

    const [result] = await Engine.update({ enginepower }, { where: { id } });

    if (!result) return res.status(400).json({ msg: "update failed!" });

    const updateData = await Engine.findOne({ where: { id } });
    return res.json(updateData);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Engine.destroy({ where: { id } });

    if (!result) {
      return res.status(400).json({
        msg: "Engine not found!",
      });
    }

    return res.sendStatus(204);
  }),
};

module.exports = EngineController;
