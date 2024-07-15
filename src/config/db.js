require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    dialect: process.env.MYSQL_DIALECT,
    host: process.env.MYSQL_HOST,
  }
);

module.exports = sequelize;
