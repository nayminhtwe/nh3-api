const Resource = require("resources.js");

class DiscountResource extends Resource {
  toArray() {
    return {
      id: this.id,
      item_id: this.item_id,
      start_date: this.start_date,
      end_date: this.end_date,
      is_active: this.is_active,
      discount_type: this.discount_type,
      discount_value: this.discount_value,
      created_at: this.created_at,
      updated_at: this.updated_at,
      item: this.item ? this.transformItem(this.item) : null,
    };
  }

  transformItem(item) {
    return {
      id: item.id,
      name: item.name,
      brandName: item.brandName,
    };
  }
}

module.exports = DiscountResource;
