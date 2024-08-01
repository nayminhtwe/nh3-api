const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Role = require("./Role");
const Permission = require("./Permission");

const RoleHasPermission = sequelize.define(
  "role_has_permission",
  {
    permission_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      unique: true,
      references: {
        model: Permission,
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  { timestamps: false }
);

Role.belongsToMany(Permission, {
  through: RoleHasPermission,
  foreignKey: "role_id",
  onDelete: "CASCADE",
});

Permission.belongsToMany(Role, {
  through: RoleHasPermission,
  foreignKey: "permission_id",
  onDelete: "CASCADE",
});

module.exports = RoleHasPermission;
