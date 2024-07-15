const Resource = require("resources.js");

class ItemResource extends Resource {
  toArray() {
    return {
      id: this.id,
      name: this.name,
      brandName: this.brandName,
      secondCategoryId: this.secondCategoryId,
      mainCategoryId: this.mainCategoryId,
      isFeature: this.isFeature,
      isUniversal: this.isUniversal,
      OE_NO: this.OE_NO,
      price: this.price,
      secondCategory: this.SecondCategory
        ? {
            id: this.SecondCategory.id,
            name: this.SecondCategory.name,
          }
        : null,
      mainCategory: this.MainCategory
        ? {
            id: this.MainCategory.id,
            name: this.MainCategory.name,
          }
        : null,
      itemImages: this.ItemImages
        ? this.ItemImages.map((image) => ({
            id: image.id,
            itemId: image.itemId,
            path: image.path,
          }))
        : null,
    };
  }
}

module.exports = ItemResource;
