const Resource = require("resources.js");

class OrderStatusResource extends Resource {
  toArray() {
    return {
      id: this.id,
      status: this.status,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = OrderStatusResource;
