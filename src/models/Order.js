const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Cart = require("./Cart");
const Address = require("./Address");
const OrderStatus = require("./OrderStatus");
const Promotion = require("./Promotion");
const moment = require('moment-timezone');

const User = require("./User");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    order_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Address,
        key: "id",
      },
    },
    orderstatus_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: OrderStatus,
        key: "id",
      },
    },
    promotion_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: Promotion,
        key: "id",
      },
      onDelete: 'SET NULL',
    },
    app_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    deliveryfees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalprice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('created_at');
        return moment(rawValue).tz('Asia/Yangon').format('YYYY-MM-DD HH:mm:ss');
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('updated_at');
        return moment(rawValue).tz('Asia/Yangon').format('YYYY-MM-DD HH:mm:ss');
      }
    },
  },
  {
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (order) => {
        order.created_at = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
        order.updated_at = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
      },
      beforeUpdate: (order) => {
        order.updated_at = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }
);

Order.belongsTo(Address, { foreignKey: "address_id", onDelete: "CASCADE" });
Order.belongsTo(OrderStatus, {
  foreignKey: "orderstatus_id",
  onDelete: "CASCADE",
});
Order.belongsTo(Promotion, { foreignKey: "promotion_id", onDelete: "CASCADE" });

Order.belongsTo(User, { foreignKey: "app_user_id", onDelete: "CASCADE" });

module.exports = Order;
