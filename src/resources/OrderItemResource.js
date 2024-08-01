const Resource = require("resources.js");

class OrderItemResource extends Resource {
  toArray() {
    return {
      id: this.id,
      item_id: this.item_id,
      subprice: this.subprice,
      totalprice: this.totalprice,
      quantity: this.quantity,
      deliveryfees: this.deliveryfees,
      note: this.note,
      item: this.item
        ? {
            id: this.item.id,
            name: this.item.name,
          }
        : null,
    };
  }
}

module.exports = OrderItemResource;
