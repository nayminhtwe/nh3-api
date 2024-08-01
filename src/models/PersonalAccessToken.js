const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const PersonalAccessToken = sequelize.define(
  "PersonalAccessToken",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    tokenableType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenableId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abilities: {
      type: DataTypes.TEXT,
    },
    lastUsedAt: {
      type: DataTypes.TIME,
    },
  },
  { underscored: true }
);

User.hasMany(PersonalAccessToken, {
  foreignKey: "tokenableId",
  constraints: false,
  scope: {
    tokenableType: "user",
  },
});

module.exports = PersonalAccessToken;
