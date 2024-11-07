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
      cars:
        this.cars &&
        this.cars.map((car) => ({
          id: car.id,
          company: car.company ? car.company.name : null,
          model: car.car_model ? car.car_model.name : null,
          year: car.year,
          eningepower: car.engine_power ? car.engine_power.enginepower : null,
        })),
      discounts:
        this.discounts &&
        this.discounts.map((discount) => ({
          id: discount.id,
          type: discount.discount_type,
          startDate: discount.start_date,
          endDate: discount.end_date,
          isActive: discount.is_active,
        })),
    };
  }
}

module.exports = ItemResource;
