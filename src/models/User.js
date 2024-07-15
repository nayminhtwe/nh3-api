const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Role = require("./Role");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  roleId: {
    type: DataTypes.BIGINT.UNSIGNED,
    references: {
      model: Role,
      key: "id",
    },
  },
  accessToken: {
    type: DataTypes.STRING,
  },
  refreshToken: {
    type: DataTypes.STRING,
  },
});

User.belongsTo(Role, { foreignKey: "roleId", onDelete: "CASCADE" });

module.exports = User;
