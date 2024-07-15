const Resource = require("resources.js");

class OrderItemResource extends Resource {
  toArray() {
    return {
      id: this.id,
      itemId: this.itemId,
      subprice: this.subprice,
      totalPrice: this.totalPrice,
      quantity: this.quantity,
      deliveryfees: this.deliveryfees,
      note: this.note,
      item: this.Item
        ? {
            id: this.Item.id,
            name: this.Item.name,
          }
        : null,
    };
  }
}

module.exports = OrderItemResource;
