const Resource = require("resources.js");

class UserResource extends Resource {
  toArray() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      phone: this.phone,
      roleId: this.roleId,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      role: this.Role
        ? {
            id: this.Role.id,
            name: this.Role.name,
          }
        : null,
    };
  }
}

module.exports = UserResource;
