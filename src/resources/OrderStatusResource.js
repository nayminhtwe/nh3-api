const Resource = require("resources.js");

class OrderStatusResource extends Resource {
  toArray() {
    return {
      id: this.id,
      status: this.status,
      user_id: this.user_id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      user: this.user
        ? {
            id: this.user.id,
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            phone: this.user.phone,
          }
        : null,
    };
  }
}

module.exports = OrderStatusResource;
