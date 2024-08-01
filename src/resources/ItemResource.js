const Resource = require("resources.js");

class ItemResource extends Resource {
  toArray() {
    return {
      id: this.id,
      name: this.name,
      brandName: this.brandName,
      second_category_id: this.second_category_id,
      main_category_id: this.main_category_id,
      isFeature: this.isFeature,
      isUniversal: this.isUniversal,
      OE_NO: this.OE_NO,
      price: this.price,
      second_category: this.second_category && {
        id: this.second_category.id,
        name: this.second_category.name,
      },
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
