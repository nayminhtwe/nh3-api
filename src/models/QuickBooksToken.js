const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const QuickBooksToken = sequelize.define(
  "quickbooks_tokens",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    realm_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    access_token_expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    refresh_token_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    underscored: true,
  }
);

module.exports = QuickBooksToken;

