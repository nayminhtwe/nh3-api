const Resource = require("resources.js");

class CartResource extends Resource {
  toArray() {
    return {
      id: this.id,
      item_id: this.item_id,
      OE_NO: this.OE_NO,
      quantity: this.quantity,
      created_at: this.created_at,
      updated_at: this.updated_at,
      item: this.item
        ? {
            id: this.item.id,
            name: this.item.name,
            brandName: this.item.brandName,
            secondCategoryId: this.item.second_category_id,
            mainCategoryId: this.item.main_category_id,
            isFeature: this.item.is_feature,
            isUniversal: this.item.is_universal,
            price: this.item.price,
            created_at: this.item.created_at,
            updated_at: this.item.updated_at,
          }
        : null,
    };
  }
}

module.exports = CartResource;
