const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Address = sequelize.define(
  "address",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    app_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: User,
        key: "id",
      },
    },
    buildingNo: {
      type: DataTypes.STRING,
    },
    floor: {
      type: DataTypes.STRING,
    },
    isSave: {
      type: DataTypes.BOOLEAN,
    },
    unit: {
      type: DataTypes.STRING,
    },
    addressTitle: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);

Address.belongsTo(User, { foreignKey: "app_user_id", onDelete: "CASCADE" });

User.hasMany(Address, { foreignKey: "app_user_id", onDelete: "CASCADE" });

module.exports = Address;
