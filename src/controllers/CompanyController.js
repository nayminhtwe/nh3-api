const asyncHandler = require("express-async-handler");
const Company = require("../models/Company");

const CompanyController = {
  find: asyncHandler(async (req, res) => {
    const companies = await Company.findAll();
    return res.json(companies);
  }),

  create: asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        msg: "name field required!",
      });
    }

    const company = await Company.create({ name });
    return res.json(company);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const [result] = await Company.update({ name }, { where: { id } });

    if (!result) return res.status(400).json({ msg: "update failed!" });

    const updateCompany = await Company.findOne({ where: { id } });

    return res.json(updateCompany);
  }),

  destroy: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Company.destroy({ where: { id } });

    if (!result) {
      return res.status(400).json({
        msg: "Invalid id!",
      });
    }

    return res.sendStatus(204);
  }),
};

module.exports = CompanyController;
