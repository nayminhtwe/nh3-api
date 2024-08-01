const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Role = require("./Role");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_changed_at: {
      type: DataTypes.DATE,
    },
    active: {
      type: DataTypes.TINYINT.UNSIGNED,
      defaultValue: 1,
    },
    timezone: {
      type: DataTypes.STRING,
    },
    last_login_at: {
      type: DataTypes.DATE,
    },
    last_login_ip: {
      type: DataTypes.STRING,
    },
    to_be_logged_out: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    provider: {
      type: DataTypes.STRING,
    },
    provider_id: {
      type: DataTypes.STRING,
    },
    remember_token: {
      type: DataTypes,
    },
  },
  {
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;
