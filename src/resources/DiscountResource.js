const Resource = require("resources.js");

class DiscountResource extends Resource {
  toArray() {
    return {
      id: this.id,
      itemId: this.itemId,
      startDate: this.startDate,
      endDate: this.endDate,
      discountTypeId: this.discountTypeId,
      maxItem: this.maxItem,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      item: this.Item ? this.tranformItem(this.Item) : null,

      discountType: this.DiscountType
        ? {
            id: this.DiscountType.id,
            type: this.DiscountType.type,
            createdAt: this.DiscountType.createdAt,
            updatedAt: this.DiscountType.updatedAt,
          }
        : null,
    };
  }

  tranformItem(item) {
    return {
      id: item.id,
      name: item.name,
      brandName: item.brandName,
      secondCategoryId: item.secondCategoryId,
      mainCategoryId: item.mainCategoryId,
      isFeature: item.isFeature,
      isUniversal: item.isUniversal,
      OE_NO: item.OE_NO,
      price: item.price,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}

module.exports = DiscountResource;
