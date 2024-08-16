const asyncHandler = require("express-async-handler");
const Year = require("../models/Year");
const filterAllowFields = require("../utils/filterAllowFields");
const YearResource = require("../resources/YearResource");
const Company = require("../models/Company");

const YearController = {
  find: asyncHandler(async (req, res) => {
    const years = await Year.findAll({ include: Company });
    console.log(years);
    return res.json(YearResource.collection(years));
  }),

  create: asyncHandler(async (req, res) => {
    const { company_id, year } = req.body;

    const result = await Year.create({ company_id, year });

    const data = await Year.findOne({
      where: { id: result.id },
      include: Company,
    });

    return res.json(new YearResource(data).exec());
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowFields = ["company_id", "year"];
    const bodyFiltered = filterAllowFields(req.body, allowFields);

    const [result] = await Year.update(bodyFiltered, { where: { id } });

    if (!result) return res.status(400).json({ msg: "update failed!" });

    const updateData = await Year.findOne({ where: { id } });

    return res.json(new YearResource(updateData).exec());
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Year.destroy({ where: { id } });

    if (!result) {
      return res.status(400).json({
        msg: "Year not found!",
      });
    }

    return res.sendStatus(204);
  }),
};

module.exports = YearController;
