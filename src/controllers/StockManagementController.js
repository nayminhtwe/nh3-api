const asyncHandler = require("express-async-handler");
const { StockManagement } = require("../models");

module.exports = {
  find: asyncHandler(async (req, res) => {
    const stocks = await StockManagement.findAll();
    return stocks;
  }),

  create: asyncHandler(async (req, res) => {
    const { item_id, adjusted_quantity, reason } = req.body;
    const stock = await StockManagement.create({
      item_id,
      adjusted_quantity,
      reason: reason || null,
    });
    return stock;
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { item_id, adjusted_quantity, reason } = req.body;

    const stock = await StockManagement.findByPk(id);
    if (!stock) {
      return res.status(404).json({ msg: "Stock not found" });
    }

    await stock.update({ item_id, adjusted_quantity, reason });

    return res.json({ msg: "Update Success" });
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const stock = await StockManagement.findByPk(id);
    if (!stock) return res.status(404).json({ msg: "Stock not found" });

    await stock.destroy();

    return res.json({ msg: "Stock deleted successfully" });
  }),
};
