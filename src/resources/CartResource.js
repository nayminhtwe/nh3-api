const Resource = require("resources.js");

class CartResource extends Resource {
  toArray() {
    return {
      id: this.id,
      quantity: this.quantity,
    };
  }
}

module.exports = CartResource;
