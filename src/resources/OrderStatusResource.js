const Resource = require("resources.js");

class OrderStatusResource extends Resource {
  toArray() {
    return {
      id: this.id,
      status: this.status,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      user: this.User
        ? {
            id: this.User.id,
            name: this.User.name,
            email: this.User.email,
            password: this.User.password,
            phone: this.User.phone,
          }
        : null,
    };
  }
}

module.exports = OrderStatusResource;
