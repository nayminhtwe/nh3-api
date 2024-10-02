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

      discount_type: this.discount_type
        ? {
            id: this.discount_type.id,
            type: this.discount_type.type,
          }
        : null,
    };
  }

  tranformItem(item) {
    return {
      id: item.id,
      name: item.name,
      brandName: item.brandName,
    };
  }
}

module.exports = DiscountResource;
