const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Otp = sequelize.define(
  "one_time_passwords",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    otp_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    transcation_id: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { underscored: true }
);

module.exports = Otp;
