const Resource = require("resources.js");

class CartResource extends Resource {
  toArray() {
    return {
      id: this.id,
      itemId: this.itemId,
      OE_NO: this.OE_NO,
      quantity: this.quantity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      item: this.Item
        ? {
            id: this.Item.id,
            name: this.Item.name,
            brandName: this.Item.brandName,
            secondCategoryId: this.Item.secondCategoryId,
            mainCategoryId: this.Item.mainCategoryId,
            isFeature: this.Item.isFeature,
            isUniversal: this.Item.isUniversal,
            price: this.Item.price,
            createdAt: this.Item.createdAt,
            updatedAt: this.Item.updatedAt,
          }
        : null,
    };
  }
}

module.exports = CartResource;
