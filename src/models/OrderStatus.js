const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const OrderStatus = sequelize.define(
  "order_status",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
  },
  { timestamps: false }
);

OrderStatus.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

module.exports = OrderStatus;
