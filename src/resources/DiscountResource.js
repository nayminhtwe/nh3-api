const Resource = require("resources.js");

class DiscountResource extends Resource {
  toArray() {
    return {
      id: this.id,
      item_id: this.item_id,
      start_date: this.start_date,
      end_date: this.end_date,
      discount_type_id: this.discount_type_id,
      max_item: this.max_item,
      is_active: this.is_active,
      created_at: this.created_at,
      updated_at: this.updated_at,
      item: this.item ? this.tranformItem(this.item) : null,

      discountType: this.DiscountType
        ? {
            id: this.DiscountType.id,
            type: this.DiscountType.type,
            created_at: this.DiscountType.created_at,
            updated_at: this.DiscountType.updated_at,
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
      created_at: item.created_at,
      updated_at: item.updated_at,
    };
  }
}

module.exports = DiscountResource;
