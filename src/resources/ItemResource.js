const Resource = require("resources.js");

class ItemResource extends Resource {
  toArray() {
    return {
      id: this.id,
      name: this.name,
      brandName: this.brandName,
      main_category_id: this.main_category_id,
      isFeature: this.is_feature,
      isUniversal: this.is_universal,
      OE_NO: this.OE_NO,
      price: this.price,
      main_category: this.main_category && {
        id: this.main_category.id,
        name: this.main_category.name,
      },
      item_images:
        this.item_images &&
        this.item_images.map((image) => ({
          id: image.id,
          item_id: image.item_id,
          path: image.path,
        })),
    };
  }
}

module.exports = ItemResource;
